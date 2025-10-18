// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Get the login form element
    const loginForm = document.getElementById('loginForm');
    
    // Sample user data (in a real app, this would come from a database)
    const validUsers = [
        { email: 'user@example.com', password: 'password123' },
        { email: 'admin@example.com', password: 'admin123' }
    ];
    
    // Add form submit event listener
    loginForm.addEventListener('submit', (e) => {
        // Prevent the default form submission
        e.preventDefault();
        
        // Get form input values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;
        
        // Validate credentials (simple demo validation)
        const user = validUsers.find(user => user.email === email && user.password === password);
        
        if (user) {
            // Successful login
            displayMessage('success', 'Login successful! Redirecting...');
            
            // If remember me is checked, store email in localStorage (demo only)
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            
            // Simulate redirect after successful login
            setTimeout(() => {
                alert('In a real app, you would be redirected to the dashboard');
                // window.location.href = 'dashboard.html'; // Uncomment in real app
            }, 1500);
        } else {
            // Failed login
            displayMessage('error', 'Invalid email or password');
        }
    });
    
    // Function to display messages
    function displayMessage(type, message) {
        // Check if a message container already exists
        let messageContainer = document.querySelector('.message-container');
        
        // If not, create one
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.className = 'message-container';
            loginForm.insertAdjacentElement('beforebegin', messageContainer);
        }
        
        // Set message content and style
        messageContainer.textContent = message;
        messageContainer.className = `message-container ${type}`;
        
        // Add CSS styles for messages
        const style = document.createElement('style');
        style.textContent = `
            .message-container {
                padding: 10px;
                margin-bottom: 20px;
                border-radius: 4px;
                text-align: center;
                animation: fadeIn 0.3s;
            }
            
            .success {
                background-color: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            
            .error {
                background-color: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Remove message after a delay
        if (type === 'error') {
            setTimeout(() => {
                messageContainer.remove();
            }, 3000);
        }
    }
    
    // Check for remembered email
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }
    
    // Social login handlers (mock)
    document.querySelector('.google-btn').addEventListener('click', () => {
        alert('Google login would be implemented here in a real application');
    });
    
    document.querySelector('.facebook-btn').addEventListener('click', () => {
        alert('Facebook login would be implemented here in a real application');
    });
    
    // Forgot password handler
    document.querySelector('.forgot-password').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Password reset functionality would be implemented here in a real application');
    });
    
    // Sign up handler
    document.querySelector('.signup-link a').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Sign up page would be linked here in a real application');
    });
});
