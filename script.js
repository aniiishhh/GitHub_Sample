// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add active class to clicked link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // Scroll behavior would go here in a real implementation
            console.log('Navigating to:', this.textContent);
        });
    });
    
    // Simple animation for features on scroll
    const features = document.querySelectorAll('.feature');
    
    // This is a simplified version - in a real site, you would use
    // Intersection Observer or scroll events
    setTimeout(() => {
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.opacity = '0';
                feature.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    feature.style.opacity = '1';
                    feature.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    }, 1000);
    
    // Form validation would go here for a contact form
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        
        if (window.scrollY > 50) {
            header.style.padding = '15px 50px';
            header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.2)';
        } else {
            header.style.padding = '20px 50px';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
});

// This would be a placeholder for more complex interactions in a real site
function showModal(message) {
    alert(message);
}

// Example of handling a form submission
function handleContactForm(event) {
    // In a real implementation, this would send data to a server
    event.preventDefault();
    console.log('Form submitted!');
    showModal('Thanks for your message! We will get back to you soon.');
}
