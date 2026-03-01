<<<<<<< HEAD
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
=======
import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

function SplashScreen({ onFinish, dataReady }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 500);
    const t3 = setTimeout(() => setPhase(3), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    if (!dataReady) return;
    const t1 = setTimeout(() => setPhase(4), 400);
    const t2 = setTimeout(() => onFinish(), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [dataReady, onFinish]);

  return (
    <div className={`splash-container ${phase === 4 ? 'fade-out' : ''}`}>
      <p className={`splash-top ${phase >= 1 ? 'show' : ''}`}>SEE, MAKE, SHARE,</p>
      <img src="/oddday-logo.png" alt="ODD DAY WORKS" className={`splash-logo ${phase >= 2 ? 'show' : ''}`} />
      <div className="splash-bottom-wrap">
        <p className={`splash-bottom ${phase >= 3 ? 'show' : ''}`}>WORKS / ZINES</p>
      </div>
>>>>>>> e9f6fce (update)
    </div>
  );
}

export default SplashScreen;