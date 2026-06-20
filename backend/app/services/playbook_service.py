from typing import Any, Optional

from app.stores.playbooks import playbooks


class PlaybookService:
    def get_playbook(self, user_id: str) -> dict[str, Any]:
        playbook = playbooks.get_by_user_id(user_id)
        if not playbook:
            playbook = playbooks.create_empty(user_id)
        return playbook

    def update_playbook(
        self,
        user_id: str,
        *,
        works_well: Optional[list[str]] = None,
        does_not_work: Optional[list[str]] = None,
        suggested_experiments: Optional[list[dict[str, Any]]] = None,
    ) -> dict[str, Any]:
        self.get_playbook(user_id)
        updates = {}
        if works_well is not None:
            updates["works_well"] = works_well
        if does_not_work is not None:
            updates["does_not_work"] = does_not_work
        if suggested_experiments is not None:
            updates["suggested_experiments"] = suggested_experiments
        if not updates:
            return self.get_playbook(user_id)
        return playbooks.update(user_id, updates)


playbook_service = PlaybookService()
