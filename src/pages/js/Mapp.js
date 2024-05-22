import React from 'react';
import "../css/Map.css";
import NavBar from './NavBar.js';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export default function Mapp() {

    return (
        <div className='table-container'>  {/* 반응형 웹 구현때문에 설정해뒀던 클래스명임 */}
            <table>
                <NavBar /> {/*메인 페이지랑 텍스트 색이 달라서 각 페이지에 따로 추가*/}
                <div className='mapPage'>
                    <div className="map"> {/*지도 관련 코드 */}
                        <h1 style={{ color: '#4D606B' }}>오시는 길</h1>
                        <hr />
                        <div className='kakao_map'>
                            <Map // 지도를 표시할 Container
                                center={{
                                    // 지도의 중심좌표
                                    lat: 37.7373221158143,
                                    lng: 128.873681611316,
                                }}
                                style={{
                                    // 지도의 크기
                                    width: "969px",
                                    height: "467px",
                                }}
                                level={4} // 지도의 확대 레벨 
                            />
                        </div>

                    </div>

                    <div className="map_info"> {/*주소 및 회사 연락처 */}
                        <hr style={{ borderStyle: 'dotted', padding: '0px 250px' }} />
                        <ul id="map_info_text">
                            <li style={{ fontSize: '20px', paddingRight: '140px' }}><h3>주소</h3><br />강원특별자치도 강릉시 범일로 579번길 24</li>
                            <li style={{ fontSize: '20px', paddingRight: '140px' }}><h3>TEL</h3><br />033-649-7114</li>
                            <li style={{ fontSize: '20px' }}><h3>FAX</h3><br />0000-000-1234</li>
                        </ul>
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
