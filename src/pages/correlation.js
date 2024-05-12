import React, { useState, useEffect } from 'react';
import NavBar from './NavBar.js';
import "./Correlation.css";
import BarGraph from './BarGraph.jsx'

export default function Correlation() {

  const [tanks, setTanks] = useState([]);
  const [barDataList, setBarDataList] = useState([{
    idx: 0,
    //mea_dt: '',
    farm_id: 0,
    tank_id: 0,
    do: 0,
    temperature: 0,
    ph: 0,
    //salinity: '',
    formatted_mea_dt: 0
  }])

  return (
    <div className='table-container'>
      <table>
        <NavBar />

        <div className='correlation'>
          <div className='title'>
            <h3>수조선택
            <select style={{ width: '250px', height: '40px', fontSize:'20px'}}>
              <option  >
                분류
              </option>
              <option >1</option>
              <option >2</option>
            </select>
            </h3>
          </div>

          <div className='graph_board'>
            <h4>수조 1의 상관관계 분석 결과</h4>

            <div className='graph_view' style={{ width: "1700px", height: "700px" }}>
              <BarGraph data={barDataList} />
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