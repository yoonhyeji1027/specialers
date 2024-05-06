import React from 'react';
import "./SalmonPage.css";
import NavBar from './NavBar';

export default function SalmonPage() {
  return (
    <div className='table-container'> {/* 반응형 웹 구현때문에 설정해뒀던 클래스명임 */}
      <table>
        <NavBar /> {/*메인 페이지랑 텍스트 색이 달라서 각 페이지에 따로 추가*/}
        <h1 style={{ color: '#4D606B', marginTop: '100px' }}>수조영상</h1>

        <div className='sujo'> {/*수조 데이터 묶음 따로 그래프 묶음 따로 */}
          <div className='sujo_data'> {/*각 데이터별 묶음 */}
            <img src="images/imsi.png" width="823px" height="768px" alt="imsi"></img>
            <div id='sujo_text'>
              <h3 style={{ color: '#4D606B' }}>01_실시간 CCTV</h3>
              <p style={{ color: '#515151' }}>연어 양식장 관리를 하고있는 곳 입니다.<br />24시간동안 작동하며 연어의 생태를 보다 더 자세하게<br />관찰하기 위해 관리하고 있습니다.<br />실시간으로 계속 작동하고 있습니다.</p>
            </div>
          </div>
          <div className='sujo_data'>
            <img src="images/imsi.png" width="823px" height="768px" alt="imsi"></img>
            <div id='sujo_text'>
              <h3 style={{ color: '#4D606B' }}>02_실시간 수조영상</h3>
              <p style={{ color: '#515151' }}>연어 양식장 관리를 하고있는 곳 입니다.<br />24시간동안 작동하며 연어의 생태를 보다 더 자세하게<br />관찰하기 위해 관리하고 있습니다.<br />실시간으로 계속 작동하고 있습니다.</p>
            </div>
          </div>
          <div className='sujo_data'>
            <img src="images/imsi.png" width="823px" height="768px" alt="imsi"></img>
            <div id='sujo_text'>
              <h3 style={{ color: '#4D606B' }}>03_실시간 수조이미지</h3>
              <p style={{ color: '#515151' }}>연어 양식장 관리를 하고있는 곳 입니다.<br />24시간동안 작동하며 연어의 생태를 보다 더 자세하게<br />관찰하기 위해 관리하고 있습니다.<br />실시간으로 계속 작동하고 있습니다.</p>
            </div>
          </div>
        </div>

        <hr style={{ borderStyle: 'dotted' }} />

        <div className='graph'> {/*그래프 전체 묶음 */}
          <div className='graph_data'> {/*각 그래프별 묶음*/}
            <img src="images/graph.png" width="823px" height="768px" alt="graph"></img>
            <div id='graph_text'>
              <h3 style={{ color: '#4D606B' }}>01_실시간 CCTV</h3>
              <p style={{ color: '#515151' }}>연어 양식장 관리를 하고있는 곳 입니다.<br />24시간동안 작동하며 연어의 생태를 보다 더 자세하게<br />관찰하기 위해 관리하고 있습니다.<br />실시간으로 계속 작동하고 있습니다.</p>
            </div>
          </div>
          <div className='graph_data'>
            <img src="images/graph.png" width="823px" height="768px" alt="graph"></img>
            <div id='graph_text'>
              <h3 style={{ color: '#4D606B' }}>02_실시간 수조영상</h3>
              <p style={{ color: '#515151' }}>연어 양식장 관리를 하고있는 곳 입니다.<br />24시간동안 작동하며 연어의 생태를 보다 더 자세하게<br />관찰하기 위해 관리하고 있습니다.<br />실시간으로 계속 작동하고 있습니다.</p>
            </div>
          </div>
          <div className='graph_data'>
            <img src="images/graph.png" width="823px" height="768px" alt="graph"></img>
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
            <a href="Map.js" className="footer_link">오시는길</a>
          </nav>
          <address> {/* 링크가 필요 없는 주소 */}
            <p>(주) 스페셜러스</p>
            <p>주소: 강원특별자치도 양양군 손양면 학포길 226-61</p>
            <p>©2023 specialers Corporation ALL RIGHTS RESERVED</p>
          </address>
        </footer>
      </table>


    </div>
  );
}