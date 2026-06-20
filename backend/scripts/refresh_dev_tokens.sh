#!/usr/bin/env bash
# Refresh short-lived dev tokens in backend/.env (for curl/Postman testing).
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ ! -f .env ]]; then
  echo "Missing backend/.env"
  exit 1
fi

set -a
# shellcheck disable=SC1091
source .env
set +a

: "${SUPABASE_URL:?SUPABASE_URL not set}"
: "${SUPABASE_KEY:?SUPABASE_KEY not set}"
: "${TEST_USER_EMAIL:?TEST_USER_EMAIL not set in .env}"
: "${TEST_USER_PASSWORD:?TEST_USER_PASSWORD not set in .env}"

SUPABASE_ACCESS=$(curl -s -X POST "${SUPABASE_URL}/auth/v1/token?grant_type=password" \
  -H "apikey: ${SUPABASE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"${TEST_USER_EMAIL}\",\"password\":\"${TEST_USER_PASSWORD}\"}" \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['access_token'])")

BACKEND_JWT=$(curl -s -X POST "http://localhost:8000/api/v1/auth/exchange-token" \
  -H "Content-Type: application/json" \
  -d "{\"supabase_token\": \"${SUPABASE_ACCESS}\"}" \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['access_token'])")

python3 << PY
from pathlib import Path
import re

env_path = Path(".env")
content = env_path.read_text()

def set_var(name: str, value: str) -> None:
    global content
    pattern = rf"^{re.escape(name)}=.*$"
    line = f"{name}={value}"
    if re.search(pattern, content, flags=re.M):
        content = re.sub(pattern, line, content, flags=re.M)
    else:
        content = content.rstrip() + "\\n" + line + "\\n"

set_var("DEV_SUPABASE_ACCESS_TOKEN", "${SUPABASE_ACCESS}")
set_var("DEV_BACKEND_JWT", "${BACKEND_JWT}")

env_path.write_text(content)
print("Refreshed DEV_SUPABASE_ACCESS_TOKEN and DEV_BACKEND_JWT in .env")
PY

echo "Test /me:"
echo "curl -s http://localhost:8000/api/v1/auth/me -H \"Authorization: Bearer \${DEV_BACKEND_JWT}\""
