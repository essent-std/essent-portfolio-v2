// src/SplashScreen.js
import React, { useEffect, useState } from 'react';
import './SplashScreen.css';
import logo from './logo.png'; // 🔥 로고 파일 경로 확인해주세요!

function SplashScreen({ onFinish }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 1. 2.2초 동안 로고 보여줌 (등장 + 대기 시간)
    const timer1 = setTimeout(() => {
      setIsExiting(true); // 퇴장 애니메이션 시작 클래스 추가
    }, 2200);

    // 2. 퇴장 애니메이션(0.8초)이 끝난 후 메인으로 전환 신호 보냄
    const timer2 = setTimeout(() => {
      onFinish(); 
    }, 3000); // 총 3초 뒤 종료

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div className={`splash-container ${isExiting ? 'fade-out' : ''}`}>
      <img src={logo} alt="Essent Studio" className="splash-logo" />
    </div>
  );
}

export default SplashScreen;