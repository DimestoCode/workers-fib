import { ordinal_suffix } from "./helpers";

export const Results = ({
  computedFibs,
}: {
  computedFibs: { time: number; value: number }[];
}) => {
  return !!computedFibs.length ? (
    <div className="result-wrapper">
      {computedFibs.map((item, index) => {
        return (
          <div key={index} className="result-item">
            <p>
              The <b>{ordinal_suffix(index)}</b> Fibonacci number is{" "}
              <b>{item.value}</b> and it took <b>{item.time}ms</b> to compute.
            </p>
          </div>
        );
      })}
    </div>
  ) : null;
};
