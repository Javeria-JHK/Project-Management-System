import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";

export default function PlotFigure({ options }) {
  const containerRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;

    const plot = Plot.plot(options);

    containerRef.current.appendChild(plot);

    return () => {
      plot.remove();
    };
  }, [options]);

  return <div ref={containerRef} />;
}
