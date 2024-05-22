import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar.js';
import "../css/Aquarium_p.css";
import LocalLineGraph from '../jsx/LocalLineGraph.jsx'

export default function Aquarium_p() {
  const [selectedOption, setSelectedOption] = useState('분류');
  const [displayOption, setDisplayOption] = useState(null);

  const [tempDataList, setTempDataList] = useState([]);
  let _tempDataList = [];
  const [phDataList, setPhDataList] = useState([]);
  let _phDataList = [];
  const [doDataList, setDoDataList] = useState([]);
  let _doDataList = [];

  const [tempMseDataList, setTempMseDataList] = useState([]);
  let _tempMseDataList = [];
  const [phMseDataList, setPhMseDataList] = useState([]);
  let _phMseDataList = [];
  const [doMseDataList, setDoMseDataList] = useState([]);
  let _doMseDataList = [];
  

  const fetchData = async () => {
    try {
      const local_response = await axios.get('http://localhost:3001/predict');
      
      _tempDataList = [];
      _phDataList = [];
      _doDataList = [];

      _tempMseDataList = [];
      _phMseDataList = [];
      _doMseDataList = [];

      local_response.data.predict.forEach(predict => {
        //그래프, 예측값
        const temp_data = { x: predict.formatted_mea_dt ?? 0, y: predict.temperature ?? 0 };
        const ph_data = { x: predict.formatted_mea_dt ?? 0, y: predict.ph ?? 0 };
        const do_data = { x: predict.formatted_mea_dt ?? 0, y: predict.do ?? 0 };
        const existingItemIndex_temp = _tempDataList.findIndex(item => item.id === `Temperature`);
        const existingItemIndex_do = _doDataList.findIndex(item => item.id === `DO`);
        const existingItemIndex_ph = _phDataList.findIndex(item => item.id === `pH`);
        //평균오차값
        const temp_mse_data = { x: predict.formatted_mea_dt ?? 0, y: predict.temp_mse ?? 0 };
        const ph_mse_data = { x: predict.formatted_mea_dt ?? 0, y: predict.ph_mse ?? 0 };
        const do_mse_data = { x: predict.formatted_mea_dt ?? 0, y: predict.do_mse ?? 0 };
        const existingItemIndex_temp_mse = _tempMseDataList.findIndex(item => item.id === `Temperature`);
        const existingItemIndex_ph_mse = _phMseDataList.findIndex(item => item.id === `pH`);
        const existingItemIndex_do_mse = _doMseDataList.findIndex(item => item.id === `DO`);

        //그래프, 예측값
        if (existingItemIndex_temp !== -1) {
          _tempDataList[existingItemIndex_temp].data.push(temp_data); 
        }
        else if (existingItemIndex_temp === -1){
          _tempDataList.push({ id: `Temperature`, data: [temp_data] });
        }
        if (existingItemIndex_do !== -1) {
          _doDataList[existingItemIndex_do].data.push(do_data);
        }
        else if (existingItemIndex_do === -1){
          _doDataList.push({ id: `DO`, data: [do_data] });
        }
        if (existingItemIndex_ph !== -1) {
          _phDataList[existingItemIndex_ph].data.push(ph_data);
        }
        else if (existingItemIndex_ph === -1){
          _phDataList.push({ id: `pH`, data: [ph_data] });
        } 

        //평균오차값
        if (existingItemIndex_temp_mse !== -1) {
          _tempMseDataList[existingItemIndex_temp_mse].data.push(temp_mse_data); 
        }
        else if (existingItemIndex_temp_mse === -1){
          _tempMseDataList.push({ id: `Temperature`, data: [temp_mse_data] });
        }
        if (existingItemIndex_do_mse !== -1) {
          _doMseDataList[existingItemIndex_do_mse].data.push(do_mse_data);
        }
        else if (existingItemIndex_do_mse === -1){
          _doMseDataList.push({ id: `DO`, data: [do_mse_data] });
        }
        if (existingItemIndex_ph_mse !== -1) {
          _phMseDataList[existingItemIndex_ph_mse].data.push(ph_mse_data);
        }
        else if (existingItemIndex_ph_mse === -1){
          _phMseDataList.push({ id: `pH`, data: [ph_mse_data] });
        } 
      });
      //그래프, 예측값
      setTempDataList(_tempDataList);
      setPhDataList(_phDataList);
      setDoDataList(_doDataList);
      //평균오차값
      setTempMseDataList(_tempMseDataList);
      setPhMseDataList(_phMseDataList);
      setDoMseDataList(_doMseDataList);
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

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePlotData = () => {
    if (selectedOption !== '분류') {
      setDisplayOption(selectedOption);
      //const filteredData = outlierDataList.filter(item => item.id === selectedOption);
      //setData([{ id: `category-${selectedOption}`, data: filteredData }]);
    } else {
      setDisplayOption('분류');
    }
  };


  const renderResultMessage = () => {
    if (displayOption === '분류') {
      return (
        <div className="multiple-graphs">
          <div className="scatter-plot">
            <LocalLineGraph data={doDataList} />
          </div>
          <div className="scatter-plot">
            <LocalLineGraph data={tempDataList} />
          </div>
          <div className="scatter-plot">
            <LocalLineGraph data={phDataList} />
          </div>
        </div>
      );
    }
    else if (displayOption === 'DO'){
      return (
      <div className='graph_view' style={{ width: '800px', height: '500px' }}>
        <LocalLineGraph data={doDataList} />
      </div>
      )
    }
    else if (displayOption === 'Temperature'){
      return (
      <div className='graph_view' style={{ width: '800px', height: '500px' }}>
        <LocalLineGraph data={tempDataList} />
      </div>
      )
    }
    else if (displayOption === 'pH'){
      return (
      <div className='graph_view' style={{ width: '800px', height: '500px' }}>
        <LocalLineGraph data={phDataList} />
      </div>
      )
    }

  
    }
    const messageReturn = () => {
      if (doDataList.length === 0 || !doDataList[0] || !doDataList[0].data) {
        return <p>데이터를 불러오는 중...</p>;
      }
      if (doMseDataList.length === 0 || !doMseDataList[0] || !doMseDataList[0].data) {
        return <p>데이터를 불러오는 중...</p>;
      }

      const DoValue = doDataList[0].data[doDataList[0].data.length - 1].y;
      const TempValue = tempDataList[0].data[tempDataList[0].data.length - 1].y;
      const PhValue = phDataList[0].data[phDataList[0].data.length - 1].y;

      const MseDoValue = doMseDataList[0].data[doMseDataList[0].data.length - 1].y;
      const MseTempValue = tempMseDataList[0].data[tempMseDataList[0].data.length - 1].y;
      const MsePhValue = phMseDataList[0].data[phMseDataList[0].data.length - 1].y;

      switch (displayOption) {
        case 'DO':
          return (
            <p>다음 DO 데이터의 값은 {DoValue}로 예측했습니다. 평균 오차 값은 {MseDoValue}입니다.</p>
          );
        case 'Temperature':
          return (
            <p>다음 Temperature 데이터의 값은 {TempValue}로 예측했습니다. 평균 오차 값은 {MseTempValue}입니다.</p>
          );
        case 'pH':
          return (
            <p>다음p ph 데이터의 값은 {PhValue}로 예측했습니다. 평균 오차 값은 {MsePhValue}입니다.</p>
          );
        default:
          return null;
      }
    };



    return (
      <div className='table-container'>
      <NavBar />
      <div className='aquarium'>
        <div className='title'>
          <h3>
            데이터선택
            <select
              style={{ width: '250p x', height: '40px', fontSize: '20px' }}
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value='분류'>분류</option>
              <option value='DO'>do</option>
              <option value='Temperature'>temperature</option>
              <option value='pH'>ph</option>
            </select>
          </h3>
        </div>
        <div className='graph_board'>
          <button onClick={handlePlotData}>새로고침</button>
          {messageReturn()}
          {renderResultMessage()} 
          
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