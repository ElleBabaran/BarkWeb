import { useState } from "react";
import Capture from "./capture";
import Detection from "./Detection";
import Schedule from "./Schedule";

export default function Cards() {
  const [active, setActive] = useState<null | string>(null);

  if (active === "capture") return <Capture onBack={() => setActive(null)} />;
  if (active === "detection") return <Detection onBack={() => setActive(null)} />;
  if (active === "schedule") return <Schedule onBack={() => setActive(null)} />;

  return (
    <div className="cards-container">
      <div onClick={() => setActive("capture")} className="card">Capture</div>
      <div onClick={() => setActive("detection")} className="card">Detection</div>
      <div onClick={() => setActive("schedule")} className="card">Schedule</div>
    </div>
  );
}
