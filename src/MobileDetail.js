import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MobileDetail.css';

// 프로젝트 데이터
const projects = [
  {
    id: 1,
    title: 'Project Alpha',
    year: '2024',
    category: 'branding',
    thumbnail: 'https://picsum.photos/400/300?random=1',
    subImages: [
      'https://picsum.photos/400/300?random=2',
      'https://picsum.photos/400/300?random=3'
    ],
    description: 'A comprehensive branding project for a tech startup.'
  },
  {
    id: 2,
    title: 'Project Beta',
    year: '2023',
    category: 'space',
    thumbnail: 'https://picsum.photos/400/300?random=4',
    subImages: [
      'https://picsum.photos/400/300?random=5'
    ],
    description: 'Interior design for a modern office space.'
  },
  {
    id: 3,
    title: 'Project Gamma',
    year: '2024',
    category: 'digital',
    thumbnail: 'https://picsum.photos/400/300?random=6',
    subImages: [
      'https://picsum.photos/400/300?random=7',
      'https://picsum.photos/400/300?random=8',
      'https://picsum.photos/400/300?random=9'
    ],
    description: 'Digital campaign for a fashion brand.'
  },
  {
    id: 4,
    title: 'Project Delta',
    year: '2023',
    category: 'branding',
    thumbnail: 'https://picsum.photos/400/300?random=10',
    subImages: [],
    description: 'Brand identity for a coffee shop chain.'
  },
  {
    id: 5,
    title: 'Project Epsilon',
    year: '2024',
    category: 'space',
    thumbnail: 'https://picsum.photos/400/300?random=11',
    subImages: [
      'https://picsum.photos/400/300?random=12'
    ],
    description: 'Restaurant interior design project.'
  },
  {
    id: 6,
    title: 'Project Zeta',
    year: '2023',
    category: 'digital',
    thumbnail: 'https://picsum.photos/400/300?random=13',
    subImages: [
      'https://picsum.photos/400/300?random=14',
      'https://picsum.photos/400/300?random=15'
    ],
    description: 'E-commerce website design and development.'
  }
];

function MobileDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  
  // 🔥 [수정] 슬라이더용 터치 state가 아니라, '엣지 스와이프'용 state만 사용
  const [edgeStart, setEdgeStart] = useState(null);

  const project = projects.find(p => p.id === parseInt(id));
  const isVideo = (url) => url && url.match(/\.(mp4|webm|ogg|mov)$/i);

  // 이미지 배열 합치기
  const allImages = [];
  if (project?.thumbnail) allImages.push(project.thumbnail);
  if (project?.subImages && Array.isArray(project.subImages)) {
    allImages.push(...project.subImages);
  }

  // 스크롤 감지 (인덱스 업데이트용 - 기존 로직 유지)
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const scrollLeft = slider.scrollLeft;
      const itemWidth = slider.offsetWidth;
      const newIndex = Math.round(scrollLeft / itemWidth);
      
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    };

    slider.addEventListener('scroll', handleScroll, { passive: true });
    return () => slider.removeEventListener('scroll', handleScroll);
  }, [currentIndex]);


  // 🔥 [핵심 로직] 투명 벽(Edge Zone)에서만 작동하는 터치 이벤트
  const handleEdgeTouchStart = (e) => {
    // 터치한 X좌표 기억
    setEdgeStart(e.touches[0].clientX);
  };

  const handleEdgeTouchEnd = (e) => {
    if (edgeStart === null) return;

    const edgeEnd = e.changedTouches[0].clientX;
    const distance = edgeEnd - edgeStart; // 끝점 - 시작점

    // 오른쪽으로 50px 이상 밀었으면 닫기
    // (조건: 왼쪽 끝에서 시작했으므로 currentIndex 상관없이 무조건 닫힘)
    if (distance > 50) {
      navigate('/'); // 메인으로 돌아가기
    }
    
    // 초기화
    setEdgeStart(null);
  };

  // 프로젝트 없음 예외처리
  if (!project) return null;

  return (
    <div className="mobile-detail-container mobile-detail-overlay">
      
      {/* 🔥 [추가] 여기가 투명 벽입니다! (슬라이더보다 위에 있음) */}
      <div 
        className="edge-swipe-zone"
        onTouchStart={handleEdgeTouchStart}
        onTouchEnd={handleEdgeTouchEnd}
      />

      <header className="mobile-detail-header">
        <div className="mobile-logo" onClick={() => navigate('/')}>
          ESSENT.STUDIO
        </div>
      </header>

      {/* 슬라이더 영역 (이제 여기에 터치 이벤트를 넣지 않습니다!) */}
      <div 
        ref={sliderRef}
        className="mobile-slider-wrapper"
      >
        <div className="mobile-slider-track">
          {allImages.length === 0 ? (
            <div className="mobile-slide">
              <div style={{ color: '#999' }}>No images</div>
            </div>
          ) : (
            allImages.map((media, idx) => (
              <div key={idx} className="mobile-slide">
                {isVideo(media) ? (
                  <video src={media} autoPlay muted loop playsInline />
                ) : (
                  <img src={media} alt={`Slide ${idx}`} draggable="false" />
                )}
              </div>
            ))
          )}
        </div>

        {/* 페이지네이션 닷 */}
        <div className="mobile-pagination">
          {allImages.map((_, idx) => (
            <div 
              key={idx}
              className={`mobile-dot ${idx === currentIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="mobile-info">
        <h2>{project.title}</h2>
        <p className="mobile-year">{project.year}</p>
        <p className="mobile-category">{project.category?.toUpperCase()}</p>
        <p className="mobile-description">{project.description}</p>
        
        {/* 메타 정보 (CSS에는 있는데 JS에는 없어서 추가해둠 - 필요시 사용) */}
        <div className="mobile-meta">
           {/* 필요한 정보 추가 가능 */}
        </div>
      </div>
    </div>
  );
}

export default MobileDetail;