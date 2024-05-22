import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar.js';
import ScatterPlotGraph from '../jsx/ScatterPlotGraph.jsx';
import "../css/Outlier.css";

export default function Outlier() {
  const [selectedOption, setSelectedOption] = useState('분류');
  const [displayOption, setDisplayOption] = useState(null);

  const [tempDataList, setTempDataList] = useState([]);
  let _tempDataList = [];
  const [phDataList, setPhDataList] = useState([]);
  let _phDataList = [];
  const [doDataList, setDoDataList] = useState([]);
  let _doDataList = [];
  const [salinityDataList, setSalinityDataList] = useState([]);
  let _salinityDataList = [];

  const [tempMeanDataList, setTempMeanDataList] = useState([]);
  let _tempMeanDataList = [];
  const [phMeanDataList, setPhMeanDataList] = useState([]);
  let _phMeanDataList = [];
  const [doMeanDataList, setDoMeanDataList] = useState([]);
  let _doMeanDataList = [];
  const [salinityMeanDataList, setSalinityMeanDataList] = useState([]);
  let _salinityMeanDataList = [];

  const [tempRealDataList, setTempRealDataList] = useState([]);
  let _tempRealDataList = [];
  const [phRealDataList, setPhRealDataList] = useState([]);
  let _phRealDataList = [];
  const [doRealDataList, setDoRealDataList] = useState([]);
  let _doRealDataList = [];
  const [salinityRealDataList, setSalinityRealDataList] = useState([]);
  let _salinityRealDataList = [];

  const [do_min, setDoMin] = useState();
  let _do_min;
  const [do_max, setDoMax] = useState();
  let _do_max;
  const [ph_min, setPhMin] = useState();
  let _ph_min;
  const [ph_max, setPhMax] = useState();
  let _ph_max;
  const [temp_min, setTempMin] = useState();
  let _temp_min;
  const [temp_max, setTempMax] = useState();
  let _temp_max; 
  const [salinity_min, setSalinityMin] = useState();
  let _salinity_min;
  const [salinity_max, setSalinityMax] = useState();
  let _salinity_max;

  const fetchData = async () => {
    try {
      const z_score_response = await axios.get('http://localhost:3001/z_score');  //.get()함수로 /z_score라는 엔드포인트에 데이터 요청해서 z_score_response에 받은 데이터 저장.
      const MinMax_response = await axios.get('http://localhost:3001/MMA');       //.get()함수로 /MMA라는 엔드포인트에 데이터 요청해서 MinMax_response에 받은 데이터 저장.
      
      //임시 배열
      _tempDataList = [];
      _phDataList = [];
      _doDataList = [];
      _salinityDataList = [];
      _tempMeanDataList = [];
      _phMeanDataList = [];
      _doMeanDataList = [];
      _salinityMeanDataList = [];
      _tempRealDataList = [];
      _phRealDataList = [];
      _doRealDataList = [];
      _salinityRealDataList = [];
      
      //임시 변수
      _do_min = 0;
      _do_max = 0;
      _ph_min = 0;
      _ph_max = 0;
      _temp_min = 0;
      _temp_max = 0;
      _salinity_min = 0;
      _salinity_max = 0;

      //MinMax_response에 data에 있는 MMA라는 데이터를 한줄씩 잘라서 MMA에 저장한 후 함수안에있는 코드를 실행시키는 for문같은 코드임.
      MinMax_response.data.MMA.forEach(MMA => {
        _do_min = MMA.do_min;   //MMA에 있는 do_min의 값을 _do_min에 저장
        _do_max = MMA.do_max;
        _ph_min = MMA.ph_min;
        _ph_max = MMA.ph_max;
        _temp_min = MMA.temperature_min;
        _temp_max = MMA.temperature_max;
        _salinity_min = MMA.salinity_min;
        _salinity_max = MMA.salinity_max;
      })

      //데이터 저장하는 함수
      const SetData = () => {
        setDoMin(_do_min);    //setDoMin함수로 _do_min을 do_min에 저장
        setDoMax(_do_max);
        setPhMin(_ph_min);
        setPhMax(_ph_max);
        setTempMin(_temp_min);
        setTempMax(_temp_max);
        setSalinityMin(_salinity_min);
        setSalinityMax(_salinity_max);
      };

      //Aquariup_p.js 43번째 줄이랑 같은 코드, 안에 변수 들어가는것만 다름
      z_score_response.data.z_score.forEach(z_score => {
        // 여기는 그래프에 들어갈거
        const temp_data = { x: z_score.formatted_mea_dt ?? 0, y: z_score.temp ?? 0 };
        const ph_data = { x: z_score.formatted_mea_dt ?? 0, y: z_score.ph ?? 0 };
        const do_data = { x: z_score.formatted_mea_dt ?? 0, y: z_score.do ?? 0 };
        const salinity_data = { x: z_score.formatted_mea_dt ?? 0, y: z_score.salinity ?? 0 };
        const existingItemIndex_temp = _tempDataList.findIndex(item => item.id === `Temperature`);
        const existingItemIndex_do = _doDataList.findIndex(item => item.id === `DO`);
        const existingItemIndex_ph = _phDataList.findIndex(item => item.id === `pH`);
        const existingItemIndex_salinity = _salinityDataList.findIndex(item => item.id === `salinity`);

        //여기는 텍스트에 들어갈거(평균)
        const temp_mean_data = { x: z_score.formatted_mea_dt ?? 0, y: z_score.temp_mean ?? 0 };
        const ph_mean_data = { x: z_score.formatted_mea_dt ?? 0, y: z_score.ph_mean ?? 0 };
        const do_mean_data = { x: z_score.formatted_mea_dt ?? 0, y: z_score.do_mean ?? 0 };
        const salinity_mean_data = { x: z_score.formatted_mea_dt ?? 0, y: z_score.salinity_mean ?? 0 };
        const existingItemIndex_temp_mean = _tempMeanDataList.findIndex(item => item.id === `Temperature`);
        const existingItemIndex_do_mean = _doMeanDataList.findIndex(item => item.id === `DO`);
        const existingItemIndex_ph_mean = _phMeanDataList.findIndex(item => item.id === `pH`);
        const existingItemIndex_salinity_mean = _salinityMeanDataList.findIndex(item => item.id === `salinity`);

        //(실제)
        const temp_real_data = { x: z_score.formatted_mea_dt ?? 0, y: z_score.temp_real ?? 0 };
        const ph_real_data = { x: z_score.formatted_mea_dt ?? 0, y: z_score.ph_real ?? 0 };
        const do_real_data = { x: z_score.formatted_mea_dt ?? 0, y: z_score.do_real ?? 0 };
        const salinity_real_data = { x: z_score.formatted_mea_dt ?? 0, y: z_score.salinity_real ?? 0 };
        const existingItemIndex_temp_real = _tempRealDataList.findIndex(item => item.id === `Temperature`);
        const existingItemIndex_do_real = _doRealDataList.findIndex(item => item.id === `DO`);
        const existingItemIndex_ph_real = _phRealDataList.findIndex(item => item.id === `pH`);
        const existingItemIndex_salinity_real = _salinityRealDataList.findIndex(item => item.id === `salinity`);


        //그래프
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
        if (existingItemIndex_salinity !== -1) {
          _salinityDataList[existingItemIndex_salinity].data.push(salinity_data);
        }
        else if (existingItemIndex_salinity === -1){
          _salinityDataList.push({ id: `salinity`, data: [salinity_data] });
        } 

        //평균
        if (existingItemIndex_temp_mean !== -1) {
          _tempMeanDataList[existingItemIndex_temp_mean].data.push(temp_mean_data); 
        }
        else if (existingItemIndex_temp_mean === -1){
          _tempMeanDataList.push({ id: `Temperature`, data: [temp_mean_data] });
        }
        if (existingItemIndex_do_mean !== -1) {
          _doMeanDataList[existingItemIndex_do_mean].data.push(do_mean_data);
        }
        else if (existingItemIndex_do_mean === -1){
          _doMeanDataList.push({ id: `DO`, data: [do_mean_data] });
        }
        if (existingItemIndex_ph_mean !== -1) {
          _phMeanDataList[existingItemIndex_ph_mean].data.push(ph_mean_data);
        }
        else if (existingItemIndex_ph_mean === -1){
          _phMeanDataList.push({ id: `pH`, data: [ph_mean_data] });
        } 
        if (existingItemIndex_salinity_mean !== -1) {
          _salinityMeanDataList[existingItemIndex_salinity_mean].data.push(salinity_mean_data);
        }
        else if (existingItemIndex_salinity_mean === -1){
          _salinityMeanDataList.push({ id: `salinity`, data: [salinity_mean_data] });
        } 
        //실제
        if (existingItemIndex_temp_real !== -1) {
          _tempRealDataList[existingItemIndex_temp_real].data.push(temp_real_data); 
        }
        else if (existingItemIndex_temp_real === -1){
          _tempRealDataList.push({ id: `Temperature`, data: [temp_real_data] });
        }
        if (existingItemIndex_do_real !== -1) {
          _doRealDataList[existingItemIndex_do_real].data.push(do_real_data);
        }
        else if (existingItemIndex_do_real === -1){
          _doRealDataList.push({ id: `DO`, data: [do_real_data] });
        }
        if (existingItemIndex_ph_real !== -1) {
          _phRealDataList[existingItemIndex_ph_real].data.push(ph_real_data);
        }
        else if (existingItemIndex_ph_real === -1){
          _phRealDataList.push({ id: `pH`, data: [ph_real_data] });
        } 
        if (existingItemIndex_salinity_real !== -1) {
          _salinityRealDataList[existingItemIndex_salinity_real].data.push(salinity_real_data);
        }
        else if (existingItemIndex_salinity_real === -1){
          _salinityRealDataList.push({ id: `salinity`, data: [salinity_real_data] });
        } 
      });
      //그래프
      setTempDataList(_tempDataList);
      setPhDataList(_phDataList);
      setDoDataList(_doDataList);
      setSalinityDataList(_salinityDataList);
      //평균
      setTempMeanDataList(_tempMeanDataList);
      setPhMeanDataList(_phMeanDataList);
      setDoMeanDataList(_doMeanDataList);
      setSalinityMeanDataList(_salinityMeanDataList);
      //실제
      setTempRealDataList(_tempRealDataList);
      setPhRealDataList(_phRealDataList);
      setDoRealDataList(_doRealDataList);
      setSalinityRealDataList(_salinityRealDataList);
      //최소최대
      SetData();

    } catch (error) {
      console.error('데이터를 불러오는 중 에러 발생:', error);
    }
  };
  

  useEffect(() => {
    console.log("use");
    fetchData(); // 컴포넌트가 마운트되었을 때 한 번 데이터를 불러옴
    const intervalId = setInterval(fetchData, 15000);
    // 15초마다 fetchData 함수 실행

    return () => {
      console.log('새로고침');
      clearInterval(intervalId); // 컴포넌트가 언마운트될 때 타이머 해제
    };
  }, []);

  const handleSelectChange = (event) => {
    console.log("select");
    setSelectedOption(event.target.value);
  };

  const handlePlotData = () => {
    console.log("plot");
    if (selectedOption !== '분류') {
      setDisplayOption(selectedOption);
      //const filteredData = outlierDataList.filter(item => item.id === selectedOption);
      //setData([{ id: `category-${selectedOption}`, data: filteredData }]);
    } else {
      setDisplayOption('분류');
    }
  };


  const renderResultMessage = () => {
    console.log("result");
    if (displayOption === '분류') {
      return (
        <div className="multiple-graphs">
          <div className="scatter-plot">
            <ScatterPlotGraph data={tempDataList} />
          </div>
          <div className="scatter-plot">
            <ScatterPlotGraph data={phDataList} />
          </div>
          <div className="scatter-plot">
            <ScatterPlotGraph data={doDataList} />
          </div>
          <div className="scatter-plot">
            <ScatterPlotGraph data={salinityDataList} />
          </div>
        </div>
      );
    }
    else if (displayOption === 'DO'){
      return (
      <div className='o_graph_view' style={{ width: '800px', height: '500px' }}>
        <ScatterPlotGraph data={doDataList} />
      </div>
      )
    }
    else if (displayOption === 'Temperature'){
      return (
      <div className='o_graph_view' style={{ width: '800px', height: '500px' }}>
        <ScatterPlotGraph data={tempDataList} />
      </div>
      )
    }
    else if (displayOption === 'pH'){
      return (
      <div className='o_graph_view' style={{ width: '800px', height: '500px' }}>
        <ScatterPlotGraph data={phDataList} />
      </div>
      )
    }
    else if (displayOption === 'salinity'){
      return (
      <div className='o_graph_view' style={{ width: '800px', height: '500px' }}>
        <ScatterPlotGraph data={salinityDataList} />
      </div>
      )
    }
    };

    const messageReturn = () => {
      if (doDataList.length === 0 || !doDataList[0] || !doDataList[0].data) {   //Aquarium_p.js에 180째줄이랑 같은 코드, 안에 들어가는 변수만 다름
        return <p>데이터를 불러오는 중...</p>;
      }
      if (doMeanDataList.length === 0 || !doMeanDataList[0] || !doMeanDataList[0].data) {
        return <p>데이터를 불러오는 중...</p>;
      }
      if (doRealDataList.length === 0 || !doRealDataList[0] || !doRealDataList[0].data) {
        return <p>데이터를 불러오는 중...</p>;
      }
  
      const isOutlier = (value, min, max) => value < min || value > max;    //value값이 min값보다 작거나, max값보다 크면 True반환. 아니면 False
      //z_score
      const lastDoValue = doDataList[0].data[doDataList[0].data.length - 1].y;
      const lastTempValue = tempDataList[0].data[tempDataList[0].data.length - 1].y;
      const lastPhValue = phDataList[0].data[phDataList[0].data.length - 1].y;
      const lastSalinityValue = salinityDataList[0].data[salinityDataList[0].data.length - 1].y;

      //평균
      const lastDoMeanValue = doMeanDataList[0].data[doMeanDataList[0].data.length - 1].y;
      const lastTempMeanValue = tempMeanDataList[0].data[tempMeanDataList[0].data.length - 1].y;
      const lastPhMeanValue = phMeanDataList[0].data[phMeanDataList[0].data.length - 1].y;
      const lastSalinityMeanValue = salinityMeanDataList[0].data[salinityMeanDataList[0].data.length - 1].y;

      //실제
      const lastDoRealValue = doRealDataList[0].data[doRealDataList[0].data.length - 1].y;
      const lastTempRealValue = tempRealDataList[0].data[tempRealDataList[0].data.length - 1].y;
      const lastPhRealValue = phRealDataList[0].data[phRealDataList[0].data.length - 1].y;
      const lastSalinityRealValue = salinityRealDataList[0].data[salinityRealDataList[0].data.length - 1].y;

      switch (displayOption) {
        case 'DO':
          return (
            <div>
              <h3>DO에 대한 결과</h3>
              {isOutlier(lastDoValue, -1.5, 1.5) ? (
                <p>
                  현재 DO 데이터의 이상치가 탐지 되었습니다.<br />
                  최소값 : {do_min}, 최대값 : {do_max} 평균 : {lastDoMeanValue} 의 값을 가집니다.<br/>
                  현재는 {lastDoRealValue} 값을 지니고 있습니다.<br />
                  데이터 조치를 권장합니다.
                </p>
              ) : (
                <p>현재 이상치가 탐지되지 않았습니다.<br />
                   현재 값 : {lastDoRealValue}, 최소값 : {do_min}, 최대값 : {do_max} 평균 : {lastDoMeanValue}<br/></p>
              )}
            </div>
          );
        case 'Temperature':
          return (
            <div>
              <h3>temperature에 대한 결과</h3>
              {isOutlier(lastTempValue, -1.5, 1.5) ? (
                <p>
                현재 Temperature 데이터의 이상치가 탐지 되었습니다.<br />
                최소값 : {temp_min}, 최대값 : {temp_max} 평균 : {lastTempMeanValue} 의 값을 가집니다.<br/>
                현재는 {lastTempRealValue} 값을 지니고 있습니다.<br />
                데이터 조치를 권장합니다.
              </p>
            ) : (
              <p>현재 이상치가 탐지되지 않았습니다.<br />
                 현재 값 : {lastTempRealValue}, 최소값 : {temp_min}, 최대값 : {temp_max} 평균 : {lastTempMeanValue}<br/></p>
            )}
          </div>
          );
        case 'pH':
          return (
            <div>
              <h3>ph에 대한 결과</h3>
              {isOutlier(lastPhValue, -1.5, 1.5) ? (
                <p>
                현재 ph 데이터의 이상치가 탐지 되었습니다.<br />
                최소값 : {ph_min}, 최대값 : {ph_max} 평균 : {lastPhMeanValue} 의 값을 가집니다.<br/>
                현재는 {lastPhRealValue} 값을 지니고 있습니다.<br />
                데이터 조치를 권장합니다.
              </p>
            ) : (
              <p>현재 이상치가 탐지되지 않았습니다.<br />
                 현재 값 : {lastPhRealValue}, 최소값 : {ph_min}, 최대값 : {ph_max} 평균 : {lastPhMeanValue}<br/></p>
            )}
          </div>
          );
        case 'salinity':
          return (
            <div>
              <h3>salinity에 대한 결과</h3>
              {isOutlier(lastSalinityValue, -1.5, 1.5) ? (
                <p>
                현재 Salinity 데이터의 이상치가 탐지 되었습니다.<br />
                최소값 : {salinity_min}, 최대값 : {salinity_max} 평균 : {lastSalinityMeanValue} 의 값을 가집니다.<br/>
                현재는 {lastSalinityRealValue} 값을 지니고 있습니다.<br />
                데이터 조치를 권장합니다.
              </p>
            ) : (
              <p>현재 이상치가 탐지되지 않았습니다.<br />
                 현재 값 : {lastSalinityRealValue}, 최소값 : {salinity_min}, 최대값 : {salinity_max} 평균 : {lastSalinityMeanValue}<br/></p>
            )}
          </div>
          );
        default:
          return null;
      }
    };

  return (
    console.log("html"),
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
              <option value='salinity'>salinity</option>
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