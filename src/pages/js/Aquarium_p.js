import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar.js';
import "../css/Aquarium_p.css";
import LocalLineGraph from '../jsx/LocalLineGraph.jsx'

export default function Aquarium_p() {
  
  //변수 지정(파란글씨),  지정한 변수 값 설정해주기(노란글씨)
  const [selectedOption, setSelectedOption] = useState('전체');
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


  //15초마다 실행시킬 함수 (데이터 설정같은거 들어있음)
  const fetchData = async () => {
    try {
      const local_response = await axios.get('http://localhost:3001/predict'); //.get()함수로 /predict라는 엔드포인트에 데이터 요청해서 local_response에 받은 데이터 저장.

      //이거는 임시 배열
      _tempDataList = [];
      _phDataList = [];
      _doDataList = [];

      _tempMseDataList = [];
      _phMseDataList = [];
      _doMseDataList = [];

      //local_response에 data에 있는 predict라는 데이터를 한줄씩 잘라서 predict에 저장한 후 함수안에있는 코드를 실행시키는 for문같은 코드임.
      local_response.data.predict.forEach(predict => {
        //그래프, 예측값
        const temp_data = { x: predict.formatted_mea_dt ?? 0, y: predict.temperature ?? 0 };  //predict에 있는 formatted_mea_dt변수를 x(key)에, temperature을 y(key)에 저장한 후 temp_data에 저장. 
        const ph_data = { x: predict.formatted_mea_dt ?? 0, y: predict.ph ?? 0 };
        const do_data = { x: predict.formatted_mea_dt ?? 0, y: predict.do ?? 0 };
        const existingItemIndex_temp = _tempDataList.findIndex(item => item.id === `Temperature`);   //_tempDataList 임시배열에 id(key)값이 Temperature이 있는지 확인 후 
        //있으면 마지막 index를 없으면 -1을 반환하여 existingItemIndex_temp에 저장
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
        if (existingItemIndex_temp !== -1) {    //existingItemIndex_temp에 저장된 값이 -1이 아니면
          _tempDataList[existingItemIndex_temp].data.push(temp_data);   //_tempDataList의 existingItemIndex_temp번째 방에 temp_data를 넣어줌
        }
        else if (existingItemIndex_temp === -1) {  //existingItemIndex_temp에 저장된 값이 -1이면
          _tempDataList.push({ id: `Temperature`, data: [temp_data] });   //_tempDataList에 id는 Temperature, data에는 temp_data를 저장한다.
        }
        if (existingItemIndex_do !== -1) {
          _doDataList[existingItemIndex_do].data.push(do_data);
        }
        else if (existingItemIndex_do === -1) {
          _doDataList.push({ id: `DO`, data: [do_data] });
        }
        if (existingItemIndex_ph !== -1) {
          _phDataList[existingItemIndex_ph].data.push(ph_data);
        }
        else if (existingItemIndex_ph === -1) {
          _phDataList.push({ id: `pH`, data: [ph_data] });
        }

        //평균오차값
        if (existingItemIndex_temp_mse !== -1) {
          _tempMseDataList[existingItemIndex_temp_mse].data.push(temp_mse_data);
        }
        else if (existingItemIndex_temp_mse === -1) {
          _tempMseDataList.push({ id: `Temperature`, data: [temp_mse_data] });
        }
        if (existingItemIndex_do_mse !== -1) {
          _doMseDataList[existingItemIndex_do_mse].data.push(do_mse_data);
        }
        else if (existingItemIndex_do_mse === -1) {
          _doMseDataList.push({ id: `DO`, data: [do_mse_data] });
        }
        if (existingItemIndex_ph_mse !== -1) {
          _phMseDataList[existingItemIndex_ph_mse].data.push(ph_mse_data);
        }
        else if (existingItemIndex_ph_mse === -1) {
          _phMseDataList.push({ id: `pH`, data: [ph_mse_data] });
        }
      });
      //그래프, 예측값
      setTempDataList(_tempDataList);   //setTempDataList함수로 _tempDataList를 tempDataList에 저장
      setPhDataList(_phDataList);
      setDoDataList(_doDataList);
      //평균오차값
      setTempMseDataList(_tempMseDataList);
      setPhMseDataList(_phMseDataList);
      setDoMseDataList(_doMseDataList);
    } catch (error) {   //에러떴을때 실행하는 코드(대안흐름)
      console.error('데이터를 불러오는 중 에러 발생:', error);
    }
  };

  //가장먼저 실행되는 함수
  useEffect(() => {
    fetchData(); // 컴포넌트가 마운트되었을 때 한 번 데이터를 불러옴
    const intervalId = setInterval(fetchData, 15000);
    // 15초마다 fetchData 함수 실행

    return () => {
      clearInterval(intervalId); // 컴포넌트가 언마운트될 때 타이머 해제
    };
  }, []);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePlotData = () => {
    if (selectedOption !== '전체') {
      setDisplayOption(selectedOption);
      //const filteredData = outlierDataList.filter(item => item.id === selectedOption);
      //setData([{ id: `category-${selectedOption}`, data: filteredData }]);
    } else {
      setDisplayOption('전체');
    }
  };


  const renderResultMessage = () => {
    if (displayOption === '전체') {
      return (
        <div className="multiple-graphs" style={{display: 'flex', flexWrap: 'nowrap', textAlign: 'center', width:'1600px', margin: '50px 150px' }}>
          <div className="scatter-plot" style={{width:'500px'}}>
            <LocalLineGraph data={doDataList} />
          </div>
          <div className="scatter-plot" style={{width:'500px'}}>
            <LocalLineGraph data={tempDataList} />
          </div>
          <div className="scatter-plot" style={{width:'500px'}}>
            <LocalLineGraph data={phDataList} />
          </div>
        </div>
      );
    }
    else if (displayOption === 'DO') {
      return (
        <div className='graph_view' style={{ width: '1500px', height: '500px', margin: '50px 150px' }}>
          <LocalLineGraph data={doDataList} />
        </div>
      )
    }
    else if (displayOption === 'Temperature') {
      return (
        <div className='graph_view' style={{ width: '1500px', height: '500px', margin: '50px 150px' }}>
          <LocalLineGraph data={tempDataList} />
        </div>
      )
    }
    else if (displayOption === 'pH') {
      return (
        <div className='graph_view' style={{ width: '1500px', height: '500px', margin: '50px 150px' }}>
          <LocalLineGraph data={phDataList} />
        </div>
      )
    }


  }
  const messageReturn = () => {
    if (doDataList.length === 0 || !doDataList[0] || !doDataList[0].data) {   //doDataList에 데이터가 있는지 없는지 확인 후 없으면 return값 출력
      return <p>데이터를 불러오는 중...</p>;
    }
    if (doMseDataList.length === 0 || !doMseDataList[0] || !doMseDataList[0].data) {
      return <p>데이터를 불러오는 중...</p>;
    }

    const DoValue = doDataList[0].data[doDataList[0].data.length - 1].y;    //doDataList의 data배열에 들어있는 마지막 데이터를 추출하여 DoValue에 저장.
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
          <p>다음 pH 데이터의 값은 {PhValue}로 예측했습니다. 평균 오차 값은 {MsePhValue}입니다.</p>
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
              style={{ width: '250px', height: '40px', fontSize: '20px' }}
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value='전체'>전체 데이터</option>
              <option value='DO'>DO</option>
              <option value='Temperature'>Temperature</option>
              <option value='pH'>pH</option>
            </select>
  
            <button className='a_check' onClick={handlePlotData}>조회</button>
            <div className='graph_board'>
            {displayOption && (
              <h4 style={{ textAlign: 'left', fontWeight: 700, marginTop: '50px' }}>{displayOption} 데이터의 수조 환경 예측 결과</h4>
            )}
  
              <div id='graph_view'>{renderResultMessage()}</div>
              <div style={displayOption && displayOption !== '전체' ? { borderRadius: 50, border: '2px solid #000', backgroundColor: 'transparent',
                width: '1650px', marginTop: '20px', marginLeft: '65px', marginRight: '65px', marginBottom: '70px' } : null}>{messageReturn()}</div>
              
            </div>
          </h3>
        </div>
      </div>
      
      <footer>
        <nav>
          <a href="S_info.js" className="footer_link">회사소개</a>
          <a href="J_info.js" className="footer_link">제품소개</a>
          <a href="SalmonPage.js" className="footer_link">연어양식</a>
          <a href="Mapp.js" className="footer_link">오시는길</a>
        </nav>
        <address>
          <p>(주) 아쿠아포닉스</p>
          <p>주소: 강원특별자치도 강릉시 범일로 579번길 24</p>
        </address>
      </footer>
    </div>
  ); 
}
