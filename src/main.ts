import "./lib/smoothscroll.js";
import Masonry from 'masonry-layout';
import gallery from './gallery.json';
import GLightbox from 'glightbox';
import "glightbox/dist/css/glightbox.min.css"

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

// Automatically affix the navbar to the top of the view
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

const galleryContainer = document.querySelector('.gallery .content');
const lightbox = GLightbox({
    touchNavigation: true,
    loop: true
});

gallery.forEach((g, i) => {
    const url = "/assets/gallery/" + g;
    lightbox.insertSlide({
        href: url,
        width: '90vw'
    }, i);

    const img = document.createElement("img");
    img.classList.add("grid-item");
    
    img.src = url;

    img.onclick = () => lightbox.openAt(i);

    galleryContainer.append(img);
});

// Provide some time for the DOM to settle before binding the masonry container
// This prevents an occasional init failure where images aren't tiled properly.
setTimeout(() => {
    const masonry = new Masonry(galleryContainer, {
        itemSelector: '.grid-item',
        transitionDuration: 200,
        fitWidth: true,
        resize: true
    });

}, 100)