import React from 'react';
import { ResponsiveHeatMap } from '@nivo/heatmap';

const HeatMapGraph = ({ data }) => {
    if (!data || data.length === 0) {
        return <div>데이터를 불러오는 중입니다...</div>;
    }

    const keys = data.map(d => d.id);

    return (
        <div style={{ height: 500 }}>
            <ResponsiveHeatMap
                data={data}
                keys={keys}
                indexBy="id"
                margin={{ top: 100, right: 60, bottom: 60, left: 60 }}
                axisTop={{
                    orient: 'top',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -45,
                    legend: '',
                    legendOffset: 36
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                cellOpacity={1}
                cellBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.8]] }}
                defs={[
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'none',
                        color: 'inherit',
                        rotation: -45,
                        lineWidth: 4,
                        spacing: 7
                    }
                ]}
                fill={[{ id: 'lines' }]}
                animate={true}
                motionStiffness={80}
                motionDamping={9}
                hoverTarget="cell"
                cellHoverOthersOpacity={0.25}
            />
        </div>
    );
};

export default HeatMapGraph;
