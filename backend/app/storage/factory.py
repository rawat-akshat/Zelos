from functools import lru_cache

from app.core.config import settings
from app.storage.base import ObjectStorage
from app.storage.supabase_storage import SupabaseObjectStorage


@lru_cache
def get_object_storage() -> ObjectStorage:
    if settings.STORAGE_PROVIDER == "supabase":
        return SupabaseObjectStorage(bucket=settings.AVATAR_BUCKET)
    if settings.STORAGE_PROVIDER == "s3":
        raise NotImplementedError(
            "STORAGE_PROVIDER=s3 is not implemented yet. "
            "Add an S3 adapter in app/storage/ and register it here."
        )
    raise ValueError(f"Unknown STORAGE_PROVIDER: {settings.STORAGE_PROVIDER}")
