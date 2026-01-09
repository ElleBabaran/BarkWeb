type PanelProps = { onBack: () => void };

export default function Detection({ onBack }: PanelProps) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={onBack}>Back</button>
      <h2>Detection Panel</h2>
      <p>Camera + face/uniform detection here</p>
    </div>
  );
}
