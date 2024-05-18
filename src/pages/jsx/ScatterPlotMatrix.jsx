import React from 'react';
import Plot from 'react-plotly.js';

const ScatterPlotMatrix = ({ data }) => {
  const trace = {
    type: 'splom',
    dimensions: data.map((d, index) => ({
      label: `Dimension ${index + 1}`,
      values: d,
    })),
    text: data[0].map((_, i) => `Point ${i + 1}`),
    marker: {
      color: Array(data[0].length).fill('blue')
    }
  };

  return (
    <Plot
      data={[trace]}
      layout={{ height: 700, width: 1700 }}
    />
  );
};

export default ScatterPlotMatrix;
