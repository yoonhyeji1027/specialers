import React, { useState, useEffect } from 'react';
import "./MainPage.css";
import NavBar_main from './NavBar_main';


export default function MainPage() {
    // 메인 화면 사진 중에서 첫 번쨰로 출력되는(기본설정) 사진 지정
    const [currentImage, setCurrentImage] = useState('/images/Main1.png');

    // 버튼에 마우스 올렸을 때 사용할 함수 선언
    const [hoveredButton, setHoveredButton] = useState(null);

    // 사진 변경 버튼 기본 시작 값
    const [activeButton, setActiveButton] = useState('circle_001');

    // 시간(5초)에 따라 메인 사진이 넘어가도록 설정하는 알고리즘 코드
    useEffect(() => {
        const interval = setInterval(() => {
            switch (activeButton) {
                case 'circle_001':
                    setActiveButton('circle_002');
                    setCurrentImage('/images/Main2.png');
                    break;
                case 'circle_002':
                    setActiveButton('circle_003');
                    setCurrentImage('/images/Main3.png');
                    break;
                case 'circle_003':
                    setActiveButton('circle_001');
                    setCurrentImage('/images/Main1.png');
                    break;
                default:
                    break;
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [activeButton]);


    // 버튼에 마우스를 올렸을 때
    const handleButtonHover = (buttonName) => {
        setHoveredButton(buttonName);
    };

    return (
        <div className='table-container'> {/* 반응형 웹 구현때문에 설정해뒀던 클래스명임 */}
            <table>
                <NavBar_main /> {/*메인 페이지랑 텍스트 색이 달라서 메인 페이지 버전 따로 추가*/}
                <div className='specialers'> {/* 메인 사진 + 메인 사진 안에 포함된 텍스트랑 버튼들 묶음 */}
                    <img id="Main_image" src={currentImage} width="100%" height="950px" alt="Main" /> {/* src={currentImage}를 통해 초기값으로 저장되어있는 이미지 호출 */}
                    <h1 className='m_i_specialers' width="100px" style={{ fontSize: '65px' }}>SPECIALERS 스페셜러스</h1>
                    <p className="m_i_text">인공지능기반 스마트 양식장 관리</p>
                    <a href="SalmonPage.js" className="m_i_salmon">연어양식 보기→</a>
                    <div className="circle_buttons"> {/* 버튼 클릭 시 이미지 변경 코드 */}
                        <div
                            className={`circle_001 ${activeButton === 'circle_001' || hoveredButton === 'circle_01' ? 'show' : 'circle_01'}`}
                            onMouseOver={() => handleButtonHover('circle_01')}
                            onMouseOut={() => handleButtonHover(null)}
                            onClick={() => {
                                setActiveButton('circle_001');
                                setCurrentImage('/images/Main1.png');
                            }}
                        ></div>
                        <div
                            className={`circle_002 ${activeButton === 'circle_002' || hoveredButton === 'circle_02' ? 'show' : 'circle_02'}`}
                            onMouseOver={() => handleButtonHover('circle_02')}
                            onMouseOut={() => handleButtonHover(null)}
                            onClick={() => {
                                setActiveButton('circle_002');
                                setCurrentImage('/images/Main2.png');
                            }}
                        ></div>
                        <div
                            className={`circle_003 ${activeButton === 'circle_003' || hoveredButton === 'circle_03' ? 'show' : 'circle_03'}`}
                            onMouseOver={() => handleButtonHover('circle_03')}
                            onMouseOut={() => handleButtonHover(null)}
                            onClick={() => {
                                setActiveButton('circle_003');
                                setCurrentImage('/images/Main3.png');
                            }}
                        ></div>
                    </div>
                </div>

                <div className="a">
                    <p style={{ color: '#515151' }}>연어 양식을 위한 다양한 서비스</p>
                    <h2><span style={{ color: '#4D606B' }}>왜 대서양 연어 양식인가?</span></h2>
                    <div className="aa">
                        <p><span style={{ color: '#515151' }}>국내에서 최대 소비되고 있는 "대서양 연어"는 현재 100% 수입에 의존하고 있습니다.<br />2018년 생물다양성법 개정 이후 현재는 허가절차를 거치면<br />"상업용 대서양 연어 수정란 수입"이 가능해졌습니다.</span></p>
                        <p></p>
                        <p><span style={{ color: '#515151' }}>스페셜러스는 대서양 연어 수정란 수입 허가 업체이며<br />인공지능 관리 시스템으로 정확한 데이터를 기반하여 최상의 조건으로,<br />연어 수정란을 부화시켜 연어 치어를 유통할 수 있는 단계까지<br />"수입부터 유통까지의 과정"을 지원합니다.</span></p>
                    </div>
                </div>


                <div className="image1_container"> {/*하단에 3개짜리 이미지 묶음 */}
                    <div className="image_and_text"> {/*각 이미지 + 텍스트로 묶음 */}
                        <img id="image1_1" src="/images/main_1.png" alt="main_1" width="598px" height="479px" />
                        <div className="image_text"> {/*텍스트 묶음*/}
                            <h3 className="main1_image_text" style={{ fontSize: '35px' }}>회사소개</h3>
                            <p className="main1_image_text" style={{ fontSize: '19px', paddingTop:'25px' }}>대서양 연어 스마트 양식의 민간연구 개발을<br />선도적으로 수행하고 있습니다.<br /></p>
                            <a href="S_info.js" className="button_main" style={{ color:"#FFF", fontSize:'18px', paddingBottom:'-50px'}}>더보기</a>
                        </div>
                    </div>
                    <div className="image_and_text">
                        <img id="image1_2" src="/images/main_2.png" alt="main_2" width="598px" height="479px" />
                        <div className="image_text">
                            <h3 className="main1_image_text" style={{ fontSize: '35px' }}>제품소개</h3>
                            <p className="main1_image_text" style={{ fontSize: '19px', paddingTop:'25px'}}>스마트양식 인텔리전스 솔루션과<br />Ai FishFarm Management System을<br />제공합니다.</p>
                            <a href="J_info.js" className="button_main" style={{ color:"#FFF", fontSize:'18px' }}>더보기</a>
                        </div>
                    </div>
                    <div className="image_and_text">
                        <img id="image1_3" src="/images/main_3.png" alt="main_3" width="598px" height="479px" />
                        <div className="image_text">
                            <h3 className="main1_image_text" style={{ fontSize: '35px' }}>연어양식</h3>
                            <p className="main1_image_text" style={{ fontSize: '19px', paddingTop:'25px' }}>연어양식장의 모습을 제공합니다.<br /><br /></p>
                            <a href="SalmonPage.js" className="button_main" style={{ color:"#FFF", fontSize:'18px' }}>더보기</a>
                        </div>
                    </div>
                </div>



                <div className="a">
                    <h1 style={{ color: '#4D606B' }}>NEWS</h1>
                    <p style={{ color: '#515151' }}>연어의 이미지 및 영상을 제공합니다.</p>
                </div>
                <div className="image2">
                    <img src="/images/main_t_1.jpg" alt="imsi1" width="735px" height="390px" />
                    <img src="/images/main_t_2.jpg" alt="imsi2" width="735px" height="390px" />
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
