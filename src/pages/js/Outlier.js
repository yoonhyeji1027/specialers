import React, { useState } from 'react';
import NavBar from './NavBar.js';
import ScatterPlotGraph from '../jsx/ScatterPlotGraph.jsx';
import "../css/Outlier.css";

export default function Outlier() {
  const [selectedOption, setSelectedOption] = useState('분류');
  const [data, setData] = useState([]);
  const [displayOption, setDisplayOption] = useState(null);

  const initialData = [
    { x: 1, y: 1, category: 'mea_dt' },
    { x: 2, y: 4, category: 'farm_id' },
    { x: 3, y: 9, category: 'tank_id' },
    { x: 4, y: 16, category: 'do' },
    { x: 5, y: 25, category: 'temperature' },
    { x: 6, y: 36, category: 'ph' },
    { x: 7, y: 49, category: 'salinity' },
    { x: 8, y: 64, category: 'state' },
  ];

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePlotData = () => {
    if (selectedOption !== '분류') {
      setDisplayOption(selectedOption);
      const filteredData = initialData.filter(item => item.category === selectedOption);
      setData([{ id: `category-${selectedOption}`, data: filteredData }]);
    } else {
      setDisplayOption(null);
      // do, ph, temperature, salinity의 그래프 데이터만 보여줌
      const relevantData = initialData.filter(item => ['do', 'ph', 'temperature', 'salinity'].includes(item.category));
      const formattedData = relevantData.map(item => ({ id: `category-${item.category}`, data: [item] }));
      setData(formattedData);
    }
  };

  const renderResultMessage = () => {
    switch (displayOption) {
      case 'mea_dt':
        return (
          <div>
            <h3>mea_dt에 대한 결과</h3>
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
      case 'farm_id':
        return (
          <div>
            <h3>farm_id에 대한 결과</h3>
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
      case 'tank_id':
        return (
          <div>
            <h3>tank_id에 대한 결과</h3>
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
      case 'do':
        return (
          <div>
            <h3>do에 대한 결과</h3>
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
      case 'temperature':
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
      case 'ph':
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
      case 'salinity':
        return (
          <div>
            <h3>salinity에 대한 결과</h3>
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
      case 'state':
        return (
          <div>
            <h3>state에 대한 결과</h3>
            {data[0]?.data[0
              ?.y >= 3 ? (
              <p>현재 이상치가 탐지되지 않았습니다.</p>
            ) : (
              <p>
                현재 DO 데이터의 이상치가 탐지 되었습니다.<br />
                평균 15.9 값을 지니지만 현재 5.5 값을 지니고 있습니다.<br />
                데이터 조치를 권장합니다.
              </p>
            )]}
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
              <option value='mea_dt'>mea_dt</option>
              <option value='farm_id'>farm_id</option>
              <option value='tank_id'>tank_id</option>
              <option value='do'>do</option>
              <option value='temperature'>temperature</option>
              <option value='ph'>ph</option>
              <option value='salinity'>salinity</option>
              <option value='state'>state</option>
            </select>
            <button onClick={handlePlotData}>조회</button>
          </h3>
        </div>
        <div className='o_graph_board'>
          {renderResultMessage()}
          <div className='o_graph_view' style={{ width: '800px', height: '500px' }}>
            <ScatterPlotGraph data={data} />
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
    </div>
  );
}
