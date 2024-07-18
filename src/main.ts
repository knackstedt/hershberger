import Flicking from "@egjs/flicking";
import "./lib/smoothscroll.js";
import "@egjs/flicking/dist/flicking.css";

const NAVBAR_HEIGHT = 48;

// const flicking = new Flicking(".flicking-viewport", { circular: true });

// Set the copyright date.
document.getElementById("copyright").innerHTML = `&copy; ${new Date().getFullYear()} Copyright Hershberger LLC.`;

// Make all anchor links smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const el = document.querySelector(this.getAttribute('href')) as HTMLElement;
        document.body.parentElement.scrollTo({
            top: el.offsetTop - NAVBAR_HEIGHT,
            left: document.body.parentElement.scrollLeft != 0 ? el.offsetLeft : 0,
            behavior: 'smooth'
        });
    });
});

const { body } = document;

const header = document.querySelector(".header") as HTMLElement;
const headerPlaceholder = document.querySelector(".header-placeholder") as HTMLElement;

document.addEventListener("scroll", () => {
    // subtract the menu height
    if (body.parentElement.scrollTop > (window.innerHeight - NAVBAR_HEIGHT)) {
        header.style.position = "fixed";
        headerPlaceholder.style.display = "block";
    }
    else {
        header.style.position = "relative";
        headerPlaceholder.style.display = "none";
    }
})