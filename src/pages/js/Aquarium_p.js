import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar.js';
import "../css/Aquarium_p.css";
import LineGraph from '../jsx/LineGraph.jsx'

export default function Aquarium_p() {

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
              <LineGraph data={lineDataList} />
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