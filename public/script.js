document.addEventListener('DOMContentLoaded', function () {
    const chapterCards = document.querySelectorAll('.chapter-card');
    const lectureCards = document.querySelectorAll('.lecture-card');

    // Chapter card click functionality
    chapterCards.forEach(card => {
        card.addEventListener('click', function () {
            const chapterNumber = this.getAttribute('data-chapter');
            window.location.href = `chapter${chapterNumber}.html`;
        });
    });

    // Lecture card click functionality
    lectureCards.forEach(card => {
        card.addEventListener('click', function () {
            const videoId = this.getAttribute('data-video');

            // Remove active class from all lecture cards
            lectureCards.forEach(c => c.classList.remove('active'));

            // Add active class to clicked card
            this.classList.add('active');

            // Load video
            loadVideo(videoId);

            // Mark as completed
            markAsCompleted(videoId);

            // Update status indicator
            const statusIndicator = this.querySelector('.status-indicator');
            if (statusIndicator) {
                statusIndicator.classList.add('completed');
            }

            // Scroll to video player
            document.querySelector('.video-container').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Check if we're on a chapter page
    const isChapterPage = window.location.pathname.includes('chapter');

    if (isChapterPage) {
        initializeChapterPage();
    }

    // Load progress for lecture cards
    loadProgress();
});

function loadProgress() {
    const lectureCards = document.querySelectorAll('.lecture-card');
    const completedLectures = JSON.parse(localStorage.getItem('completedLectures') || '[]');

    lectureCards.forEach(card => {
        const videoId = card.getAttribute('data-video');
        if (completedLectures.includes(videoId)) {
            card.classList.add('completed');
            const statusIndicator = card.querySelector('.status-indicator');
            if (statusIndicator) {
                statusIndicator.classList.add('completed');
            }
        }
    });
}

function initializeChapterPage() {
    const chapters = document.querySelectorAll('.chapter');
    const lectures = document.querySelectorAll('.lecture');
    const videoPlaceholder = document.getElementById('video-placeholder');
    const videoPlayer = document.getElementById('video-player');
    const youtubeIframe = document.getElementById('youtube-iframe');

    let currentLecture = null;

    // Chapter toggle functionality
    chapters.forEach(chapter => {
        const chapterTitle = chapter.querySelector('h2');
        chapterTitle.addEventListener('click', function () {
            const isActive = chapter.classList.contains('active');

            // Close all chapters
            chapters.forEach(ch => ch.classList.remove('active'));

            // Open clicked chapter if it wasn't active
            if (!isActive) {
                chapter.classList.add('active');
            }
        });
    });

    // Lecture click functionality
    lectures.forEach(lecture => {
        lecture.addEventListener('click', function () {
            const videoId = this.getAttribute('data-video');

            // Remove active class from all lectures
            lectures.forEach(l => l.classList.remove('active'));

            // Add active class to clicked lecture
            this.classList.add('active');

            // Load video
            loadVideo(videoId);

            // Scroll to video player
            document.querySelector('.video-container').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Load video function
    function loadVideo(videoId) {
        if (!videoId) return;

        // Hide placeholder and show video player
        videoPlaceholder.style.display = 'none';
        videoPlayer.style.display = 'block';

        // Set iframe source with custom parameters to disable YouTube branding
        const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&controls=1&disablekb=1&fs=1&iv_load_policy=3&cc_load_policy=0&autoplay=1`;
        youtubeIframe.src = embedUrl;

        currentLecture = videoId;
    }

    // Prevent right-click on video player
    videoPlayer.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        return false;
    });

    // Prevent keyboard shortcuts on video player
    videoPlayer.addEventListener('keydown', function (e) {
        // Prevent common keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            return false;
        }
    });

    // Add overlay to prevent direct interaction with YouTube player
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        z-index: 10;
        pointer-events: none;
    `;
    videoPlayer.appendChild(overlay);

    // Auto-expand first chapter on load
    if (chapters.length > 0) {
        chapters[0].classList.add('active');
    }

    // Add progress tracking
    let completedLectures = JSON.parse(localStorage.getItem('completedLectures') || '[]');

    lectures.forEach(lecture => {
        const videoId = lecture.getAttribute('data-video');
        if (completedLectures.includes(videoId)) {
            lecture.style.borderLeftColor = '#28a745';
            lecture.style.background = '#d4edda';
        }
    });

    // Mark lecture as completed when video is loaded
    function markAsCompleted(videoId) {
        if (!completedLectures.includes(videoId)) {
            completedLectures.push(videoId);
            localStorage.setItem('completedLectures', JSON.stringify(completedLectures));

            // Update visual indicator
            const lectureElement = document.querySelector(`[data-video="${videoId}"]`);
            if (lectureElement) {
                lectureElement.style.borderLeftColor = '#28a745';
                lectureElement.style.background = '#d4edda';
            }
        }
    }

    // Enhanced video loading with completion tracking
    const originalLoadVideo = loadVideo;
    loadVideo = function (videoId) {
        originalLoadVideo(videoId);
        markAsCompleted(videoId);
    };

    // Add keyboard navigation
    document.addEventListener('keydown', function (e) {
        const activeLecture = document.querySelector('.lecture.active');
        if (!activeLecture) return;

        const currentIndex = Array.from(lectures).indexOf(activeLecture);

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (currentIndex < lectures.length - 1) {
                    lectures[currentIndex + 1].click();
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (currentIndex > 0) {
                    lectures[currentIndex - 1].click();
                }
                break;
            case ' ':
                e.preventDefault();
                // Toggle play/pause (this would require YouTube API)
                break;
        }
    });

    // Add search functionality
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search lectures...';
    searchInput.style.cssText = `
        width: 100%;
        padding: 12px 15px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 16px;
        margin-bottom: 20px;
        outline: none;
        transition: border-color 0.3s ease;
    `;

    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();

        lectures.forEach(lecture => {
            const title = lecture.querySelector('.lecture-title').textContent.toLowerCase();
            const number = lecture.querySelector('.lecture-number').textContent.toLowerCase();
            const isMatch = title.includes(searchTerm) || number.includes(searchTerm);

            lecture.style.display = isMatch ? 'flex' : 'none';
        });
    });

    searchInput.addEventListener('focus', function () {
        this.style.borderColor = '#667eea';
    });

    searchInput.addEventListener('blur', function () {
        this.style.borderColor = '#e0e0e0';
    });

    // Insert search input before chapters
    const contentDiv = document.querySelector('.content');
    contentDiv.insertBefore(searchInput, contentDiv.firstChild);
}

// Global functions
function loadVideo(videoId) {
    if (!videoId) return;

    const videoPlaceholder = document.getElementById('video-placeholder');
    const videoPlayer = document.getElementById('video-player');
    const youtubeIframe = document.getElementById('youtube-iframe');

    if (videoPlaceholder && videoPlayer && youtubeIframe) {
        // Hide placeholder and show video player
        videoPlaceholder.style.display = 'none';
        videoPlayer.style.display = 'block';

        // Set iframe source with custom parameters to disable YouTube branding
        const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&controls=1&disablekb=1&fs=1&iv_load_policy=3&cc_load_policy=0&autoplay=1`;
        youtubeIframe.src = embedUrl;
    }
}

function markAsCompleted(videoId) {
    let completedLectures = JSON.parse(localStorage.getItem('completedLectures') || '[]');

    if (!completedLectures.includes(videoId)) {
        completedLectures.push(videoId);
        localStorage.setItem('completedLectures', JSON.stringify(completedLectures));
    }
} 