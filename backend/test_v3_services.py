"""Basic import smoke tests for V3 backend modules."""

from app.models.enums import SessionStatus, TaskStatus
from app.services.session_service import session_service
from app.services.chat_service import chat_service
from app.services.llm_context_service import llm_context_service
from app.services.pattern_service import pattern_service
from app.services.focus_service import focus_service
from app.services.profile_service import profile_service
from app.services.playbook_service import playbook_service


def test_enums_values():
    assert SessionStatus.ACTIVE.value == "active"
    assert TaskStatus.NOT_STARTED.value == "not_started"


def test_services_exist():
    assert session_service is not None
    assert chat_service is not None
    assert llm_context_service is not None
    assert pattern_service is not None
    assert focus_service is not None
    assert profile_service is not None
    assert playbook_service is not None
