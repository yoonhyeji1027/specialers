import React from 'react';
import "./J_info.css";
import NavBar from './NavBar';


export default function J_info() {
    return (
        <div className='table-container'> {/* 반응형 웹 구현때문에 설정해뒀던 클래스명임 */}
            <table>
            <NavBar />  {/*메인 페이지랑 텍스트 색이 달라서 각 페이지에 따로 추가*/}
            <div className="j_info"> {/* 푸터 제외 페이지 전체 묶음 */}
                <h1 style={{ color: '#4D606B' }}>스마트양식 인텔리젼스 솔루션</h1>
                <p style={{ color: '#515151', paddingLeft:'100px', fontSize:'23px' }}>Smart FishFarm Intelligence Solution</p>
                <div id="j_info_text1"> {/* 상단 문구 묶음 */}
                    <h3 style={{ color: '#579DA8' , paddingLeft:'100px', paddingBottom:'50px'}}>인공지능 기반 실시간 데이터분석과 양식장 모니터링 연어 치어 생산 시스템</h3>
                    <ul id="num"> {/* 각 문구들 따로 묶은 거 */}
                        <li><h1 style={{ color: '#579DA8'}}>01</h1></li>
                        <li><h3 style={{ color: '#515151'}}> 방사능 오염 우려에서 벗어나 비교적 안전한 육지에서 양식</h3></li>
                    </ul>
                    <p style={{ color: '#515151' }}>    지속적으로 오염되고 있는 바다에서 벗어나 비교적 안전한 육지에서 양식, 전염병 및 오염수 중독 예방</p>
                    <hr style={{ borderStyle: 'dotted' }} />
                    <ul id='num'>
                        <li><h1 style={{ color: '#579DA8'}}>02</h1></li>
                        <li> <h3 style={{ color: '#515151' }}>양식장 CCTV 데이터를 활용한 어류 생장 예측 및 실시간 모니터링 관리</h3></li>
                    </ul>
                    <p style={{ color: '#515151' }}>    실시간 모니터링 서비스로 인공지능 모델을 활용하여 생장예측, 센서 데이터 수집, 어류 생장 정도에<br />따른 사료 공급량 및 환경 데이터 관리로 양식장 유지 비용 절감 및 출하시기 예측</p>
                    <hr style={{ borderStyle: 'dotted' }} />
                    <ul id='num'>
                        <li><h1 style={{ color: '#579DA8'}}>03</h1></li>
                        <li><h3 style={{ color: '#515151' }}>데이터 분석 기반 전문 컨설팅</h3></li>
                    </ul>
                    <p style={{ color: '#515151' }}>    K 연어 생장 데이터를 기반으로 생장예측 및 관리 모델을 개발하고 K 연어 양식장 맞춤형 솔루션 제공</p>
                    <hr style={{ borderStyle: 'dotted' }} />
                </div>

                <ul id="j_info_img1"> {/* 스마트양식 어쩌고 문구 밑 사진 리스트 */}
                    <li>
                        <img src="images/j_info_1.png" width="178px" height="135px" alt="image1" /><span>실시간 양식장<br />CCTV 모니터링</span>
                    </li>
                    <li>
                        <img src="images/j_info_2.png" width="178px" height="135px" alt="image2" /><span>어류 생장 예측</span>
                    </li>
                    <li>
                        <img src="images/j_info_3.png" width="178px" height="135px" alt="image3" /><span>어류 질병<br />판단 모델</span>
                    </li>
                    <li>
                        <img src="images/j_info_4.png" width="178px" height="135px" alt="image4" /><span>사료 공급량 관리</span>
                    </li>
                    <li>
                        <img src="images/j_info_5.png" width="178px" height="135px" alt="image5" /><span>센서이터 관리<br />(DO, PH, 수온 등)</span>
                    </li>
                </ul>
                <hr style={{ borderStyle: 'dotted', marginTop: '20px', paddingBottom:'80px'}} />
                <h2 style={{ color: '#4D606B' }}>AI FishFarm Management System</h2>
                <div id="j_info_text2">
                    <h3 style={{ color: '#515151', fontSize:'23px' }}>AI FishFarm Management System은<br />수년간에 걸쳐 국내 연어 양식데이터를 분석하고<br />학습한 AI 모델과 센서데이터 수상, 수중 카메라를  이용한<br />이미지 데이터, 먹이 공급량 관리 데이터 등<br />양식 산업에 필수적인 데이터를 이용하여<br />최적의 양식 환경을 조성하고 출하시기 예측 및 질병을 관리합니다.<br />또 K연어의 발안란 단계부터의 데이터를 관리하여<br />최적의 부화 환경과 치어까지의 생장 환경을 조성하고 관리하는데<br />최적화 되어있습니다.</h3>
                </div>
                <div id="j_info_img2">
                    <img src="images/j_info_ai_img.png" width="100%" height="600px" alt="image6" />
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