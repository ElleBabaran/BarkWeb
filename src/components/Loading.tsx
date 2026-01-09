// components/loading.tsx
import React from "react";

interface LoadingProps {
  onStart: () => void; // function called when loading finishes
}

const Loading: React.FC<LoadingProps> = ({ onStart }) => {
  return (
    <div>
      <h2>Loading...</h2>
      <button onClick={onStart}>Start App</button>
    </div>
  );
};

export default Loading;
