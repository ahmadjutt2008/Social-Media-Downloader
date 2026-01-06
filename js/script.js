/**
 * MediaSaver - Main Script
 * Handles UI interactions, platform detection, and fake download simulation.
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navbar = document.getElementById('mainNav');
    const heroInput = document.getElementById('hero-input');
    const urlInput = document.getElementById('url-input');
    const downloadBtn = document.getElementById('download-btn');
    const progressArea = document.getElementById('progress-area');
    const progressBar = progressArea.querySelector('.progress-bar');
    const percentageText = document.getElementById('percentage');
    const statusText = document.getElementById('status-text');
    const successMsg = document.getElementById('success-msg');
    const detectorBadge = document.querySelector('#platform-detector .badge');

    // Platforms Config
    const platforms = [
        { name: 'YouTube', icon: 'fa-youtube', color: '#ff0000', regex: /youtube\.com|youtu\.be/i },
        { name: 'TikTok', icon: 'fa-tiktok', color: '#000000', regex: /tiktok\.com/i },
        { name: 'Instagram', icon: 'fa-instagram', color: '#E1306C', regex: /instagram\.com/i },
        { name: 'Facebook', icon: 'fa-facebook', color: '#1877F2', regex: /facebook\.com/i },
        { name: 'Twitter', icon: 'fa-twitter', color: '#1DA1F2', regex: /twitter\.com|x\.com/i }
    ];

    /* -------------------------------------------------------------------------- */
    /*                               Navbar Scroll                                */
    /* -------------------------------------------------------------------------- */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled', 'shadow-sm');
            navbar.classList.remove('py-3');
            navbar.classList.add('py-2');
        } else {
            navbar.classList.remove('scrolled', 'shadow-sm', 'py-2');
            navbar.classList.add('py-3');
        }
    });

    /* -------------------------------------------------------------------------- */
    /*                           Start Transfer Logic                             */
    /* -------------------------------------------------------------------------- */
    // If user types in Hero input and presses Enter or clicks Hero Download
    // Hero input removed


    /* -------------------------------------------------------------------------- */
    /*                           Platform Detection                               */
    /* -------------------------------------------------------------------------- */
    function detectPlatform(url) {
        let detected = false;

        for (const platform of platforms) {
            if (platform.regex.test(url)) {
                updateBadge(platform.name, platform.icon, platform.color);
                detected = true;
                break;
            }
        }

        if (!detected) {
            if (url.length > 0) {
                updateBadge('Unknown Source', 'fa-link', '#6c757d'); // generic
            } else {
                updateBadge('Auto-detect supported', 'fa-magic', ''); // reset
                // Remove color override
                detectorBadge.style.backgroundColor = '';
                detectorBadge.style.color = '';
                detectorBadge.className = 'badge bg-light text-dark rounded-pill px-3 py-2 border shadow-sm';
            }
        }
    }

    function updateBadge(text, iconClass, color) {
        // Reset to base state to avoid class buildup if strictly needed, 
        // but here we just modify innerHTML and style.
        let iconHtml = `<i class="fab ${iconClass} me-2"></i>`;

        // Fix for font-awesome non-brand icons (like fa-link or fa-magic) being 'fas' not 'fab'
        if (iconClass.startsWith('fa-link') || iconClass.startsWith('fa-magic')) {
            iconHtml = `<i class="fas ${iconClass} me-2"></i>`;
        }

        detectorBadge.innerHTML = `${iconHtml}${text}`;

        if (color) {
            detectorBadge.style.backgroundColor = color;
            detectorBadge.style.color = '#fff';
            detectorBadge.style.borderColor = color;
        }
    }

    urlInput.addEventListener('input', (e) => {
        detectPlatform(e.target.value);

        // Also sync back to hero if needed (optional, keeping it one-way for now usually better)
        // heroInput.value = e.target.value; 
    });


    /* -------------------------------------------------------------------------- */
    /*                          Download Simulation                               */
    /* -------------------------------------------------------------------------- */
    downloadBtn.addEventListener('click', () => {
        const url = urlInput.value.trim();

        if (!url) {
            alert('Please enter a valid URL first!');
            urlInput.focus();
            return;
        }

        // START SIMULATION
        startSimulation();
    });

    function startSimulation() {
        // Reset State
        progressArea.classList.remove('d-none');
        successMsg.classList.add('d-none');
        downloadBtn.disabled = true;
        downloadBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';

        // This is a REAL download now
        const backendUrl = `http://localhost:3000/api/download?url=${encodeURIComponent(urlInput.value.trim())}`;

        statusText.innerText = "Requesting server...";
        progressBar.style.width = '30%';
        percentageText.innerText = '30%';

        // We use a hidden iframe or simple window.location for file download trigger
        // Creating an invisible temporary link to trigger download

        fetch(backendUrl, { method: 'GET' })
            .then(response => {
                if (response.ok) {
                    statusText.innerText = "Downloading stream...";
                    progressBar.style.width = '70%';
                    percentageText.innerText = '70%';
                    return response.blob();
                }
                throw new Error('Network response was not ok.');
            })
            .then(blob => {
                const downloadUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = downloadUrl;
                // Name would ideally come from header, but blob obscures it unless we parse headers manually. 
                // For now simple name:
                a.download = 'video-download.mp4';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(downloadUrl);

                // Finish UI
                finishSimulation();
            })
            .catch(error => {
                console.error('Download error:', error);
                statusText.innerText = "Error!";
                progressBar.classList.add('bg-danger');
                downloadBtn.disabled = false;
                downloadBtn.innerHTML = 'Try Again';
                alert("Failed to download. Make sure the Server is running! (npm start in server folder)");
            });
    }

    function finishSimulation() {
        progressBar.style.width = '100%';
        percentageText.innerText = '100%';
        statusText.innerText = "Complete";

        // Show success
        successMsg.classList.remove('d-none');
        successMsg.innerHTML = '<i class="fas fa-check-circle me-2"></i> Download started! Check your downloads folder.';

        // Reset Button
        downloadBtn.innerHTML = '<i class="fas fa-check me-2"></i> Downloaded';
        downloadBtn.classList.remove('btn-success');
        downloadBtn.classList.add('btn-dark');

        setTimeout(() => {
            downloadBtn.disabled = false;
            downloadBtn.classList.add('btn-success');
            downloadBtn.classList.remove('btn-dark');
            downloadBtn.innerHTML = '<i class="fas fa-download me-2"></i> Start Download';
            progressBar.classList.remove('bg-danger');
            // Hide success message after a while
            // successMsg.classList.add('d-none'); 
        }, 5000);
    }

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

