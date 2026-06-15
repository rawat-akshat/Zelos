import { MOCKUP_CHAT } from "./mockup-data";

const cardStyle = {
  background: "#FDFBF7",
  border: "1px solid #DDD2C2",
  borderRadius: 12,
  padding: "9px 10px",
  marginBottom: 7,
} as const;

const badgeStyle = {
  display: "inline-block",
  fontSize: 7,
  fontWeight: 600,
  padding: "2px 6px",
  borderRadius: 4,
  marginBottom: 5,
  letterSpacing: "0.04em",
  textTransform: "uppercase" as const,
};

function UserBubble({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 7 }}>
      <div
        style={{
          maxWidth: "90%",
          background: "rgba(201, 168, 90, 0.12)",
          border: "1px solid rgba(201, 168, 90, 0.25)",
          borderRadius: "12px 12px 4px 12px",
          padding: "6px 9px",
          fontSize: 8.5,
          lineHeight: 1.42,
          color: "#2A2723",
        }}
      >
        {text}
      </div>
    </div>
  );
}

function LearnResponse({ title, body, footer }: { title: string; body: string; footer?: string }) {
  return (
    <div style={cardStyle}>
      <span style={{ ...badgeStyle, color: "#7B746A", background: "rgba(123, 116, 106, 0.1)" }}>
        Learn Mode
      </span>
      <p style={{ margin: "0 0 4px", fontSize: 9.5, fontWeight: 600, color: "#2A2723", lineHeight: 1.32 }}>
        {title}
      </p>
      <p style={{ margin: 0, fontSize: 8.5, lineHeight: 1.48, color: "#7B746A" }}>
        {body}
      </p>
      {footer && (
        <p style={{ margin: "6px 0 0", fontSize: 8.5, lineHeight: 1.48, color: "#2A2723", fontWeight: 500 }}>
          {footer}
        </p>
      )}
    </div>
  );
}

function CoachResponse({ body }: { body: string }) {
  return (
    <div style={cardStyle}>
      <p style={{ margin: 0, fontSize: 8.5, lineHeight: 1.48, color: "#2A2723" }}>
        {body}
      </p>
    </div>
  );
}

function TaskResponse({
  badge = "Task breakdown",
  title,
  body,
  actionsLabel,
  actions,
  footer,
}: {
  badge?: string;
  title?: string;
  body: string;
  actionsLabel?: string;
  actions: string[];
  footer?: string;
}) {
  return (
    <div style={cardStyle}>
      <span style={{ ...badgeStyle, color: "#C9A85A", background: "rgba(201, 168, 90, 0.1)" }}>
        {badge}
      </span>
      {title && (
        <p style={{ margin: "0 0 4px", fontSize: 9.5, fontWeight: 600, color: "#2A2723", lineHeight: 1.32 }}>
          {title}
        </p>
      )}
      <p style={{ margin: "0 0 6px", fontSize: 8.5, lineHeight: 1.45, color: "#7B746A" }}>
        {body}
      </p>
      {actionsLabel && (
        <p style={{ margin: "0 0 5px", fontSize: 8.5, fontWeight: 600, color: "#2A2723" }}>
          {actionsLabel}
        </p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {actions.map((action, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 5 }}>
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: 3,
                border: "1px solid #DDD2C2",
                flexShrink: 0,
                marginTop: 1,
              }}
            />
            <span style={{ fontSize: 8, lineHeight: 1.38, color: "#2A2723" }}>
              {action}
            </span>
          </div>
        ))}
      </div>
      {footer && (
        <p style={{ margin: "6px 0 0", fontSize: 8.5, lineHeight: 1.45, color: "#2A2723", fontWeight: 500 }}>
          {footer}
        </p>
      )}
    </div>
  );
}

export default function MockupChatPanel() {
  return (
    <div
      style={{
        flex: 1,
        padding: "12px 14px 10px",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        minHeight: 0,
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="mockup-chat-scroll"
      >
        {MOCKUP_CHAT.map((turn, i) => {
          if (turn.type === "user") return <UserBubble key={i} text={turn.text} />;
          if (turn.type === "learn") {
            return (
              <LearnResponse key={i} title={turn.title} body={turn.body} footer={turn.footer} />
            );
          }
          if (turn.type === "coach") return <CoachResponse key={i} body={turn.body} />;
          return (
            <TaskResponse
              key={i}
              badge={turn.badge}
              title={turn.title}
              body={turn.body}
              actionsLabel={turn.actionsLabel}
              actions={turn.actions}
              footer={turn.footer}
            />
          );
        })}
      </div>

      <div
        style={{
          marginTop: 6,
          background: "#FDFBF7",
          border: "1px solid #DDD2C2",
          borderRadius: 12,
          padding: "8px 11px",
          fontSize: 8.5,
          color: "#B5AEA3",
          flexShrink: 0,
        }}
      >
        What are you putting off today?
      </div>
    </div>
  );
}
