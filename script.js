// Mobile Virtual Keyboard Fix
function setupMobileKeyboardFix() {
    // Fix for iOS Safari virtual keyboard
    const terminalInput = document.querySelector('.terminal-input');
    const terminalWindow = document.querySelector('.terminal-window');
    
    if (terminalInput && terminalWindow) {
        // When input gets focus (keyboard opens)
        terminalInput.addEventListener('focus', function() {
            if (isMobileDevice()) {
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }, 300);
            }
        });

        // When input loses focus (keyboard closes)
        terminalInput.addEventListener('blur', function() {
            if (isMobileDevice()) {
                setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 300);
            }
        });

        // Prevent zoom on double tap for input
        terminalInput.addEventListener('touchstart', function(e) {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        });

        // Handle viewport resize (keyboard open/close)
        let initialViewportHeight = window.innerHeight;
        window.addEventListener('resize', function() {
            if (isMobileDevice()) {
                const currentHeight = window.innerHeight;
                const isKeyboardOpen = currentHeight < initialViewportHeight * 0.75;
                
                if (isKeyboardOpen) {
                    // Keyboard is open - ensure input is visible
                    setTimeout(() => {
                        terminalInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                } else {
                    // Keyboard is closed - reset scroll
                    initialViewportHeight = currentHeight;
                }
            }
        });
    }
}

// Detect mobile device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform));
}

