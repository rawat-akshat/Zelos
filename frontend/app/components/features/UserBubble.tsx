interface UserBubbleProps {
  text: string;
}

export default function UserBubble({ text }: UserBubbleProps) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div
        style={{
          maxWidth: "72%",
          padding: "11px 16px",
          borderRadius: "16px 16px 4px 16px",
          background: "rgba(198,169,105,0.1)",
          border: "1px solid rgba(198,169,105,0.2)",
          color: "#E0E0E0",
          fontSize: 14,
          lineHeight: 1.5,
        }}
      >
        {text}
      </div>
    </div>
  );
}
