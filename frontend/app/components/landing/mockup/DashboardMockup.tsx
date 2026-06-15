import MockupSidebar from "./MockupSidebar";
import MockupChatPanel from "./MockupChatPanel";
import MockupRightPanel from "./MockupRightPanel";

export default function DashboardMockup() {
  return (
    <div
      style={{
        background: "#F5F0E6",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(30, 30, 30, 0.08)",
        aspectRatio: "16 / 10",
        display: "flex",
        minHeight: 380,
        textAlign: "left",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
      }}
    >
      <MockupSidebar />
      <MockupChatPanel />
      <MockupRightPanel />
    </div>
  );
}
