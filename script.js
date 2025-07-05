// View Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const terminalBtn = document.getElementById('terminalBtn');
    const modernBtn = document.getElementById('modernBtn');
    const terminalView = document.getElementById('terminalView');
    const modernView = document.getElementById('modernView');

    // Initialize with terminal view
    showTerminalView();

    // Terminal view button click
    terminalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showTerminalView();
    });

    // Modern view button click
    modernBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showModernView();
    });

    function showTerminalView() {
        terminalView.classList.add('active');
        modernView.classList.remove('active');
        terminalBtn.classList.add('active');
        modernBtn.classList.remove('active');
        
        // Initialize interactive terminal only once
        const terminalContent = document.querySelector('.terminal-content');
        if (!terminalContent.hasAttribute('data-interactive')) {
            // Clear any existing content first
            terminalContent.innerHTML = '';
            
            startInteractiveTerminal();
        }
    }

    function showModernView() {
        modernView.classList.add('active');
        terminalView.classList.remove('active');
        modernBtn.classList.add('active');
        terminalBtn.classList.remove('active');
        
        // Trigger animations for modern view
        animateModernView();
    }

    // Interactive Terminal
    function startInteractiveTerminal() {
        const terminalContent = document.querySelector('.terminal-content');
        const terminalInput = document.querySelector('.terminal-input');
        
        // Mark as interactive
        terminalContent.setAttribute('data-interactive', 'true');
        
        // Add welcome message
        addTerminalOutput('Yusuf Doğan\'ın kişisel terminal\'ine hoş geldiniz!');
        addTerminalOutput('Komutları görmek için "help" yazın.');
        addTerminalOutput('');
        
        // Focus on input
        terminalInput.focus();
        
        // Handle input
        terminalInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const command = this.value.trim();
                if (command) {
                    processCommand(command);
                    this.value = '';
                }
            }
        });
        
        // Keep focus on terminal
        terminalContent.addEventListener('click', function() {
            terminalInput.focus();
        });
    }
    
    function addTerminalOutput(text, isCommand = false) {
        const terminalContent = document.querySelector('.terminal-content');
        
        if (isCommand) {
            const commandLine = document.createElement('div');
            commandLine.className = 'terminal-line';
            commandLine.innerHTML = `<span class="prompt">yusufdgn@portfolio:~$</span> <span class="command">${text}</span>`;
            terminalContent.appendChild(commandLine);
        } else {
            const outputLine = document.createElement('div');
            outputLine.className = 'terminal-output';
            outputLine.innerHTML = `<p>${text}</p>`;
            terminalContent.appendChild(outputLine);
        }
        
        // Scroll to bottom
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }
    
    function processCommand(command) {
        addTerminalOutput(command, true);
        
        const cmd = command.toLowerCase();
        
        switch(cmd) {
            case 'help':
                addTerminalOutput('Mevcut komutlar:');
                addTerminalOutput('  help      - Bu yardım menüsünü gösterir');
                addTerminalOutput('  whoami    - Benim hakkımda bilgi');
                addTerminalOutput('  about     - Detaylı bilgi');
                addTerminalOutput('  contact   - İletişim bilgileri');
                addTerminalOutput('  social    - Sosyal medya hesapları');
                addTerminalOutput('  clear     - Terminali temizler');
                addTerminalOutput('  date      - Tarih ve saat');
                addTerminalOutput('  pwd       - Mevcut dizin');
                addTerminalOutput('  ls        - Dosya listesi');
                break;
                
            case 'whoami':
                addTerminalOutput('Yusuf Doğan');
                addTerminalOutput('Software Engineer - Fintech');
                break;
                
            case 'about':
                addTerminalOutput('Merhaba! Ben Yusuf Doğan, tutkulu bir Software Engineer\'ım.');
                addTerminalOutput('Şu anda fintech alanında çalışıyor, ödeme sistemleri ve abonelik yönetimi ile uğraşıyorum.');
                addTerminalOutput('Daha önce e-ticaret alanında backend developer olarak deneyim kazandım.');
                addTerminalOutput('Modern yazılım geliştirme teknolojileri ile ölçeklenebilir çözümler yaratmayı seviyorum.');
                addTerminalOutput('Backend sistemlerden frontend uygulamalarına kadar performanslı ve güvenilir yazılımlar geliştiriyorum.');
                break;
                
            case 'contact':
                addTerminalOutput('İletişim Bilgileri:');
                addTerminalOutput('  LinkedIn: tr.linkedin.com/in/yusufdgn');
                addTerminalOutput('  GitHub: github.com/yusufdgn');
                addTerminalOutput('  Instagram: instagram.com/yusufdgn');
                break;
                
            case 'social':
                addTerminalOutput('Sosyal Medya:');
                addTerminalOutput('  🔗 LinkedIn: https://tr.linkedin.com/in/yusufdgn');
                addTerminalOutput('  💻 GitHub: https://github.com/yusufdgn');
                addTerminalOutput('  📸 Instagram: https://www.instagram.com/yusufdgn');
                break;
                
            case 'clear':
                const terminalContent = document.querySelector('.terminal-content');
                // Clear only the output content, not the input line
                terminalContent.innerHTML = '';
                addTerminalOutput('Terminal temizlendi.');
                break;
                
            case 'date':
                addTerminalOutput(new Date().toLocaleString('tr-TR'));
                break;
                
            case 'pwd':
                addTerminalOutput('/home/yusufdgn/portfolio');
                break;
                
            case 'ls':
                addTerminalOutput('about.txt  contact.json  portfolio.md  README.md');
                break;
                
            default:
                addTerminalOutput(`Komut bulunamadı: ${command}`);
                addTerminalOutput('Mevcut komutları görmek için "help" yazın.');
        }
        
        addTerminalOutput('');
    }

    // Modern view animations
    function animateModernView() {
        const animatedElements = document.querySelectorAll('.section-title, .about-text, .about-text-center, .contact-info');
        
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement && modernView.classList.contains('active')) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                modernView.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });



    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">✕</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            max-width: 400px;
        `;
        
        const notificationContent = notification.querySelector('.notification-content');
        notificationContent.style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.75rem;
        `;
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.25rem;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
        `;
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideIn 0.3s ease-out reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.profile-card').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero section - disabled for fixed views
    // window.addEventListener('scroll', () => {
    //     const scrolled = window.pageYOffset;
    //     const heroSection = document.querySelector('.hero-section');
    //     
    //     if (heroSection && modernView.classList.contains('active')) {
    //         const speed = scrolled * 0.5;
    //         heroSection.style.transform = `translateY(${speed}px)`;
    //     }
    // });

    // Typing effect for hero text
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }



    // Add CSS animation classes
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        

        

        
        .profile-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
    `;
    document.head.appendChild(animationStyles);

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        konamiCode = konamiCode.slice(-konamiSequence.length);
        
        if (konamiCode.length === konamiSequence.length &&
            konamiCode.every((code, index) => code === konamiSequence[index])) {
            
            showNotification('🎉 Konami kod bulundu! Gizli geliştirici modu aktif!', 'success');
            document.body.style.animation = 'rainbow 2s infinite';
            
            // Add rainbow animation
            const rainbowStyle = document.createElement('style');
            rainbowStyle.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    25% { filter: hue-rotate(90deg); }
                    50% { filter: hue-rotate(180deg); }
                    75% { filter: hue-rotate(270deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(rainbowStyle);
            
            // Reset after 5 seconds
            setTimeout(() => {
                document.body.style.animation = '';
                rainbowStyle.remove();
            }, 5000);
        }
    });

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`🚀 Site yükleme süresi: ${loadTime}ms`);
            
            if (loadTime > 3000) {
                console.warn('⚠️ Site yükleme süresi yavaş. Optimizasyon gerekebilir.');
            }
        });
    }
}); 