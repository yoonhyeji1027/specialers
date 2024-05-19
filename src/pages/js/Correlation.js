import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar.js';
import HeatMapGraph from '../jsx/HeatmapGraph.jsx';
import "../css/Correlation.css";

export default function Correlation() {
  const [localHeatmapDataList, setLocalHeatmapDataList] = useState([]);

  const transformDataForHeatMap = (data) => {
    if (!data || !data.correlation_matrix) {
        return [];
    }

    const variables = Array.from(new Set(data.correlation_matrix.flatMap(d => [d.variable1, d.variable2])));
    
    return variables.map(variable1 => {
        return {
            id: variable1,
            data: variables.map(variable2 => {
                const correlation = data.correlation_matrix.find(d => d.variable1 === variable1 && d.variable2 === variable2)?.correlation || 0;
                return { x: variable2, y: parseFloat(correlation.toFixed(3)) };
            })
        };
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/correlation_matrix');
      if (response.data && response.data.success && response.data.correlation_matrix) {
        setLocalHeatmapDataList(transformDataForHeatMap(response.data));
      } else {
          console.error('Unexpected response data:', response.data);
          setLocalHeatmapDataList([]); // 예외처리
      }
    } catch (error) {
      console.error('Error fetching correlation data:', error);
      setLocalHeatmapDataList([]); // 예외처리
    }
  };

  useEffect(() => {
    fetchData(); // 컴포넌트가 마운트되었을 때 한 번 데이터를 불러옴
    const intervalId = setInterval(fetchData, 15000); // 15초마다 fetchData 함수 실행

    return () => {
      console.log('새로고침');
      clearInterval(intervalId); // 컴포넌트가 언마운트될 때 타이머 해제
    };
  }, []);

  return (
    <div className='table-container'>
      <NavBar />
      <div className='correlation'>
        <div className='title'>
          <h3>수조선택
            <select style={{ width: '250px', height: '40px', fontSize: '20px' }}>
              <option>분류</option>
              <option>1</option>
              <option>2</option>
            </select>
          </h3>
        </div>

        <div className='graph_board'>
          <h4>수조 1의 상관관계 분석 결과</h4>

          <button onClick={fetchData}>새로고침</button>

          <div className='graph_view' style={{ width: "1700px", height: "700px" }}>
            <HeatMapGraph data={localHeatmapDataList} />
          </div>
        </div>
      </div>

      <footer>
        <nav>
          <a href="S_info.js" className="footer_link">회사소개</a>
          <a href="J_info.js" className="footer_link">제품소개</a>
          <a href="SalmonPage.js" className="footer_link">연어양식</a>
          <a href="Map.js" className="footer_link">오시는길</a>
        </nav>
        <address>
          <p>(주) 아쿠아포닉스</p>
          <p>주소: 강원특별자치도 강릉시 범일로 579번길 24</p>
        </address>
      </footer>
    </div>
  );
}