// View Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const terminalBtn = document.getElementById('terminalBtn');
    const modernBtn = document.getElementById('modernBtn');
    const terminalView = document.getElementById('terminalView');
    const modernView = document.getElementById('modernView');

    // Setup mobile keyboard fix
    setupMobileKeyboardFix();

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
        addTerminalOutput('yusufdgn production environment ready');
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
            commandLine.innerHTML = `<span class="prompt">yusuf@dogan:~$</span> <span class="command">${text}</span>`;
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
                addTerminalOutput('  instagram - Instagram profilini aç');
                addTerminalOutput('  linkedin  - LinkedIn profilini aç');
                addTerminalOutput('  github    - GitHub profilini aç');
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
                addTerminalOutput('/home/yusufdgn/profile');
                break;
                
            case 'ls':
                addTerminalOutput('about.txt  contact.json  portfolio.md  README.md');
                break;
                
            case 'instagram':
                addTerminalOutput('Instagram profiline yönlendiriliyor...');
                addTerminalOutput('🔗 https://www.instagram.com/yusufdgn');
                window.open('https://www.instagram.com/yusufdgn', '_blank');
                break;
                
            case 'linkedin':
                addTerminalOutput('LinkedIn profiline yönlendiriliyor...');
                addTerminalOutput('🔗 https://tr.linkedin.com/in/yusufdgn');
                window.open('https://tr.linkedin.com/in/yusufdgn', '_blank');
                break;
                
            case 'github':
                addTerminalOutput('GitHub profiline yönlendiriliyor...');
                addTerminalOutput('🔗 https://github.com/yusufdgn');
                window.open('https://github.com/yusufdgn', '_blank');
                break;
                
            // Easter Eggs
            case 'rm -rfv *':
            case 'rm -rf *':
            case 'rm -rfv':
                addTerminalOutput('Dosyalar siliniyor...');
                addTerminalOutput('rm: about.txt... silindi');
                addTerminalOutput('rm: contact.json... silindi');
                addTerminalOutput('rm: portfolio.md... silindi');
                addTerminalOutput('rm: README.md... silindi');
                addTerminalOutput('rm: sistem dosyaları... silindi');
                addTerminalOutput('rm: /bin/bash... silindi');
                addTerminalOutput('rm: /etc/passwd... silindi');
                addTerminalOutput('');
                setTimeout(() => {
                    show403Forbidden();
                }, 2000);
                break;
                
            case 'reboot':
                addTerminalOutput('Sistem yeniden başlatılıyor...');
                setTimeout(() => {
                    ubuntuBootSequence();
                }, 1000);
                break;
                
            case 'shutdown':
                addTerminalOutput('Sistem kapatılıyor...');
                setTimeout(() => {
                    ubuntuShutdownSequence();
                }, 1000);
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

    // Easter Egg Functions
    function show403Forbidden() {
        // Hide all content
        document.querySelectorAll('body > *').forEach(el => {
            if (el.id !== 'forbidden-screen') {
                el.style.display = 'none';
            }
        });

        // Create 403 Forbidden screen
        const forbiddenScreen = document.createElement('div');
        forbiddenScreen.id = 'forbidden-screen';
        forbiddenScreen.innerHTML = `
            <div class="forbidden-content">
                <div class="forbidden-code">403</div>
                <div class="forbidden-title">FORBIDDEN</div>
                <div class="forbidden-message">
                    <p>Access Denied</p>
                    <p>You don't have permission to access this resource.</p>
                </div>
                <div class="forbidden-details">
                    <p>Error occurred after executing: <code>rm -rfv *</code></p>
                    <p>All files have been permanently deleted.</p>
                    <p class="server-info">nginx/1.18.0 (Ubuntu)</p>
                </div>
            </div>
        `;

        // Add CSS styles
        const forbiddenStyle = document.createElement('style');
        forbiddenStyle.textContent = `
            #forbidden-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #1a1a1a;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                font-family: 'JetBrains Mono', monospace;
            }

            .forbidden-content {
                text-align: center;
                max-width: 600px;
                padding: 2rem;
            }

            .forbidden-code {
                font-size: 8rem;
                font-weight: bold;
                color: #ff4444;
                margin-bottom: 1rem;
                text-shadow: 0 0 20px rgba(255, 68, 68, 0.5);
                animation: pulse 2s infinite;
            }

            .forbidden-title {
                font-size: 2.5rem;
                font-weight: bold;
                margin-bottom: 2rem;
                color: #ff4444;
                letter-spacing: 0.2em;
            }

            .forbidden-message {
                margin-bottom: 2rem;
                line-height: 1.6;
            }

            .forbidden-message p {
                margin: 0.5rem 0;
                font-size: 1.1rem;
            }

            .hint {
                background: rgba(255, 255, 0, 0.1);
                border: 1px solid rgba(255, 255, 0, 0.3);
                padding: 1rem;
                border-radius: 8px;
                margin-top: 1.5rem !important;
                color: #ffff00;
            }

            .forbidden-details {
                font-size: 0.9rem;
                color: #888;
                margin-top: 2rem;
                padding-top: 2rem;
                border-top: 1px solid #333;
            }

            .forbidden-details p {
                margin: 0.5rem 0;
            }

            .forbidden-details code {
                background: #2a2a2a;
                padding: 0.2rem 0.5rem;
                border-radius: 4px;
                color: #ff6b6b;
            }

            .server-info {
                margin-top: 1rem;
                font-size: 0.8rem;
                color: #666;
            }

            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(forbiddenStyle);
        document.body.appendChild(forbiddenScreen);
    }

        function restore403Forbidden() {
        // This function is no longer used directly
        // reboot command now always calls ubuntuBootSequence()
        ubuntuBootSequence();
    }

    // Ubuntu Boot Sequence
    function ubuntuBootSequence() {
        // Hide all content first
        document.querySelectorAll('body > *').forEach(el => {
            if (el.id !== 'boot-screen') {
                el.style.display = 'none';
            }
        });

        // Create boot screen
        const bootScreen = document.createElement('div');
        bootScreen.id = 'boot-screen';
        bootScreen.innerHTML = `
            <div class="boot-content">
                <div class="boot-output"></div>
            </div>
        `;

        // Add boot screen styles
        const bootStyle = document.createElement('style');
        bootStyle.textContent = `
            #boot-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #000;
                color: #fff;
                font-family: 'JetBrains Mono', monospace;
                z-index: 9999;
                overflow: hidden;
            }

            .boot-content {
                padding: 1rem;
                height: 100%;
                overflow-y: auto;
            }

            .boot-output {
                white-space: pre-wrap;
                font-size: 0.9rem;
                line-height: 1.2;
            }

            .boot-line {
                margin: 0.1rem 0;
            }

            .boot-ok {
                color: #00ff00;
            }

            .boot-info {
                color: #87ceeb;
            }

            .boot-warn {
                color: #ffaa00;
            }
        `;
        document.head.appendChild(bootStyle);
        document.body.appendChild(bootScreen);

        const bootOutput = bootScreen.querySelector('.boot-output');

        // Boot sequence messages
        const bootMessages = [
            { text: 'GRUB loading...', delay: 500, class: 'boot-info' },
            { text: 'Booting Ubuntu 22.04.3 LTS', delay: 300, class: 'boot-info' },
            { text: '', delay: 200 },
            { text: '[    0.000000] Linux version 6.2.0-26-generic', delay: 100 },
            { text: '[    0.000000] Command line: BOOT_IMAGE=/vmlinuz root=UUID=...', delay: 50 },
            { text: '[    0.000000] KERNEL supported cpus:', delay: 50 },
            { text: '[    0.000000]   Intel GenuineIntel', delay: 50 },
            { text: '[    0.000000]   AMD AuthenticAMD', delay: 50 },
            { text: '[    0.001000] DMI: yusufdgn/profile v1.0', delay: 100 },
            { text: '[    0.002000] Memory: 16384M available', delay: 100 },
            { text: '[    0.010000] CPU: AMD Ryzen 9 processor detected', delay: 150 },
            { text: '[    0.050000] PCI: Using configuration type 1', delay: 100 },
            { text: '[    0.100000] Setting up USB controllers...', delay: 150 },
            { text: '[    0.200000] Loading initial ramdisk...', delay: 200 },
            { text: '[    0.500000] Mounting root filesystem...', delay: 300 },
            { text: '[    1.000000] Starting systemd...', delay: 400, class: 'boot-info' },
            { text: '', delay: 300 },
            { text: '[  OK  ] Reached target Swap', delay: 100, class: 'boot-ok' },
            { text: '[  OK  ] Reached target Local File Systems', delay: 100, class: 'boot-ok' },
            { text: '[  OK  ] Started systemd-networkd', delay: 150, class: 'boot-ok' },
            { text: '[  OK  ] Started Network Name Resolution', delay: 100, class: 'boot-ok' },
            { text: '[  OK  ] Started OpenSSH server daemon', delay: 200, class: 'boot-ok' },
            { text: '[  OK  ] Started Docker Application Container Engine', delay: 150, class: 'boot-ok' },
            { text: '[  OK  ] Started PostgreSQL database server', delay: 100, class: 'boot-ok' },
            { text: '[  OK  ] Started Redis persistent key-value database', delay: 100, class: 'boot-ok' },
            { text: '[  OK  ] Started Node.js application server', delay: 150, class: 'boot-ok' },
            { text: '[  OK  ] Reached target Multi-User System', delay: 200, class: 'boot-ok' },
            { text: '[  OK  ] Reached target Graphical Interface', delay: 150, class: 'boot-ok' },
            { text: '', delay: 500 },
            { text: 'Ubuntu 22.04.3 LTS yusufdgn-profile tty1', delay: 300, class: 'boot-info' },
            { text: '', delay: 200 },
            { text: 'yusufdgn-profile login: yusuf', delay: 800 },
            { text: 'Password: ********', delay: 600 },
            { text: '', delay: 400 },
            { text: 'Last login: ' + new Date().toLocaleString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                timeZone: 'Europe/Istanbul' 
            }) + ' +03 on tty1', delay: 300, class: 'boot-info' },
            { text: '', delay: 200 },
            { text: 'Welcome to Ubuntu 22.04.3 LTS (GNU/Linux 6.2.0-26-generic x86_64)', delay: 300, class: 'boot-info' },
            { text: '', delay: 200 },
            { text: ' * Documentation:  https://help.ubuntu.com', delay: 100, class: 'boot-info' },
            { text: ' * Management:     https://landscape.canonical.com', delay: 100, class: 'boot-info' },
            { text: ' * Support:        https://ubuntu.com/advantage', delay: 100, class: 'boot-info' },
            { text: '', delay: 300 },
            { text: 'System information as of ' + new Date().toISOString().split('T')[0], delay: 200, class: 'boot-info' },
            { text: '', delay: 100 },
            { text: '  System load:  0.08              Processes:             287', delay: 100 },
            { text: '  Usage of /:   42.3% of 50.00GB  Users logged in:       1', delay: 100 },
            { text: '  Memory usage: 23%               IPv4 address for eth0: 192.168.1.100', delay: 100 },
            { text: '  Swap usage:   0%', delay: 100 },
            { text: '', delay: 500 },
            { text: '🚀 yusufdogan production environment ready!', delay: 300, class: 'boot-ok' },
            { text: '💻 Profile system online!', delay: 200, class: 'boot-ok' },
            { text: '', delay: 400 },
            { text: 'yusuf@dogan-profile:~$ ', delay: 500, class: 'boot-info' }
        ];

        let messageIndex = 0;
        let totalDelay = 0;

        function showNextMessage() {
            if (messageIndex < bootMessages.length) {
                const message = bootMessages[messageIndex];
                totalDelay += message.delay;
                
                setTimeout(() => {
                    const line = document.createElement('div');
                    line.className = `boot-line ${message.class || ''}`;
                    line.textContent = message.text;
                    bootOutput.appendChild(line);
                    
                    // Auto scroll
                    bootOutput.scrollTop = bootOutput.scrollHeight;
                    
                    messageIndex++;
                    showNextMessage();
                }, message.delay);
            } else {
                // Boot complete, return to terminal
                setTimeout(() => {
                    finishBoot();
                }, 1000);
            }
        }

        showNextMessage();
    }

    function finishBoot() {
        // Remove boot screen
        const bootScreen = document.getElementById('boot-screen');
        if (bootScreen) {
            bootScreen.remove();
        }

        // Remove forbidden screen if exists
        const forbiddenScreen = document.getElementById('forbidden-screen');
        if (forbiddenScreen) {
            forbiddenScreen.remove();
        }

        // Remove shutdown screen if exists
        const shutdownScreen = document.getElementById('shutdown-screen');
        if (shutdownScreen) {
            shutdownScreen.remove();
        }

        // Show all content again
        document.querySelectorAll('body > *').forEach(el => {
            el.style.display = '';
        });

        // Clear terminal and show boot complete message
        setTimeout(() => {
            const terminalContent = document.querySelector('.terminal-content');
            if (terminalContent) {
                terminalContent.innerHTML = '';
                addTerminalOutput('🔄 Sistem başarıyla yeniden başlatıldı!');
                addTerminalOutput('');
                addTerminalOutput('💻 Ubuntu 22.04.3 LTS - Profile Edition');
                addTerminalOutput('🚀 yusufdgn production environment ready!');
                addTerminalOutput('');
                addTerminalOutput('Hoş geldin tekrar, Yusuf! 👋');
                addTerminalOutput('');
                addTerminalOutput('Komutları görmek için "help" yazın.');
                addTerminalOutput('');
            }
        }, 100);
    }

    // Ubuntu Shutdown Sequence
    function ubuntuShutdownSequence() {
        // Hide all content first
        document.querySelectorAll('body > *').forEach(el => {
            if (el.id !== 'shutdown-screen') {
                el.style.display = 'none';
            }
        });

        // Create shutdown screen
        const shutdownScreen = document.createElement('div');
        shutdownScreen.id = 'shutdown-screen';
        shutdownScreen.innerHTML = `
            <div class="shutdown-content">
                <div class="shutdown-output"></div>
            </div>
        `;

        // Add shutdown screen styles
        const shutdownStyle = document.createElement('style');
        shutdownStyle.textContent = `
            #shutdown-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #000;
                color: #fff;
                font-family: 'JetBrains Mono', monospace;
                z-index: 9999;
                overflow: hidden;
            }

            .shutdown-content {
                padding: 1rem;
                height: 100%;
                overflow-y: auto;
            }

            .shutdown-output {
                white-space: pre-wrap;
                font-size: 0.9rem;
                line-height: 1.2;
            }

            .shutdown-line {
                margin: 0.1rem 0;
            }

            .shutdown-stop {
                color: #ff6b6b;
            }

            .shutdown-info {
                color: #87ceeb;
            }

            .shutdown-warn {
                color: #ffaa00;
            }

            .shutdown-final {
                color: #ff4444;
                font-weight: bold;
                text-align: center;
                margin-top: 2rem;
                font-size: 1.2rem;
            }
        `;
        document.head.appendChild(shutdownStyle);
        document.body.appendChild(shutdownScreen);

        const shutdownOutput = shutdownScreen.querySelector('.shutdown-output');

        // Shutdown sequence messages
        const shutdownMessages = [
            { text: 'Stopping yusufdgn production environment...', delay: 500, class: 'shutdown-info' },
            { text: '', delay: 200 },
            { text: '[STOP ] Stopping Node.js application server...', delay: 300, class: 'shutdown-stop' },
            { text: '[STOP ] Stopping Redis persistent key-value database...', delay: 200, class: 'shutdown-stop' },
            { text: '[STOP ] Stopping PostgreSQL database server...', delay: 250, class: 'shutdown-stop' },
            { text: '[STOP ] Stopping Docker Application Container Engine...', delay: 300, class: 'shutdown-stop' },
            { text: '[STOP ] Stopping OpenSSH server daemon...', delay: 200, class: 'shutdown-stop' },
            { text: '[STOP ] Stopping systemd-networkd...', delay: 150, class: 'shutdown-stop' },
            { text: '[STOP ] Stopping Network Name Resolution...', delay: 150, class: 'shutdown-stop' },
            { text: '', delay: 300 },
            { text: 'Unmounting filesystems...', delay: 400, class: 'shutdown-info' },
            { text: 'Unmounting /home...', delay: 200 },
            { text: 'Unmounting /var...', delay: 200 },
            { text: 'Unmounting /tmp...', delay: 200 },
            { text: 'Unmounting /usr...', delay: 250 },
            { text: 'Unmounting /boot...', delay: 200 },
            { text: '', delay: 300 },
            { text: 'Deactivating swap...', delay: 300, class: 'shutdown-info' },
            { text: 'Remounting root filesystem read-only...', delay: 400, class: 'shutdown-info' },
            { text: '', delay: 500 },
            { text: 'Shutting down network interfaces...', delay: 300 },
            { text: 'Powering off CPU cores...', delay: 400 },
            { text: 'Stopping system clock...', delay: 300 },
            { text: '', delay: 600 },
            { text: '💻 Profile system offline.', delay: 400, class: 'shutdown-info' },
            { text: '🔌 yusufdgn production environment stopped.', delay: 400, class: 'shutdown-info' },
            { text: '', delay: 800 },
            { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', delay: 600, class: 'shutdown-final' },
            { text: '        SYSTEM HALTED        ', delay: 400, class: 'shutdown-final' },
            { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', delay: 200, class: 'shutdown-final' },
            { text: '', delay: 400 },
            { text: 'It is now safe to power off your computer.', delay: 600, class: 'shutdown-info' },
            { text: '', delay: 200 },
            { text: '⚡ System powered down.', delay: 400, class: 'shutdown-final' }
        ];

        let messageIndex = 0;

        function showNextShutdownMessage() {
            if (messageIndex < shutdownMessages.length) {
                const message = shutdownMessages[messageIndex];
                
                setTimeout(() => {
                    const line = document.createElement('div');
                    line.className = `shutdown-line ${message.class || ''}`;
                    line.textContent = message.text;
                    shutdownOutput.appendChild(line);
                    
                    // Auto scroll
                    shutdownOutput.scrollTop = shutdownOutput.scrollHeight;
                    
                    messageIndex++;
                    showNextShutdownMessage();
                }, message.delay);
            }
            // No finishShutdown - system stays halted!
        }

        showNextShutdownMessage();
    }

 
}); 