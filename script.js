let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
        "service_1vb8qsa",
        "template_722aw2c",
        this
    ).then(() => {
        alert("Message sent!");
        this.reset();
    });
});