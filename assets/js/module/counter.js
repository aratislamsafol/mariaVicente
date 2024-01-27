
document.addEventListener("DOMContentLoaded", function() {
    const counters = document.querySelectorAll('.count');
    
    // Intersection Observer Configuration
    const options = {
        threshold: 0.7,
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounterAnimation(entry.target, getCounterSpeed(entry.target));
                observer.unobserve(entry.target);
            }
        });
    }, options);

    counters.forEach(counter => {
        observer.observe(counter);
    });

    // Counter Animation Function
    function startCounterAnimation(counterElement, speed) {
        const targetNumber = parseInt(counterElement.getAttribute('data-number'));
        let currentNumber = 0;

        const counterInterval = setInterval(() => {
            currentNumber++;
            counterElement.textContent = currentNumber;

            if (currentNumber === targetNumber) {
                clearInterval(counterInterval);
                if (counterElement.classList.contains('positive-feedback')) {
                    counterElement.textContent += '%';
                } else if (currentNumber > 1) {
                    counterElement.textContent += '+';
                }
            }
        }, speed);
    }

    // Function to determine counter speed based on counter type
    function getCounterSpeed(counterElement) {
        const counterType = counterElement.parentElement.querySelector('.text').textContent.toLowerCase();
        
        switch (counterType) {
            case 'total sessions':
                return 10; // Faster interval for Total Sessions
            case 'years of experience':
                return 30; // Slower interval for Years of Experience
            case 'positive feedback':
                return 20; // Medium interval for Positive Feedback
            default:
                return 15; // Default interval for other counters
        }
    }
});