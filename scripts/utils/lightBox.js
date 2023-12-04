// L I G H T  B O X
// ============================================================
let index = 0;
let mediumType = "";

//let lightboxIsDisplayed = false;

//console.log("sortedPictures from livebox", sortedPictures);
// function getMediumIndex 
function getFirstMedium(e) {
    index = e.currentTarget.dataset.index*1;
    console.log("mediumList.length", mediumList.length, index);
    myLightbox.style.display = "flex";
    // lightboxIsDisplayed = true;
    displayLightbox(index)
}
    
console.log('Current index: ', index);
/* function displayLightbox(index, mediumType) { */
function displayLightbox(n) {
    console.log('Current index: ', index);
    // Rmk: index starts from 0
    // 1 - Check if index is in index range
    // 2 - check the type of medium (image or video)
    // 3 - according to type of medium:
    //      a - get path to the medium
    //      b - get the medium's title  

    if (n > mediumList.length-1) {
        index = 0;
    } else if (n < 0) {
        index = mediumList.length -1;
    };
    
    mediumType = mediumList[index].getAttribute('data-medium-type');

    let mediumTitle = "";
   
    if (mediumType === "image") {
        console.log("path to image: ", mediumList[index].firstChild.getAttribute('src'));
        console.log("alt / image: ", mediumList[index].firstChild.getAttribute('alt'));
        mediumTitle =  mediumList[index].firstChild.getAttribute('alt');
        lightbox__medium.replaceChildren();
        const lightbox__image = document.createElement("img");
        lightbox__image.classList.add("lbImage");
        lightbox__image.setAttribute(
            "src", mediumList[index].firstChild.getAttribute('src')
            );
        lightbox__medium.appendChild(lightbox__image);
    }; 

    if (mediumType === "video") {
        lightbox__medium.replaceChildren();
        console.log("path to video: ", mediumList[index].firstChild.firstElementChild.getAttribute('src'));
        console.log("alt / video: ", mediumList[index].firstChild.firstElementChild.getAttribute('alt'));
        mediumTitle =  mediumList[index].firstChild.firstElementChild.getAttribute('alt');
        const lightbox__video = document.createElement("video");
        lightbox__video.classList.add('lbVideo');
        lightbox__video.setAttribute("src",  mediumList[index].firstChild.firstElementChild.getAttribute('src'));
        lightbox__video.setAttribute("controls", "width=350");
        lightbox__medium.appendChild(lightbox__video); 
    };
    const lightbox__lbTitle = document.querySelector(".lbTitle p");
    lightbox__lbTitle.textContent = mediumTitle;
};

const myLightbox = document.getElementById("myLightbox");

// lightbox structure
// ======================================================
// window overlay
const lightbox__overlay = document.createElement("div");
lightbox__overlay.classList.add("lbOverlay");
// lightbox content : 
const lightbox__content = document.createElement("div");
lightbox__content.classList.add("lbContent");

//
// close button
const lightbox__btnClose = document.createElement("div");
// lightbox__btnClose.classList.add('lbBtnClose');
const cross = document.createElement("img");
cross.classList.add("lbBtnClose");
cross.setAttribute("tabindex", "0");
cross.setAttribute("aria-label", "Fermer la lightbox");
cross.setAttribute("src", "./assets/icons/close.svg");
lightbox__btnClose.appendChild(cross);
lightbox__content.appendChild(lightbox__btnClose);
//
// previous arrow / button
const lightbox__btnPrevious = document.createElement("div");
lightbox__btnPrevious.classList.add("lbBtnPrevious");
const chevronLeft = document.createElement("img");
chevronLeft.setAttribute("tabindex", "0");
chevronLeft.setAttribute("aria-label", "Afficher l'image précédente");
chevronLeft.setAttribute("src", "./assets/icons/chevron_left.svg");
lightbox__btnPrevious.appendChild(chevronLeft);
lightbox__content.appendChild(lightbox__btnPrevious);
//
// next arrow / button
const lightbox__btnNext = document.createElement("div");
lightbox__btnNext.classList.add("lbBtnNext");
const chevronRight = document.createElement("img");
chevronRight.setAttribute("tabindex", "0");
chevronRight.setAttribute("aria-label", "Afficher l'image suivante");
chevronRight.setAttribute("src", "./assets/icons/chevron_right.svg");
lightbox__btnNext.appendChild(chevronRight);
lightbox__content.appendChild(lightbox__btnNext);
//
// medium container: inage / video
const lightbox__medium = document.createElement("div");
lightbox__medium.classList.add("lbMedium");
lightbox__content.appendChild(lightbox__medium);
lightbox__overlay.appendChild(lightbox__content);
//
// title container
const lightbox__title = document.createElement("div");
lightbox__title.classList.add("lbTitle");
const lightbox__text = document.createElement("p");
lightbox__title.appendChild(lightbox__text);
lightbox__content.appendChild(lightbox__title);
// ====== End lightbox structure =============================
myLightbox.appendChild(lightbox__overlay);
//

function shiftMedium(shift) {
    displayLightbox(index += shift)
}

function closeLightbox() {
  myLightbox.style.display = "none";
  // lightboxIsDisplayed = false;
}

function nextSlide() {
  shiftMedium(1);
}

function previousSlide() {
  shiftMedium(-1); 
}

// M O U S E  L I G H T B O X  H A N D L I N G
document.querySelector(".lbBtnClose").addEventListener("click", closeLightbox);
document.querySelector(".lbBtnNext").addEventListener("click", nextSlide);
document
  .querySelector(".lbBtnPrevious")
  .addEventListener("click", previousSlide);


// K E Y B O A R D  L I G H T B O X  H A N D L I N G 
document.body.addEventListener("keydown", (e) => {
  if (myLightbox.style.display === "flex") {
    switch (e.code) {
      case "Escape":
        closeLightbox();
        console.log("event: ", e);
        break;
      case "ArrowLeft":
        previousSlide();
        console.log("event: ", e);
        break;
      case "ArrowRight":
        nextSlide();
        console.log("event: ", e);
        break;
    }
  }
});
