import React from 'react';
import NavBar from './NavBar.js';
import ScatterPlotGraph from '../jsx/ScatterPlotGraph.jsx';
import "../css/Outlier.css";

export default function Outlier() {

  const data =

    [
      {
        "id": "group A",
        "data": [
          { x: 1, y: 1, category: '1' },
          { x: 2, y: 4, category: '1' },
          { x: 3, y: 9, category: '2' },
          { x: 4, y: 16, category: '2' },
        ]
      }
    ]

  return (
    <div className='table-container'>
      <table>
        <NavBar />

        <div className='outlier'>
          <div className='o_title'>
            <h3>데이터선택
              <select style={{ width: '250px', height: '40px', fontSize: '20px' }}>
                <option  >
                  분류
                </option>
                <option >1</option>
                <option >2</option>
              </select>
              <button>조회</button>
            </h3>

          </div>

          <div className='o_graph_board'>
            <h3>수조 1의 DO 데이터 조회 결과</h3>
            <h4>결과:</h4>
            <p>현재 이상치가 탐지되지 않았습니다.</p>
            <p>현재 DO 데이터의 이상치가 탐지 되었습니다.<br />평균 15.9 값을 지니지만 현재 5.5 값을 지니고 있습니다.<br />데이터 조치를 권장합니다.</p>

            <div className='o_graph_view' style={{ width: '800px', height: '500px' }}>
              <ScatterPlotGraph data={data} />
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
      </table>

    </div>
  );
}