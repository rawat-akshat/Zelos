"""
Test database connection
Run: python test_database.py
"""

from app.core.database import db

print("🔍 Testing Database Connection...")

# Test 1: Check if clients are created
print(f"✅ Regular client created: {db.client is not None}")
print(f"✅ Admin client created: {db.admin_client is not None}")

# Test 2: Health check
is_healthy = db.health_check()
print(f"✅ Database connection: {'Healthy ✓' if is_healthy else 'Failed ✗'}")

# Test 3: Try to read from users table (will be empty, but should work)
try:
    response = db.admin_client.table('users').select('id').limit(1).execute()
    print(f"✅ Users table accessible: {len(response.data)} rows")
except Exception as e:
    print(f"❌ Error accessing users table: {e}")

print("\n🎉 Database tests complete!")