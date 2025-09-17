// import * as Plot from "@observablehq/plot";
// import { createElement as h } from "react";

// export default function PlotFigure({ options }) {
//   return Plot.plot({ ...options, document: new Document() }).toHyperScript();
// }

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
