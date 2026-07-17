/*=========================================
        SELECT ELEMENTS
=========================================*/

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const caption = document.querySelector(".caption");
const counter = document.querySelector(".counter");

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const closeBtn = document.querySelector(".close");


/*=========================================
        VARIABLES
=========================================*/

let currentCategory = "digital";
let currentImages = [];
let currentIndex = 0;


/*=========================================
        CATEGORY FILTER
=========================================*/

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        /* Remove active class */

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        currentCategory = button.dataset.filter;

        galleryItems.forEach(item => {

            if (item.classList.contains(currentCategory)) {

                item.classList.remove("hide");

            } else {

                item.classList.add("hide");

            }

        });

        updateGalleryArray();

    });

});


/*=========================================
        UPDATE IMAGE ARRAY
=========================================*/

function updateGalleryArray() {

    currentImages = Array.from(

        document.querySelectorAll(
            ".gallery-item." + currentCategory
        )

    );

}

updateGalleryArray();


/*=========================================
        OPEN LIGHTBOX
=========================================*/

currentImages.forEach((item, index) => {

    item.addEventListener("click", () => {

        openLightbox(index);

    });

});


/*=========================================
        REATTACH EVENTS
=========================================*/

function attachImageEvents() {

    updateGalleryArray();

    currentImages.forEach((item, index) => {

        item.onclick = () => {

            openLightbox(index);

        };

    });

}

attachImageEvents();


/*=========================================
        OPEN FUNCTION
=========================================*/

function openLightbox(index) {

    currentIndex = index;

    lightbox.classList.add("show");

    updateLightbox();

}


/*=========================================
        UPDATE IMAGE
=========================================*/

function updateLightbox() {

    const img =
        currentImages[currentIndex].querySelector("img");

    const title =
        currentImages[currentIndex].querySelector("h3");

    lightboxImg.src = img.src;

    lightboxImg.alt = img.alt;

    caption.innerHTML = title.innerHTML;

    counter.innerHTML =
        (currentIndex + 1) +
        " / " +
        currentImages.length;

}
/*=========================================
        PREVIOUS IMAGE
=========================================*/

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = currentImages.length - 1;

    }

    updateLightbox();

});


/*=========================================
        NEXT IMAGE
=========================================*/

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if(currentIndex >= currentImages.length){

        currentIndex = 0;

    }

    updateLightbox();

});


/*=========================================
        CLOSE LIGHTBOX
=========================================*/

closeBtn.addEventListener("click", closeLightbox);


function closeLightbox(){

    lightbox.classList.remove("show");

}


/*=========================================
        CLICK OUTSIDE IMAGE TO CLOSE
=========================================*/

lightbox.addEventListener("click",(e)=>{

    if(e.target === lightbox){

        closeLightbox();

    }

});


/*=========================================
        KEYBOARD CONTROLS
=========================================*/

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("show"))
        return;


    if(e.key === "ArrowRight"){

        nextBtn.click();

    }


    if(e.key === "ArrowLeft"){

        prevBtn.click();

    }


    if(e.key === "Escape"){

        closeLightbox();

    }

});


/*=========================================
      UPDATE EVENTS AFTER FILTER CHANGE
=========================================*/

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        setTimeout(()=>{

            attachImageEvents();

        },50);

    });

});


/*=========================================
      OPTIONAL IMAGE PRELOADING
=========================================*/

galleryItems.forEach(item=>{

    const img = item.querySelector("img");

    const preload = new Image();

    preload.src = img.src;

});


/*=========================================
        END OF PART 3B
=========================================*/