import { useState } from "react";
import "./App.css";
import { Results } from "./Results";

let worker: Worker | null = null;
function App() {
  const [numbers, setNumbers] = useState<{ time: number; value: number }[]>([]);
  const [inProgress, setInProgress] = useState(false);

  const onWorkerMessage = (
    e: MessageEvent<{ time: number; value: number }>
  ) => {
    const { time, value } = e.data;
    setNumbers((prev) => {
      return [...prev, { time, value }];
    });
  };

  const runWorker = () => {
    setNumbers([]);
    worker = new Worker(new URL("./fibWorker.ts", import.meta.url));
    worker.onmessage = onWorkerMessage;
    worker.onerror = (err: any) => err;
    worker.postMessage({ start: true });
  };

  const onSubmit = () => {
    setInProgress(true);
    runWorker();
  };

  const onStop = () => {
    setInProgress(false);
    worker?.terminate();
    worker = null;
  };

  return (
    <main className="main">
      <div className="forms-wrapper">
        <div>
          <h2>Worker fib</h2>
          <p>Start calculating fibonacci numbers</p>
          {!inProgress && <button onClick={onSubmit}>Submit</button>}
          {inProgress && <button onClick={onStop}>Stop</button>}
        </div>
      </div>

      <Results computedFibs={numbers} />
    </main>
  );
}

export default App;
