// 폐차종류 페이지 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 카테고리 카드 클릭 이벤트
    const categoryCards = document.querySelectorAll('.category-card');
    const detailSections = document.querySelectorAll('.detail-section');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const targetSection = document.getElementById(category + '-detail');
            
            if (targetSection) {
                // 모든 상세 섹션 숨기기
                detailSections.forEach(section => {
                    section.style.display = 'none';
                });
                
                // 선택한 섹션만 보이기
                targetSection.style.display = 'block';
                
                // 부드럽게 스크롤
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 활성 카드 표시
                categoryCards.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // 스크롤 애니메이션
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
    const animatedElements = document.querySelectorAll('.category-card, .detail-section, .notice-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // 테이블 행 호버 효과
    const tableRows = document.querySelectorAll('.comparison-table tbody tr');
    if (tableRows.length > 0) {
        tableRows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f5f5f5';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
        });
    }
    
    // 난이도 색상 변경 효과
    const difficulties = document.querySelectorAll('.difficulty');
    difficulties.forEach(diff => {
        diff.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        diff.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // 카드 클릭 시 시각적 피드백
    categoryCards.forEach(card => {
        card.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = '';
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
    
    // 페이지 로드 시 첫 번째 카테고리 활성화
    if (categoryCards.length > 0) {
        // 첫 번째 상세 섹션만 보이기
        detailSections.forEach((section, index) => {
            section.style.display = index === 0 ? 'block' : 'none';
        });
        
        // 첫 번째 카드 활성화
        categoryCards[0].classList.add('active');
    }
    
    console.log('폐차종류 페이지가 로드되었습니다.');
});