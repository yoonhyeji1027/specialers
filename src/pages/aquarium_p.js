import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar.js';
import "./Aquarium_p.css";
import LocalLineGraph from './LocalLineGraph.jsx'

export default function Aquarium_p() {

  const [localLineDataList, setLocalLineDataList] = useState([]);
  let _localLineDataList = [];

  const fetchData = async () => {
    try {
      const local_response = await axios.get('http://localhost:3001/predict');
      
      _localLineDataList = [];
      local_response.data.predict.forEach(predict => {
        const temp_data = { x: predict.formatted_mea_dt ?? 0, y: predict.temperature ?? 0 };
        const ph_data = { x: predict.formatted_mea_dt ?? 0, y: predict.ph ?? 0 };
        const do_data = { x: predict.formatted_mea_dt ?? 0, y: predict.do ?? 0 };
        const existingItemIndex_temp = _localLineDataList.findIndex(item => item.id === `Temperature`);
        const existingItemIndex_do = _localLineDataList.findIndex(item => item.id === `DO`);
        const existingItemIndex_ph = _localLineDataList.findIndex(item => item.id === `pH`);

        if (existingItemIndex_temp !== -1) {
          _localLineDataList[existingItemIndex_temp].data.push(temp_data);
        }
        else if (existingItemIndex_temp === -1){
          _localLineDataList.push({ id: `Temperature`, data: [temp_data] });
        }
        if (existingItemIndex_do !== -1) {
          _localLineDataList[existingItemIndex_do].data.push(do_data);
        }
        else if (existingItemIndex_do === -1){
          _localLineDataList.push({ id: `DO`, data: [do_data] });
        }
        if (existingItemIndex_ph !== -1) {
          _localLineDataList[existingItemIndex_ph].data.push(ph_data);
        }
        else if (existingItemIndex_ph === -1){
          _localLineDataList.push({ id: `pH`, data: [ph_data] });
        } 
      });

      setLocalLineDataList(_localLineDataList);
    } catch (error) {
      console.error('데이터를 불러오는 중 에러 발생:', error);
    }
  };


  useEffect(() => {
    fetchData(); // 컴포넌트가 마운트되었을 때 한 번 데이터를 불러옴
    const intervalId = setInterval(fetchData, 15000);
    // 15초마다 fetchData 함수 실행

    return () => {
      console.log('새로고침');
      clearInterval(intervalId); // 컴포넌트가 언마운트될 때 타이머 해제
    };
  }, []);


    return (
      <div className='table-container'>
        <table>
          <NavBar />
          
          <div className='aquarium'>
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
            <h4>수조 1의 수조 환경 예측 결과</h4>

            <button>새로고침</button>

            <div className='graph_view' style={{ width: '1700px', height: '700px' }}>
            <LocalLineGraph data={localLineDataList} />
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