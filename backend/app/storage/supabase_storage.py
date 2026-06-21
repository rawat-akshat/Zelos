from typing import Optional

from app.core.config import settings
from app.core.database import db
from app.storage.base import ObjectStorage


class SupabaseObjectStorage:
    """Supabase Storage implementation — swap out for S3ObjectStorage later."""

    def __init__(self, bucket: str) -> None:
        self.bucket = bucket
        self._base_url = settings.SUPABASE_URL.rstrip("/")

    @property
    def _storage(self):
        return db.admin_client.storage.from_(self.bucket)

    def upload(self, key: str, data: bytes, content_type: str) -> str:
        self._storage.upload(
            key,
            data,
            file_options={"content-type": content_type, "upsert": "true"},
        )
        return self.public_url(key)

    def delete(self, key: str) -> None:
        try:
            self._storage.remove([key])
        except Exception:
            pass

    def delete_under_prefix(self, prefix: str) -> None:
        prefix = prefix.strip("/")
        try:
            listing = self._storage.list(prefix) or []
        except Exception:
            return

        keys: list[str] = []
        for item in listing:
            name = item.get("name") if isinstance(item, dict) else None
            if not name:
                continue
            keys.append(name if name.startswith(f"{prefix}/") else f"{prefix}/{name}")

        if keys:
            try:
                self._storage.remove(keys)
            except Exception:
                pass

    def public_url(self, key: str) -> str:
        key = key.lstrip("/")
        return f"{self._base_url}/storage/v1/object/public/{self.bucket}/{key}"

    def key_from_public_url(self, url: str) -> Optional[str]:
        marker = f"/storage/v1/object/public/{self.bucket}/"
        idx = url.find(marker)
        if idx == -1:
            return None
        return url[idx + len(marker) :].lstrip("/") or None

    def is_managed_url(self, url: str) -> bool:
        return self.key_from_public_url(url) is not None


def as_object_storage(storage: SupabaseObjectStorage) -> ObjectStorage:
    return storage
