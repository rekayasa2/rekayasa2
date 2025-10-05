// Data jadwal untuk XI RPL 2
const scheduleData = {
    senin: [
        { time: "07:00 - 07:45", subject: "Upacara", teacher: "", icon: "" },
        { time: "07:45 - 09:15", subject: "Bimbingan Konseling", teacher: "Bu Iin Kusuma", icon: "" },
        { time: "09:15 - 10:00", subject: "Bahasa Jawa", teacher: "Bu Shiva", icon: "" },
        { time: "10:00 - 10:15", subject: "Istirahat", teacher: "", icon: "" },
        { time: "10:15 - 11:00", subject: "Bahasa Jawa", teacher: "Bu Shiva", icon: "" },
        { time: "11:00 - 11:45", subject: "PKK", teacher: "Miss Reni", icon: "" },
        { time: "11:45 - 12:15", subject: "Istirahat", teacher: "", icon: "" },
        { time: "12:15 - 15:15", subject: "PKK", teacher: "Miss Reni", icon: "" }
    ],
    selasa: [
        { time: "07:00 - 09:00", subject: "Bahasa Indonesia", teacher: "Bu Keke", icon: "" },
        { time: "09:00 - 09:40", subject: "DataBase", teacher: "Pak Wari", icon: "" },
        { time: "09:40 - 10:00", subject: "Istirahat", teacher: "", icon: "" },
        { time: "10:00 - 12:00", subject: "DataBase", teacher: "Pak Wari", icon: "" },
        { time: "12:00 - 12:30", subject: "Istirahat", teacher: "", icon: "" },
        { time: "13:30 - 15:10", subject: "Mapel Pilihan RPL", teacher: "Pak Ekta", icon: "" }
    ],
    rabu: [
        { time: "07:00 - 08:40", subject: "Bahasa Inggris", teacher: "Bu Susi", icon: "" },
        { time: "08:40 - 09:40", subject: "Sejarah", teacher: "Bu", icon: "" },
        { time: "09:40 - 10:00", subject: "Istirahat", teacher: "", icon: "" },
        { time: "10:00 - 11:20", subject: "Olahraga", teacher: "Pak Aris", icon: "" },
        { time: "11:20 - 12:00", subject: "Website", teacher: "Pak Azis", icon: "" },
        { time: "12:00 - 12:30", subject: "Istirahat", teacher: "", icon: "" },
        { time: "13:30 - 15:10", subject: "Website", teacher: "Pak Azis", icon: "" }
    ],
    kamis: [
        { time: "07:00 - 10:00", subject: "PBO", teacher: "Pak Reza", icon: "" },
        { time: "10:00 - 10:15", subject: "Istirahat", teacher: "", icon: "" },
        { time: "10:15 - 11:00", subject: "PBO", teacher: "Pak Reza", icon: "" },
        { time: "11:00 - 11:45", subject: "Matematika", teacher: "Bu Nanung", icon: "" },
        { time: "11:45 - 12:15", subject: "Istirahat", teacher: "", icon: "" },
        { time: "12:15 - 13:45", subject: "Matematika", teacher: "Bu Nanung", icon: "" },
        { time: "13:45 - 15:15", subject: "PKN", teacher: "Miss Reni", icon: "" }
    ],
    jumat: [
        { time: "07:00 - 10:00", subject: "PPL", teacher: "Pak Wari", icon: "" },
        { time: "10:00 - 10:15", subject: "Istirahat", teacher: "", icon: "" },
        { time: "10:15 - 11:45", subject: "Bahasa Inggris", teacher: "Bu Susi", icon: "" },
        { time: "11:45 - 13:00", subject: "Istirahat", teacher: "", icon: "" },
        { time: "13:00 - 15:15", subject: "Agama", teacher: "Bu Am", icon: "" }
    ]
};

// Fungsi untuk mengubah tema
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<span class="theme-icon">☀️</span> Mode Terang';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggle.innerHTML = '<span class="theme-icon">🌙</span> Mode Gelap';
        localStorage.setItem('theme', 'light');
    }
}

// Fungsi untuk navigasi antar bagian
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hapus kelas active dari semua link dan section
            navLinks.forEach(item => item.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Tambahkan kelas active ke link yang diklik
            this.classList.add('active');
            
            // Tampilkan section yang sesuai
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Scroll ke atas section
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Setup jadwal
function setupSchedule() {
    const dayButtons = document.querySelectorAll('.day-btn');
    const scheduleContent = document.querySelector('.schedule-content');
    
    // Render jadwal untuk hari Senin (default)
    renderSchedule('senin');
    
    dayButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Hapus active class dari semua button
            dayButtons.forEach(btn => btn.classList.remove('active'));
            // Tambah active class ke button yang diklik
            this.classList.add('active');
            
            const day = this.getAttribute('data-day');
            renderSchedule(day);
        });
    });
    
    function renderSchedule(day) {
        const daySchedule = scheduleData[day];
        let scheduleHTML = `<div class="day-schedule active" id="${day}">`;
        
        if (daySchedule) {
            daySchedule.forEach(item => {
                const highlightClass = item.highlight ? 'highlight' : '';
                scheduleHTML += `
                    <div class="schedule-card ${highlightClass}">
                        <div class="time">${item.time}</div>
                        <div class="subject">
                            <span class="subject-icon">${item.icon}</span>
                            ${item.subject}
                        </div>
                        <div class="teacher">${item.teacher}</div>
                    </div>
                `;
            });
        }
        
        scheduleHTML += '</div>';
        scheduleContent.innerHTML = scheduleHTML;
    }
}

// Setup filter album
function setupAlbumFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const albumCards = document.querySelectorAll('.album-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Hapus active class dari semua button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Tambah active class ke button yang diklik
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            albumCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Muat tema yang disimpan
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('theme-toggle');
    
    if (savedTheme === 'dark') {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<span class="theme-icon">☀️</span> Mode Terang';
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        themeToggle.innerHTML = '<span class="theme-icon">🌙</span> Mode Gelap';
    }
}

// Setup smooth scroll
function setupSmoothScroll() {
    const exploreBtn = document.querySelector('.explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            document.querySelector('#piket').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Setup toggle tema
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Setup navigasi
    setupNavigation();
    
    // Setup jadwal
    setupSchedule();
    
    // Setup filter album
    setupAlbumFilter();
    
    // Setup smooth scroll
    setupSmoothScroll();
    
    // Muat tema yang disimpan
    loadSavedTheme();
});