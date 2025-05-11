// Tab switching logic using addEventListener
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function () {
        // Remove active from all buttons and contents
        document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));

        // Add active to clicked button and corresponding content
        this.classList.add('active');
        document.getElementById(this.dataset.tab).classList.add('active');
    });
});