from typing import Optional, Protocol


class ObjectStorage(Protocol):
    """App-level object storage (Supabase Storage today, S3 later)."""

    bucket: str

    def upload(self, key: str, data: bytes, content_type: str) -> str:
        """Store bytes at key; return a public URL."""
        ...

    def delete(self, key: str) -> None:
        """Remove one object."""
        ...

    def delete_under_prefix(self, prefix: str) -> None:
        """Remove all objects whose keys start with prefix (e.g. user id folder)."""
        ...

    def public_url(self, key: str) -> str:
        """Build the public URL for a stored key."""
        ...

    def key_from_public_url(self, url: str) -> Optional[str]:
        """Parse storage key from a URL we issued, or None if external (Google, etc.)."""
        ...

    def is_managed_url(self, url: str) -> bool:
        """True if this URL points at an object in our bucket (safe to delete on replace)."""
        ...
