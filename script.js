// Data untuk aplikasi
const appData = {
    projects: [
        {
            title: "E-Commerce Platform",
            description: "Platform jual beli online dengan sistem cart, payment gateway, dan admin dashboard",
            tech: ["React", "Node.js", "MongoDB"],
            type: "web",
            demo: "#",
            code: "#"
        },
        {
            title: "Finance Tracker",
            description: "Aplikasi mobile untuk mengelola keuangan pribadi dengan analisis pengeluaran",
            tech: ["Flutter", "Firebase", "Dart"],
            type: "mobile",
            demo: "#",
            code: "#"
        },
        {
            title: "Smart Chatbot",
            description: "Asisten virtual AI untuk customer service dengan natural language processing",
            tech: ["Python", "TensorFlow", "NLP"],
            type: "ai",
            demo: "#",
            code: "#"
        },
        {
            title: "2D Platformer",
            description: "Game petualangan 2D dengan mechanics yang menarik dan visual yang colorful",
            tech: ["Unity", "C#", "Photoshop"],
            type: "game",
            demo: "#",
            code: "#"
        }
    ],
    
    materi: {
        pemrograman: [
            {
                title: "📚 Algoritma Dasar",
                items: ["Flowchart & Pseudocode", "Struktur Data Array", "Sorting & Searching", "Complexity Analysis"]
            },
            {
                title: "🐍 Python Programming",
                items: ["Syntax Dasar Python", "OOP Concepts", "File Handling", "Error Handling"]
            },
            {
                title: "☕ Java Fundamentals",
                items: ["Java Syntax", "Class & Objects", "Inheritance", "Polymorphism"]
            }
        ],
        web: [
            {
                title: "🌐 HTML & CSS",
                items: ["Semantic HTML", "CSS Grid & Flexbox", "Responsive Design", "CSS Animations"]
            },
            {
                title: "⚡ JavaScript",
                items: ["ES6+ Features", "DOM Manipulation", "Async Programming", "API Integration"]
            },
            {
                title: "🚀 React Framework",
                items: ["Components & Props", "State Management", "Hooks", "Routing"]
            }
        ],
        mobile: [
            {
                title: "📱 Android Development",
                items: ["Kotlin Basics", "Android Studio", "UI Components", "Data Storage"]
            },
            {
                title: "🍎 iOS Development",
                items: ["Swift Basics", "Xcode", "UIKit", "Core Data"]
            },
            {
                title: "📲 Cross-Platform",
                items: ["React Native", "Flutter", "Ionic", "Xamarin"]
            }
        ],
        database: [
            {
                title: "🗄️ SQL Fundamentals",
                items: ["Database Design", "SQL Queries", "Joins & Relationships", "Normalization"]
            },
            {
                title: "🔥 NoSQL Databases",
                items: ["MongoDB Basics", "Document Structure", "Aggregation", "Indexing"]
            },
            {
                title: "⚡ ORM & ODMs",
                items: ["Sequelize", "Mongoose", "Prisma", "Database Migrations"]
            }
        ]
    }
};

// Fungsi untuk toggle tema
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    
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

// Fungsi untuk navigasi
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class dari semua link dan section
            navLinks.forEach(item => item.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class ke clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Fungsi untuk setup projects
function setupProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (projectsGrid) {
        let projectsHTML = '';
        
        appData.projects.forEach(project => {
            projectsHTML += `
                <div class="project-card">
                    <div class="project-header">
                        <div class="project-icon">${getProjectIcon(project.type)}</div>
                        <div class="project-badge">${getProjectType(project.type)}</div>
                    </div>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-stack-small">
                        ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <button class="demo-btn" onclick="showProjectDemo('${project.title}')">Live Demo</button>
                        <button class="code-btn" onclick="showSourceCode('${project.title}')">Source Code</button>
                    </div>
                </div>
            `;
        });
        
        projectsGrid.innerHTML = projectsHTML;
    }
}

// Helper functions untuk projects
function getProjectIcon(type) {
    const icons = {
        web: '🌐',
        mobile: '📱',
        ai: '🤖',
        game: '🎮'
    };
    return icons[type] || '💻';
}

function getProjectType(type) {
    const types = {
        web: 'Web App',
        mobile: 'Mobile',
        ai: 'AI',
        game: 'Game'
    };
    return types[type] || 'Project';
}

// Fungsi untuk setup materi tabs
function setupMateriTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Load initial tab content
    loadTabContent('pemrograman');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class dari semua buttons dan panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class ke clicked button dan corresponding pane
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Load tab content
            loadTabContent(tabId);
        });
    });
}

// Fungsi untuk load tab content
function loadTabContent(tabId) {
    const tabPane = document.getElementById(tabId);
    
    if (tabPane && appData.materi[tabId]) {
        let contentHTML = '<div class="materi-grid">';
        
        appData.materi[tabId].forEach(materi => {
            contentHTML += `
                <div class="materi-card">
                    <h4>${materi.title}</h4>
                    <ul>
                        ${materi.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        });
        
        contentHTML += '</div>';
        tabPane.innerHTML = contentHTML;
    }
}

// Fungsi untuk setup album filter
function setupAlbumFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const albumCards = document.querySelectorAll('.album-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class dari semua buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class ke clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter album cards
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

// Fungsi untuk setup clickable album cards
function setupClickableAlbum() {
    const albumCards = document.querySelectorAll('.album-card');
    
    albumCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            const date = this.querySelector('.album-date').textContent;
            const category = this.getAttribute('data-category');
            
            showAlbumDetail(title, description, date, category);
        });
    });
}

// Fungsi untuk show album detail
function showAlbumDetail(title, description, date, category) {
    alert(`📸 ${title}\n\n${description}\n\n📅 ${date}\n🏷️ ${category}\n\n(Fitur detail album dalam pengembangan)`);
}

// Fungsi untuk show project demo
function showProjectDemo(projectName) {
    alert(`🚀 Live Demo: ${projectName}\n\n(Demo akan dibuka di tab baru)`);
}

// Fungsi untuk show source code
function showSourceCode(projectName) {
    alert(`📁 Source Code: ${projectName}\n\n(Repository akan dibuka di GitHub)`);
}

// Fungsi untuk setup explore button
function setupExploreButton() {
    const exploreBtn = document.querySelector('.explore-btn');
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            document.querySelector('#projek').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
}

// Fungsi untuk load saved theme
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

// Initialize aplikasi
document.addEventListener('DOMContentLoaded', function() {
    // Setup theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
    
    // Setup navigation
    setupNavigation();
    
    // Setup projects
    setupProjects();
    
    // Setup materi tabs
    setupMateriTabs();
    
    // Setup album filter
    setupAlbumFilter();
    
    // Setup clickable album
    setupClickableAlbum();
    
    // Setup explore button
    setupExploreButton();
    
    // Load saved theme
    loadSavedTheme();
    
    console.log('🎉 Website XI RPL 2 loaded successfully!');
});
// Fungsi untuk animasi progress bars
function animateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    progressFills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0%';
        
        setTimeout(() => {
            fill.style.width = width;
        }, 500);
    });
}

// Panggil dalam DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... kode lainnya ...
    
    // Animate progress bars when materi section becomes active
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
            }
        });
    });
    
    const materiSection = document.getElementById('materi');
    if (materiSection) {
        observer.observe(materiSection);
    }
});