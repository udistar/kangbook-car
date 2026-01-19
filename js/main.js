// 모바일 메뉴 토글
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 메뉴 클릭 시 닫기
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 스무스 스크롤링
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 폼 제출 처리 - 개선된 버전
const quoteForm = document.getElementById('quoteForm');
quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(quoteForm);
    const data = Object.fromEntries(formData);
    
    // 버튼 및 상태 요소 가져오기
    const submitBtn = quoteForm.querySelector('button[type="submit"]');
    const statusDiv = document.createElement('div');
    statusDiv.className = 'form-status';
    
    // 기존 상태 메시지 제거
    const existingStatus = quoteForm.querySelector('.form-status');
    if (existingStatus) {
        existingStatus.remove();
    }
    
    // 폼에 상태 메시지 추가
    quoteForm.appendChild(statusDiv);
    
    // 로딩 상태 표시
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 처리 중...';
    submitBtn.disabled = true;
    
    try {
        // 유효성 검사
        if (!data.name || !data.phone || !data.carModel || !data.carNumber || !data.mileage) {
            throw new Error('필수 항목을 모두 입력해주세요.');
        }
        
        // 전화번호 형식 검사
        const phoneRegex = /^[0-9]{2,3}-?[0-9]{3,4}-?[0-9]{4}$/;
        if (!phoneRegex.test(data.phone)) {
            throw new Error('올바른 전화번호를 입력해주세요.');
        }
        
        // 시뮬레이션을 위한 지연
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // 성공 메시지 표시
        statusDiv.textContent = '견적 신청이 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.';
        statusDiv.className = 'form-status success show';
        quoteForm.reset();
        
        // 5초 후 상태 메시지 숨김
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 5000);
        
    } catch (error) {
        // 오류 메시지 표시
        statusDiv.textContent = error.message;
        statusDiv.className = 'form-status error show';
        
        // 5초 후 상태 메시지 숨김
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 5000);
        
    } finally {
        // 버튼 상태 복원
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// 스크롤에 따른 헤더 스타일 변경 - 다크모드 버전
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
        header.style.backdropFilter = 'none';
    }
});

// 애니메이션 효과 - 개선된 버전
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
    });
}, observerOptions);

// 관찰할 요소들
const animatedElements = document.querySelectorAll('.service-card, .about-stats, .process-step');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
});

// 전화번호 자동 하이픈 추가
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/[^0-9]/g, '');
    let result = '';
    
    if (value.length < 4) {
        result = value;
    } else if (value.length < 7) {
        result = value.slice(0, 3) + '-' + value.slice(3);
    } else {
        result = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
    }
    
    e.target.value = result;
});

// 차량번호 자동 형식화
document.getElementById('carNumber').addEventListener('input', function(e) {
    let value = e.target.value.toUpperCase().replace(/[^0-9가-힣]/g, '');
    e.target.value = value;
});

// 주행거리 숫자만 입력
document.getElementById('mileage').addEventListener('input', function(e) {
    let value = e.target.value.replace(/[^0-9]/g, '');
    e.target.value = value;
});

// 지도 탭 전환 함수
function switchMap(mapType) {
    // 모든 탭과 지도 비활성화
    const tabs = document.querySelectorAll('.map-tab');
    const maps = document.querySelectorAll('.map');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    maps.forEach(map => map.classList.remove('active'));
    
    // 선택된 탭과 지도 활성화
    if (mapType === 'naver') {
        document.querySelector('.map-tab:nth-child(1)').classList.add('active');
        document.getElementById('naver-map').classList.add('active');
    } else if (mapType === 'kakao') {
        document.querySelector('.map-tab:nth-child(2)').classList.add('active');
        document.getElementById('kakao-map').classList.add('active');
    }
}

// 플로팅 채팅 토글
function toggleChat() {
    const chatMenu = document.querySelector('.chat-menu');
    chatMenu.classList.toggle('active');
}

// 채팅 메뉴 외부 클릭 시 닫기
document.addEventListener('click', function(e) {
    const floatingChat = document.querySelector('.floating-chat');
    const chatMenu = document.querySelector('.chat-menu');
    
    if (!floatingChat.contains(e.target)) {
        chatMenu.classList.remove('active');
    }
});



// 페이지 로드 완료 시 로딩 화면 제거
document.addEventListener('DOMContentLoaded', () => {
    console.log('강북 페차장 홈페이지가 로드되었습니다.');
    
    // 폼 입력 필드에 포커스 시视覚적 피드백
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});