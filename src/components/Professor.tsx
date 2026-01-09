type PanelProps = { onBack: () => void };

export default function Professor({ onBack }: PanelProps) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={onBack}>Back</button>
      <h2>Professor's Panel</h2>
      <p>Professor management tools here</p>
    </div>
  );
}
