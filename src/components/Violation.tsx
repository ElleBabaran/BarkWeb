type PanelProps = { onBack: () => void };

export default function Violation({ onBack }: PanelProps) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={onBack}>Back</button>
      <h2>Violation Panel</h2>
      <p>Violation records table here</p>
    </div>
  );
}
