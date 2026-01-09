import { useState } from "react";
import Loading from "./components/loading";
import Cards from "./components/cards";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div>
      {!started ? (
        <Loading onStart={() => setStarted(true)} />
      ) : (
        <Cards />
      )}
    </div>
  );
}

export default App;
