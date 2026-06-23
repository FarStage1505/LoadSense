document.addEventListener("DOMContentLoaded", () => {
    
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-item");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("open");
        
        
        const bars = menuToggle.querySelectorAll(".bar");
        if(menuToggle.classList.contains("open")) {
            bars[0].style.transform = "rotate(45deg) translate(6px, 6px)";
            bars[1].style.opacity = "0";
            bars[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
        } else {
            bars[0].style.transform = "none";
            bars[1].style.opacity = "1";
            bars[2].style.transform = "none";
        }
    });

        navItems.forEach(item => {
        item.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("open");
            const bars = menuToggle.querySelectorAll(".bar");
            bars[0].style.transform = "none";
            bars[1].style.opacity = "1";
            bars[2].style.transform = "none";
        });
    });

    const navbar = document.querySelector(".navbar");
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${currentSectionId}`) {
                item.classList.add("active");
            }
        });
    });

    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    const statNumbers = document.querySelectorAll(".stat-number");
    
    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute("data-target"), 10);
                
                if (endValue === 0) {
                    target.innerText = "0";
                    return;
                }

                let startValue = 0;
                const duration = 2000; 
                const counterInterval = 20; 
                const step = (endValue / (duration / counterInterval));

                const counterLoop = setInterval(() => {
                    startValue += step;
                    if (startValue >= endValue) {
                        target.innerText = endValue;
                        clearInterval(counterLoop);
                    } else {
                        target.innerText = Math.floor(startValue);
                    }
                }, counterInterval);

                observer.unobserve(target);
            }
        });
    };

    const statsObserver = new IntersectionObserver(animateCounters, {
        threshold: 0.5
    });

    statNumbers.forEach(num => {
        statsObserver.observe(num);
    });

    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 600) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    const contactForm = document.getElementById("loadSenseForm");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector("button[type='submit']");
        const originalText = submitBtn.innerText;
        
    
        submitBtn.disabled = true;
        submitBtn.style.backgroundColor = "var(--success-green)";
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Mensagem Enviada!';
        
        setTimeout(() => {
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = "var(--primary-orange)";
            submitBtn.innerText = originalText;
        }, 3000);
    });
});