// FAQ 토글 기능
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        question.addEventListener('click', () => {
            // 현재 클릭한 항목 토글
            answer.classList.toggle('active');
            question.classList.toggle('active');
            
            // 아이콘 회전
            if (answer.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // 첫 번째 FAQ는 기본적으로 열어두기
    if (faqItems.length > 0) {
        const firstAnswer = faqItems[0].querySelector('.faq-answer');
        const firstQuestion = faqItems[0].querySelector('.faq-question');
        const firstIcon = faqItems[0].querySelector('.faq-question i');
        
        firstAnswer.classList.add('active');
        firstQuestion.classList.add('active');
        firstIcon.style.transform = 'rotate(180deg)';
    }
});

// 스크롤 애니메이션 추가
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 관찰할 요소들
    const animatedElements = document.querySelectorAll('.guide-card, .reason-card, .process-step-detailed, .price-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 스무스 스크롤링 (메인 페이지와 동일)
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

// 전화 연결 기능
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // 모바일에서만 전화 연결
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            e.preventDefault();
            alert('모바일에서만 전화 연결이 가능합니다.\n전화번호: 02-123-4567');
        }
    });
});

console.log('폐차 안내 페이지가 로드되었습니다.');