import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/SalmonPage.css";
import NavBar from './NavBar.js';
import LineGraph from '../jsx/LineGraph.jsx'
import BarGraph from '../jsx/BarGraph.jsx'

export default function SalmonPage() {    //여기 주석은 페이지 완성하고 쓸게
  const [barTempDataList, setBarTempDataList] = useState([]);
  const [barDoDataList, setBarDoDataList] = useState([]);
  const [barPhDataList, setBarPhDataList] = useState([]);
  const [barSalinityDataList, setBarSalinityDataList] = useState([]);


  const [lineTempDataList, setLineTempDataList] = useState([]);
  let _lineTempDataList = [];
  const [lineDoDataList, setLineDoDataList] = useState([]);
  let _lineDoDataList = [];
  const [linePhDataList, setLinePhDataList] = useState([]);
  let _linePhDataList = [];
  const [lineSalinityDataList, setLineSalinityDataList] = useState([]);
  let _lineSalinityDataList = [];


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tanks');
      const _barTempDataList = await response.data.tanks.map((tank, index) => ({
        idx: tank.idx ?? 0,
        //mea_dt: tank.mea_dt,
        farm_id: tank.farm_id ?? 0,
        tank_id: tank.tank_id ?? 0,
        //do: tank.do ?? 0,
        temperature: tank.temperature ?? 0,
        //ph: tank.ph ?? 5,
        //salinity: response.data[key].salinity,
        //formatted_mea_dt: tank.formatted_mea_dt ?? 0
      }))
      const _barDoDataList = await response.data.tanks.map((tank, index) => ({
        idx: tank.idx ?? 0,
        //mea_dt: tank.mea_dt,
        farm_id: tank.farm_id ?? 0,
        tank_id: tank.tank_id ?? 0,
        do: tank.do ?? 0,
        //temperature: tank.temperature ?? 0,
        //ph: tank.ph ?? 5,
        //salinity: response.data[key].salinity,
        //formatted_mea_dt: tank.formatted_mea_dt ?? 0
      }))
      const _barPhDataList = await response.data.tanks.map((tank, index) => ({
        idx: tank.idx ?? 0,
        //mea_dt: tank.mea_dt,
        farm_id: tank.farm_id ?? 0,
        tank_id: tank.tank_id ?? 0,
        //do: tank.do ?? 0,
        //temperature: tank.temperature ?? 0,
        ph: tank.ph ?? 5,
        //salinity: response.data[key].salinity,
        //formatted_mea_dt: tank.formatted_mea_dt ?? 0
      }))
      const _barSalinityDataList = await response.data.tanks.map((tank, index) => ({
        idx: tank.idx ?? 0,
        //mea_dt: tank.mea_dt,
        farm_id: tank.farm_id ?? 0,
        tank_id: tank.tank_id ?? 0,
        //do: tank.do ?? 0,
        //temperature: tank.temperature ?? 0,
        //ph: tank.ph ?? 5,
        salinity: tank.salinity ?? 0,
        //formatted_mea_dt: tank.formatted_mea_dt ?? 0
      }))




      _lineTempDataList = [];
      _lineDoDataList = [];
      _linePhDataList = [];
      _lineSalinityDataList = [];

      response.data.tanks.forEach((tank, index) => {
        const id = tank.tank_id ?? 0;
        const data = { x: tank.formatted_mea_dt ?? 0, y: tank.temperature ?? 0 };
        const existingItemIndex = _lineTempDataList.findIndex(item => item.id === id);
        if (existingItemIndex !== -1) {
          _lineTempDataList[existingItemIndex].data.push(data);
        } else {
          _lineTempDataList.push({ id, data: [data] });
        }
      })
      response.data.tanks.forEach((tank, index) => {
        const id = tank.tank_id ?? 0;
        const data = { x: tank.formatted_mea_dt ?? 0, y: tank.do ?? 0 };
        const existingItemIndex = _lineDoDataList.findIndex(item => item.id === id);
        if (existingItemIndex !== -1) {
          _lineDoDataList[existingItemIndex].data.push(data);
        } else {
          _lineDoDataList.push({ id, data: [data] });
        }
      })
      response.data.tanks.forEach((tank, index) => {
        const id = tank.tank_id ?? 0;
        const data = { x: tank.formatted_mea_dt ?? 0, y: tank.ph ?? 0 };
        const existingItemIndex = _linePhDataList.findIndex(item => item.id === id);
        if (existingItemIndex !== -1) {
          _linePhDataList[existingItemIndex].data.push(data);
        } else {
          _linePhDataList.push({ id, data: [data] });
        }
      })
      response.data.tanks.forEach((tank, index) => {
        const id = tank.tank_id ?? 0;
        const data = { x: tank.formatted_mea_dt ?? 0, y: tank.salinity ?? 0 };
        const existingItemIndex = _lineSalinityDataList.findIndex(item => item.id === id);
        if (existingItemIndex !== -1) {
          _lineSalinityDataList[existingItemIndex].data.push(data);
        } else {
          _lineSalinityDataList.push({ id, data: [data] });
        }
      })

      setBarTempDataList(_barTempDataList);
      setBarDoDataList(_barDoDataList);
      setBarPhDataList(_barPhDataList);
      setBarSalinityDataList(_barSalinityDataList);

      setLineTempDataList(_lineTempDataList);
      setLineDoDataList(_lineDoDataList);
      setLinePhDataList(_linePhDataList);
      setLineSalinityDataList(_lineSalinityDataList);

      console.error('새로고침');
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
    <div className='table-container'> {/* 반응형 웹 구현때문에 설정해뒀던 클래스명임 */}
      <table>
        <NavBar /> {/*메인 페이지랑 텍스트 색이 달라서 각 페이지에 따로 추가*/}
        <h1 style={{ color: '#4D606B', marginTop: '100px' }}>수조영상</h1>

        <div className='sujo'> {/*수조 데이터 묶음 따로 그래프 묶음 따로 */}
          <div className='sujo_data'> {/*각 데이터별 묶음 */}
            <video autoPlay muted playsInline width="800px" height="550px" controls="controls">
              <source src="images/salmon.mp4" type='video/mp4'></source>
            </video>
            <div id='sujo_text'>
              <h3 style={{ color: '#4D606B' }}>연어 양식 영상</h3>
              <p style={{ color: '#515151', fontSize: '25px' }}>이 영상은 연어 양식장에서의 일상적인 관리 및 운영 과정을 보여줍니다.<br />특히 최신 양식 기술과 연어의 성장 과정을 강조하여,<br />실시간으로 제공되는 수조 데이터(용존 산소량, pH 등)가 어떻게<br />연어의 건강 유지 및 양식 환경 최적화에 기여하는지 설명합니다.<br />더 많은 정보를 원하시면, 아래 실시간 데이터를 조회할 수 있습니다.</p>
            </div>
          </div>
        </div>

        <hr style={{ borderStyle: 'dotted' }} />

        <div className='sp_graph'> {/*그래프 전체 묶음 */}
          <div className='sp_graph_data'> {/*각 그래프별 묶음*/}
            <h3 style={{ color: '#4D606B' }}>DO 데이터</h3>
            <div className='sp_graph_view' style={{ width: "1780px", height: "768px" }} >
              <BarGraph data={barDoDataList} />
              <LineGraph data={lineDoDataList} />
            </div>
            <div id='sp_graph_text' >
              <p style={{ color: '#515151', paddingRight: '350px' }}>BarGraph</p>
              <p style={{ color: '#515151', paddingLeft: '350px' }}>LineGraph</p>
            </div>
          </div>
          <div className='sp_graph_data'> {/*각 그래프별 묶음*/}
            <h3 style={{ color: '#4D606B' }}>Temperature 데이터</h3>
            <div className='sp_graph_view' style={{ width: "1780px", height: "768px" }}>
              <BarGraph data={barTempDataList} />
              <LineGraph data={lineTempDataList} />
            </div>
            <div id='sp_graph_text'>
              <p style={{ color: '#515151', paddingRight: '350px' }}>BarGraph</p>
              <p style={{ color: '#515151', paddingLeft: '350px' }}>LineGraph</p>
            </div>
          </div>
          <div className='sp_graph_data'> {/*각 그래프별 묶음*/}
            <h3 style={{ color: '#4D606B' }}>pH 데이터</h3>
            <div className='sp_graph_view' style={{ width: "1780px", height: "768px" }}>
              <BarGraph data={barPhDataList} />
              <LineGraph data={linePhDataList} />
            </div>
            <div id='sp_graph_text'>
              <p style={{ color: '#515151', paddingRight: '350px' }}>BarGraph</p>
              <p style={{ color: '#515151', paddingLeft: '350px' }}>LineGraph</p>
            </div>
          </div>
          <div className='sp_graph_data'> {/*각 그래프별 묶음*/}
            <h3 style={{ color: '#4D606B' }}>Salinity 데이터</h3>
            <div className='sp_graph_view' style={{ width: "1780px", height: "768px" }}>
              <BarGraph data={barSalinityDataList} />
              <LineGraph data={lineSalinityDataList} />
            </div>
            <div id='sp_graph_text'>
              <p style={{ color: '#515151', paddingRight: '350px' }}>BarGraph</p>
              <p style={{ color: '#515151', paddingLeft: '350px' }}>LineGraph</p>
            </div>
          </div>
        </div>


        <footer>
          <nav> {/* 푸터에서 각 페이지로 이동할 링크 리스트들 */}
            <a href="S_info.js" className="footer_link">회사소개</a>
            <a href="J_info.js" className="footer_link">제품소개</a>
            <a href="SalmonPage.js" className="footer_link">연어양식</a>
            <a href="Mapp.js" className="footer_link">오시는길</a>
          </nav>
          <address> {/* 링크가 필요 없는 주소 */}
            <p>(주) 아쿠아포닉스</p>
            <p>주소: 강원특별자치도 강릉시 범일로 579번길 24</p>
          </address>
        </footer>
      </table>


    </div>
  );
}