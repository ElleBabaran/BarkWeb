type PanelProps = { onBack: () => void };

export default function Capture({ onBack }: PanelProps) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={onBack}>Back</button>
      <h2>Capture Panel</h2>
      <p>Student form + camera here</p>
    </div>
  );
}
