type PanelProps = { onBack: () => void };

export default function Schedule({ onBack }: PanelProps) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={onBack}>Back</button>
      <h2>Schedule Panel</h2>
      <p>Admin can add/remove schedules here</p>
    </div>
  );
}
