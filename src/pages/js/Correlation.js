import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar.js';
import HeatMapGraph from '../jsx/HeatmapGraph.jsx';
import "../css/Correlation.css";

export default function Correlation() {
  const [localHeatmapDataList, setLocalHeatmapDataList] = useState([]);

  const transformDataForHeatMap = (data) => {
    if (!data || !data.correlation_matrix) {    //받아온 data가 존재하는지, data객체에 correlation_matrix속성이 있는지 검사 후 없으면 빈 배별 반환
      return [];
    }

    const variables = Array.from(new Set(data.correlation_matrix.flatMap(d => [d.variable1, d.variable2])));
    //floatMap()함수로 correlation_matrix배열의 각 요소에서 variable1과 variable2 값을 추출 후 평탄화 하여 단일 배열로 만듬
    //단일 배열로 만든것을 new Set()함수를 이용하여 중복된 변수를 제거.
    //Array.from()함수를 이용하여 Set객체를 배열로 변환
    //변환한 배열을 variables에 저장


    return variables.map(variable1 => {   //variables배열을 map()함수를 통하여 한줄씩 분리해서 variable1에 저장
      return {
        id: variable1,
        data: variables.map(variable2 => {
          const correlation = data.correlation_matrix.find(d => d.variable1 === variable1 && d.variable2 === variable2)?.correlation || 0;
          //correlation_matrix의 variable1값과 map()함수로 저장한 variable1값이 같고
          //correlation_matrix의 variable2값과 map()함수로 저장한 variable2값이 같으면 data의 correlation요소의 값을
          //아니면 0을 반환한다.

          return { x: variable2, y: parseFloat(correlation.toFixed(3)) };   //x값에는 variable2를 y값에는 correlation값의 소숫점3번째 자리까지 float형으로 저장한 후 반환
        })
      };
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/correlation_matrix'); //.get()함수로 /correlation_matrix라는 엔드포인트에 데이터 요청해서 response에 받은 데이터 저장.
      if (response.data && response.data.success && response.data.correlation_matrix) {   //response에 data가 있고, data에 success가 있고, correlation_matrix요소가 있으면
        setLocalHeatmapDataList(transformDataForHeatMap(response.data));  //transformDataForHeatMap함수로 response의 데이터에 값이 있는지 확인 후
        //setLocalHeatmapDataList함수로 localHeatmapDataList변수에 저장.
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

        <div className='graph_board'>
          <h3>수조데이터의 상관관계 분석 결과</h3>

          <div className='c_text_box' style={{borderRadius:'5%'}}>
            <div id='text'>
              <p>PH, DO</p>
              <p>결과:</p>
              <p style={{ marginLeft: '30px' }}>PH와 DO의 상관계수 값은 { }입니다. 이 경우 { }의 상관관계를 가집니다.</p>
            </div>

            <div id='text'>
              <p>TMP, PH</p>
              <p>결과:</p>
              <p style={{ marginLeft: '30px' }}>TMP와 PH의 상관계수 값은 { }입니다. 이 경우 { }의 상관관계를 가집니다.</p>
            </div>

            <div id='text'>
              <p>SL, DO</p>
              <p>결과:</p>
              <p style={{ marginLeft: '30px' }}>SL과 DO의 상관계수 값은 { }입니다. 이 경우 { }의 상관관계를 가집니다.</p>
            </div>

            <div id='text'>
              <p>TMP, DO</p>
              <p>결과:</p>
              <p style={{ marginLeft: '30px' }}>TMP와 DO의 상관계수 값은 { }입니다. 이 경우 { }의 상관관계를 가집니다.</p>
            </div>

            <div id='text'>
              <p>SL, PH</p>
              <p>결과:</p>
              <p style={{ marginLeft: '30px' }}>SL과 DO의 상관계수 값은 { }입니다. 이 경우 { }의 상관관계를 가집니다.</p>
            </div>

            <div id='text'>
              <p>SL, TML</p>
              <p>결과:</p>
              <p style={{ marginLeft: '30px' }}>SL과 TMP의 상관계수 값은 { }입니다. 이 경우 { }의 상관관계를 가집니다.</p>
            </div>

          </div>

          <div className='graph_view' >

            <HeatMapGraph data={localHeatmapDataList} style={{ height: "1000px" }} />
          </div>
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