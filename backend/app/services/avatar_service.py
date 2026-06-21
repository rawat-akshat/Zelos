import mimetypes
from typing import Optional

from app.services.auth_service import auth_service
from app.storage import get_object_storage

ALLOWED_CONTENT_TYPES = frozenset(
    {"image/jpeg", "image/png", "image/webp", "image/gif"}
)
MAX_AVATAR_BYTES = 5 * 1024 * 1024  # 5 MB

_EXT_BY_TYPE = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
}


class AvatarService:
    def upload_avatar(
        self,
        user_id: str,
        *,
        data: bytes,
        content_type: str,
        old_avatar_url: Optional[str] = None,
    ) -> dict:
        if content_type not in ALLOWED_CONTENT_TYPES:
            raise ValueError("Image must be JPEG, PNG, WebP, or GIF.")
        if len(data) > MAX_AVATAR_BYTES:
            raise ValueError("Image must be 5 MB or smaller.")

        storage = get_object_storage()
        ext = _EXT_BY_TYPE.get(content_type) or mimetypes.guess_extension(content_type) or ".jpg"
        key = f"{user_id}/avatar{ext}"

        if old_avatar_url and storage.is_managed_url(old_avatar_url):
            old_key = storage.key_from_public_url(old_avatar_url)
            if old_key:
                storage.delete(old_key)
        storage.delete_under_prefix(user_id)

        public_url = storage.upload(key, data, content_type)
        return auth_service.update_me(user_id, avatar_url=public_url)


avatar_service = AvatarService()
