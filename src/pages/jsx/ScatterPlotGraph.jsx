// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/scatterplot
import { ResponsiveScatterPlot } from '@nivo/scatterplot'

const ScatterPlotGraph = ({ data /* see data tab */ }) => {
    // x축에 표시할 유효한 날짜 값만 필터링하고 변환합니다.
    
    const allXValues = data.flatMap(d =>
        d.data.map(point => {
            // point.x 문자열을 ISO 8601 형식으로 변환
            const dateStr = point.x.replace(' ', 'T');
            const date = new Date(dateStr);
            return !isNaN(date) ? date : null; // 유효한 날짜만 반환
        })
    ).filter(date => date !== null); // 유효한 날짜만 포함

    // 고유한 x값을 추출하고 정렬합니다.
    const uniqueXValues = Array.from(new Set(allXValues)).sort((a, b) => a - b);

    // x축 눈금을 처음과 마지막 값으로 설정합니다.
    const tickValues = [uniqueXValues[0], uniqueXValues[uniqueXValues.length - 1]];

    const allYValues = data.flatMap(d => d.data.map(point => point.y));
    const yMin = Math.min(...allYValues) - 0.5;
    const yMax = Math.max(...allYValues) + 0.5;

    // 데이터를 다시 변환하여 날짜 객체를 사용하도록 합니다.
    const transformedData = data.map(d => ({
        ...d,
        data: d.data.map(point => ({
            ...point,
            x: new Date(point.x.replace(' ', 'T'))
        }))
    }));

    return (
        <div style={{ height: 500 }}>
            <ResponsiveScatterPlot
                data={transformedData}
                margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
                xScale={{
                    type: 'time',
                    min: tickValues[0],
                    max: tickValues[1]
                }}
                xFormat="time: %Y-%m-%d %H:%M"
                yScale={{ type: 'linear', min: yMin, max: yMax}}
                yFormat=">-.2f"
                blendMode="multiply"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Time',
                    legendPosition: 'middle',
                    legendOffset: 46,
                    format: '%Y-%m-%d %H:%M',
                    tickValues: tickValues // 표시할 눈금 값 설정
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'size',
                    legendPosition: 'middle',
                    legendOffset: -60
                }}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 130,
                        translateY: 0,
                        itemWidth: 100,
                        itemHeight: 12,
                        itemsSpacing: 5,
                        itemDirection: 'left-to-right',
                        symbolSize: 12,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    );
}

export default ScatterPlotGraph;
