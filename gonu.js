document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const slides = document.querySelectorAll('.slider img');
let currentSlide = 0;

function showNextSlide() {
    // Hapus kelas active dari semua gambar
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        // Tambahkan transform scale kecil untuk gambar yang tidak aktif
        slide.style.transform = 'scale(0.8)';
    });

    // Tambahkan kelas active ke gambar berikutnya
    currentSlide = (currentSlide + 1) % slides.length; // Perputaran berulang
    slides[currentSlide].classList.add('active');
    // Pastikan gambar aktif membesar
    slides[currentSlide].style.transform = 'scale(1)';
}

// Panggil fungsi setiap 3 detik
setInterval(showNextSlide, 3500);

// Initialize EmailJS
(function() {
    emailjs.init("MWdsEBl7jW0Vb_60U"); // Ganti dengan Public Key dari EmailJS
})();

// Form submission handler
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Ambil data dari formulir
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Kirim data ke EmailJS
    emailjs.send("service_5fdtag7", "template_dm29zak", {
        name: name,
        email: email,
        message: message,
    })
    .then(function(response) {
        document.getElementById("status-message").innerText = "Message sent successfully!";
        document.getElementById("contact-form").reset();
    }, function(error) {
        document.getElementById("status-message").innerText = "Failed to send message. Please try again.";
        console.error("EmailJS Error:", error);
    });
});
// Fungsi untuk menampilkan status message
function showStatusMessage(message, success) {
    const statusMessage = document.getElementById('status-message');
    statusMessage.innerHTML = message;

    if (success) {
        statusMessage.style.backgroundColor = 'rgba(58, 194, 58, 0.8)'; // Hijau untuk sukses
    } else {
        statusMessage.style.backgroundColor = 'rgba(194, 58, 58, 0.8)'; // Merah untuk error
    }

    // Tampilkan pop-up
    statusMessage.classList.add('show');
    
    // Sembunyikan pop-up setelah 5 detik
    setTimeout(() => {
        statusMessage.classList.remove('show');
    }, 5000);  // 5 detik
}

// Contoh: Memanggil fungsi setelah tombol submit ditekan
document.querySelector('.btn-submit').addEventListener('click', function(event) {
    event.preventDefault(); // Mencegah pengiriman form untuk simulasi

    // Tampilkan pesan sukses (misalnya, setelah pengiriman berhasil)
    showStatusMessage('Your message has been sent successfully!', true);
});