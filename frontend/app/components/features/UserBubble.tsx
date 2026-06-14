interface UserBubbleProps {
  text: string;
}

export default function UserBubble({ text }: UserBubbleProps) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div
        style={{
          maxWidth: "72%",
          padding: "12px 18px",
          borderRadius: "18px 18px 4px 18px",
          background: "var(--bubble-bg)",
          border: "1px solid var(--bubble-border)",
          color: "var(--bubble-text)",
          fontSize: 14,
          lineHeight: 1.55,
        }}
      >
        {text}
      </div>
    </div>
  );
}
