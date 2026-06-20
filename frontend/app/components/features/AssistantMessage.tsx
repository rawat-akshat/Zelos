import InterventionCard from "./InterventionCard";
import type { ChatMessage } from "../../lib/types";

interface AssistantMessageProps {
  message: ChatMessage;
  onInterventionAction?: (action: string) => void;
  onInterventionDismiss?: () => void;
}

export default function AssistantMessage({
  message,
  onInterventionAction,
  onInterventionDismiss,
}: AssistantMessageProps) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <div style={{ maxWidth: "88%", width: "100%" }}>
        <div
          style={{
            padding: "14px 18px",
            borderRadius: "18px 18px 18px 4px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
            fontSize: 14,
            lineHeight: 1.6,
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {message.content}
        </div>
        {message.intervention && (
          <InterventionCard
            intervention={message.intervention}
            onAction={onInterventionAction}
            onDismiss={onInterventionDismiss}
          />
        )}
      </div>
    </div>
  );
}
