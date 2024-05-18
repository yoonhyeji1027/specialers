import React from 'react';
import NavBar from './NavBar.js';
import ScatterPlotMatrix from '../jsx/ScatterPlotMatrix.jsx';
import "../css/Correlation.css";

export default function Correlation() {
  const exampleData = [
    [1, 2, 3, 4, 5],
    [10, 20, 30, 40, 50],
    [100, 200, 300, 400, 500],
    [1000, 2000, 3000, 4000, 5000]
  ];

  return (
    <div className='table-container'>
      <NavBar />
      <div className='correlation'>
        <div className='graph_board'>
          <h4>상관관계 분석 결과</h4>
          <div className='graph_view' style={{ width: "1700px", height: "700px" }}>
            <ScatterPlotMatrix data={exampleData} />
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
