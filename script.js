const menuIcon = document.getElementById("menu-icon");
const navLinks = document.querySelector(".nav-links");

menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    // icon morph
    menuIcon.classList.toggle("bx-menu");
    menuIcon.classList.toggle("bx-x");
});

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