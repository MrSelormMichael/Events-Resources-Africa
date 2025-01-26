// Slideshow functionality
let slideIndex = 1;
showSlides(slideIndex);

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    slides[slideIndex-1].style.display = "block";  
}

// Auto slideshow
setInterval(() => changeSlide(1), 5000);

// Venue Booking Functionality
function copyPhoneNumber() {
    const phoneNumber = '+1234567890'; // Replace with actual number
    navigator.clipboard.writeText(phoneNumber).then(() => {
        alert('Phone number copied!');
    });
}

function initiateWhatsAppChat() {
    const phoneNumber = '+1234567890'; // Replace with actual number
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
}

function bookVenue() {
    const email = 'bookings@venuerental.com'; // Placeholder email
    const subject = 'Venue Booking Inquiry';
    const body = 'I am interested in booking a venue...';
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Optional: Form validation for booking
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form validation logic here
            bookVenue();
        });
    }
});