import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar.js';
import "../css/Aquarium_p.css";
import LocalLineGraph from '../jsx/LocalLineGraph.jsx'

export default function Aquarium_p() {

  const [selectedOption, setSelectedOption] = useState('분류');
  const [data, setData] = useState([]);
  const [displayOption, setDisplayOption] = useState(null);

  const [tempDataList, setTempDataList] = useState([]);
  let _tempDataList = [];
  const [phDataList, setPhDataList] = useState([]);
  let _phDataList = [];
  const [doDataList, setDoDataList] = useState([]);
  let _doDataList = [];

  const fetchData = async () => {
    try {
      const local_response = await axios.get('http://localhost:3001/predict');
      
      _tempDataList = [];
      _phDataList = [];
      _doDataList = [];
      local_response.data.predict.forEach(predict => {
        const temp_data = { x: predict.formatted_mea_dt ?? 0, y: predict.temperature ?? 0 };
        const ph_data = { x: predict.formatted_mea_dt ?? 0, y: predict.ph ?? 0 };
        const do_data = { x: predict.formatted_mea_dt ?? 0, y: predict.do ?? 0 };
        const existingItemIndex_temp = _tempDataList.findIndex(item => item.id === `Temperature`);
        const existingItemIndex_do = _doDataList.findIndex(item => item.id === `DO`);
        const existingItemIndex_ph = _phDataList.findIndex(item => item.id === `pH`);

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
      });

      setTempDataList(_tempDataList);
      setPhDataList(_phDataList);
      setDoDataList(_doDataList);
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
      <div className='o_graph_view' style={{ width: '800px', height: '500px' }}>
        <LocalLineGraph data={doDataList} />
      </div>
      )
    }
    else if (displayOption === 'Temperature'){
      return (
      <div className='o_graph_view' style={{ width: '800px', height: '500px' }}>
        <LocalLineGraph data={tempDataList} />
      </div>
      )
    }
    else if (displayOption === 'pH'){
      return (
      <div className='o_graph_view' style={{ width: '800px', height: '500px' }}>
        <LocalLineGraph data={phDataList} />
      </div>
      )
    }

    }
    const messageReturn = () => {
      switch (displayOption) {
        case 'DO':
          return (
            <div>
              <h3>do에 대한 결과</h3>
              {data[0]?.data[0]?.y >= 3 ? (
                <p>현재 이상치가 탐지되지 않았습니다.</p>
              ) : (
                <p>
                  현재 DO 데이터의 이상치가 탐지 되었습니다.<br />
                  평균 15.9 값을 지니지만 현재 d 값을 지니고 있습니다.<br />
                  데이터 조치를 권장합니다.
                </p>
              )}
            </div>
          );
        case 'Temperature':
          return (
            <div>
              <h3>temperature에 대한 결과</h3>
              {data[0]?.data[0]?.y >= 3 ? (
                <p>현재 이상치가 탐지되지 않았습니다.</p>
              ) : (
                <p>
                  현재 DO 데이터의 이상치가 탐지 되었습니다.<br />
                  평균 15.9 값을 지니지만 현재 5.5 값을 지니고 있습니다.<br />
                  데이터 조치를 권장합니다.
                </p>
              )}
            </div>
          );
        case 'pH':
          return (
            <div>
              <h3>ph에 대한 결과</h3>
              {data[0]?.data[0]?.y >= 3 ? (
                <p>현재 이상치가 탐지되지 않았습니다.</p>
              ) : (
                <p>
                  현재 DO 데이터의 이상치가 탐지 되었습니다.<br />
                  평균 15.9 값을 지니지만 현재 5.5 값을 지니고 있습니다.<br />
                  데이터 조치를 권장합니다.
                </p>
              )}
            </div>
          );
        default:
          return null;
      }
    };



    return (
      <div className='table-container'>
      <NavBar />
      <div className='outlier'>
        <div className='o_title'>
          <h3>
            데이터선택
            <select
              style={{ width: '250px', height: '40px', fontSize: '20px' }}
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value='분류'>분류</option>
              <option value='DO'>do</option>
              <option value='Temperature'>temperature</option>
              <option value='pH'>ph</option>
            </select>
            <button onClick={handlePlotData}>조회</button>
          </h3>
        </div>
        <div className='o_graph_board'>
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