import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/SalmonPage.css";
import NavBar from './NavBar.js';
import PieGraph from '../jsx/PieGraph.jsx'
import LineGraph from '../jsx/LineGraph.jsx'
import BarGraph from '../jsx/BarGraph.jsx'

export default function SalmonPage() {    //여기 주석은 페이지 완성하고 쓸게

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

  const [lineDataList, setLineDataList] = useState([]);
  let _lineDataList = [];

  const [pieDataList, setPieDataList] = useState([
    {
      "id": "do",
      "label": "do",
      value: 0,
      "color": "hsl(302, 70%, 50%)"
    },
    {
      "id": "temperature",
      "label": "temperature",
      value: 0,
      "color": "hsl(181, 70%, 50%)"
    },
    {
      "id": "ph",
      "label": "ph",
      value: 0,
      "color": "hsl(344, 70%, 50%)"
    },
    {
      "id": "salinity",
      "label": "salinity",
      value: 0,
      "color": "hsl(257, 70%, 50%)"
    }
  ])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tanks');
      const _barDataList = await response.data.tanks.map((tank, index) => ({
        idx: tank.idx ?? 0,
        //mea_dt: tank.mea_dt,
        farm_id: tank.farm_id ?? 0,
        tank_id: tank.tank_id ?? 0,
        do: tank.do ?? 0,
        temperature: tank.temperature ?? 0,
        ph: tank.ph ?? 5,
        //salinity: response.data[key].salinity,
        formatted_mea_dt: tank.formatted_mea_dt ?? 0
      }))
      _lineDataList = [];
      response.data.tanks.forEach((tank, index) => {
        const id = tank.tank_id ?? 0;
        const data = { x: tank.formatted_mea_dt ?? 0, y: tank.temperature ?? 0 };
        const existingItemIndex = _lineDataList.findIndex(item => item.id === id);
        if (existingItemIndex !== -1) {
          _lineDataList[existingItemIndex].data.push(data);
        } else {
          _lineDataList.push({ id, data: [data] });
        }
      })
      const _pieDataList = await response.data.tanks.filter((tank, index) => index === 9).map((tank, index) => ([
        //idx: tank.idx ?? 0,
        //mea_dt: tank.mea_dt,
        //farm_id: tank.farm_id ?? 0,
        //tank_id: tank.tank_id ?? 0,
        {
          id: 'do',
          label: 'do',
          value: tank.do ?? 0,
          color: 'hsl(302, 70%, 50%)'
        }, {
          id: 'temperature',
          label: 'temperature',
          value: tank.temperature ?? 0,
          color: 'hsl(181, 70%, 50%)'
        }, {
          id: 'ph',
          label: 'ph',
          value: tank.ph ?? 5,
          color: 'hsl(344, 70%, 50%)'
        }, {
          id: 'salinity',
          label: 'salinity',
          value: tank.salinity ?? 0,
          color: 'hsl(257, 70%, 50%)'
        }
        //formatted_mea_dt: tank.formatted_mea_dt ?? 0
      ]))

      setTanks(response.data.tanks);
      setBarDataList(_barDataList);
      setLineDataList(_lineDataList);
      setPieDataList(_pieDataList.flat());

      console.log(_pieDataList);
      console.log(pieDataList);
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
            <video width="823px" height="768px" controls="controls">
              <source src="images/kkung1.mp4" type='video/mp4'></source>
            </video>
            <div id='sujo_text'>
              <h3 style={{ color: '#4D606B' }}>01_실시간 CCTV</h3>
              <p style={{ color: '#515151' }}>연어 양식장 관리를 하고있는 곳 입니다.<br />24시간동안 작동하며 연어의 생태를 보다 더 자세하게<br />관찰하기 위해 관리하고 있습니다.<br />실시간으로 계속 작동하고 있습니다.</p>
            </div>
          </div>
          <div className='sujo_data'>
            <video width="823px" height="768px" controls="controls">
              <source src="images/kkung2.mp4" type='video/mp4'></source>
            </video>
            <div id='sujo_text'>
              <h3 style={{ color: '#4D606B' }}>02_실시간 수조영상</h3>
              <p style={{ color: '#515151' }}>연어 양식장 관리를 하고있는 곳 입니다.<br />24시간동안 작동하며 연어의 생태를 보다 더 자세하게<br />관찰하기 위해 관리하고 있습니다.<br />실시간으로 계속 작동하고 있습니다.</p>
            </div>
          </div>
          <div className='sujo_data'>
            <video width="823px" height="768px" controls="controls">
              <source src="images/kkung3.mp4" type='video/mp4'></source>
            </video>
            <div id='sujo_text'>
              <h3 style={{ color: '#4D606B' }}>03_실시간 수조이미지</h3>
              <p style={{ color: '#515151' }}>연어 양식장 관리를 하고있는 곳 입니다.<br />24시간동안 작동하며 연어의 생태를 보다 더 자세하게<br />관찰하기 위해 관리하고 있습니다.<br />실시간으로 계속 작동하고 있습니다.</p>
            </div>
          </div>
        </div>

        <hr style={{ borderStyle: 'dotted' }} />

        <div className='graph'> {/*그래프 전체 묶음 */}
          <div className='graph_data'> {/*각 그래프별 묶음*/}
            <div className='graph_view' style={{ width: "823px", height: "768px" }}>
              <BarGraph data={barDataList} />
            </div>
            <div id='graph_text'>
              <h3 style={{ color: '#4D606B' }}>01_실시간 CCTV</h3>
              <p style={{ color: '#515151' }}>연어 양식장 관리를 하고있는 곳 입니다.<br />24시간동안 작동하며 연어의 생태를 보다 더 자세하게<br />관찰하기 위해 관리하고 있습니다.<br />실시간으로 계속 작동하고 있습니다.</p>
            </div>
          </div>
          <div className='graph_data'>
            <div className='graph_view' style={{ height: '823px', width: '768px' }}>
              <LineGraph data={lineDataList} />
            </div>

            <div id='graph_text'>
              <h3 style={{ color: '#4D606B' }}>02_실시간 수조영상</h3>
              <p style={{ color: '#515151' }}>연어 양식장 관리를 하고있는 곳 입니다.<br />24시간동안 작동하며 연어의 생태를 보다 더 자세하게<br />관찰하기 위해 관리하고 있습니다.<br />실시간으로 계속 작동하고 있습니다.</p>
            </div>
          </div>
          <div className='graph_data'>
            <div className='graph_view' style={{ height: '823px', width: '768px' }}>
              <PieGraph data={pieDataList} />
            </div>
            <div id='graph_text'>
              <h3 style={{ color: '#4D606B' }}>03_실시간 수조이미지</h3>
              <p style={{ color: '#515151' }}>연어 양식장 관리를 하고있는 곳 입니다.<br />24시간동안 작동하며 연어의 생태를 보다 더 자세하게<br />관찰하기 위해 관리하고 있습니다.<br />실시간으로 계속 작동하고 있습니다.</p>
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