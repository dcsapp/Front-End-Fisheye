// L I G H T  B O X
// ============================================================






function lightboxHandleMediumContent() {
  const image = "./assets/Photographers_Pictures/Marcel/Travel_Tower.jpg";
  const video =
    "./assets/Photographers_Pictures/Tracy/Art_Wooden_Horse_Sculpture.mp4";
  const medium = "image";

  function createMediumContent() {
    if (medium === "image") {
      const lightbox__image = document.createElement("img");
      lightbox__image.classList.add("lbImage");
      lightbox__image.setAttribute("src", image);
      return lightbox__image;
    }
    if (medium === "video") {
      const lightbox__video = document.createElement("video");
      lightbox__video.setAttribute("controls", "width=350");
      const videoSource = document.createElement("source");
      videoSource.setAttribute("src", video);
      videoSource.setAttribute("type", "video/mp4");
      lightbox__video.appendChild(videoSource);
      return lightbox__video;
    }
    return createMediumContent
  }
}



const myLightbox = document.getElementById("myLightbox");

// lightbox structure
const lightbox__overlay = document.createElement("div");
lightbox__overlay.classList.add("lbOverlay");
//
const lightbox__content = document.createElement("div");
lightbox__content.classList.add("lbContent");
//
// if it is an image displayed in lightbox
const lightbox__image = document.createElement("img");
lightbox__image.classList.add("lbImage");
lightbox__image.setAttribute(
  "src",
  "./assets/Photographers_Pictures/Marcel/Travel_Tower.jpg"
);
lightbox__content.appendChild(lightbox__image);
//
// if video is displayed in lightbox
// const lightbox__video = document.createElement("video");
/* lightbox__image.classList.add('lbVideo');
lbVideo
lightbox__image.setAttribute("src", "./assets/Photographers_Pictures/Ellie Rose/Sport_Tricks_in_the_air.mp4");
lightbox__content.appendChild(lightbox__image); */
//
//
// close button
const lightbox__btnClose = document.createElement("div");
// lightbox__btnClose.classList.add('lbBtnClose');
const cross = document.createElement("img");
cross.classList.add("lbBtnClose");
cross.setAttribute("src", "./assets/icons/close.svg");
lightbox__btnClose.appendChild(cross);
lightbox__content.appendChild(lightbox__btnClose);
//
// previous arrow / button
const lightbox__btnPrevious = document.createElement("div");
lightbox__btnPrevious.classList.add("lbBtnPrevious");
const chevronLeft = document.createElement("img");
chevronLeft.setAttribute("src", "./assets/icons/chevron_left.svg");
lightbox__btnPrevious.appendChild(chevronLeft);
lightbox__content.appendChild(lightbox__btnPrevious);
//
// next arrow / button
const lightbox__btnNext = document.createElement("div");
lightbox__btnNext.classList.add("lbBtnNext");
const chevronRight = document.createElement("img");
chevronRight.setAttribute("src", "./assets/icons/chevron_right.svg");
lightbox__btnNext.appendChild(chevronRight);
lightbox__content.appendChild(lightbox__btnNext);
//
lightbox__overlay.appendChild(lightbox__content);
// ====== End lightbox structure =============================

myLightbox.appendChild(lightbox__overlay);




function launchLightbox(e) {
    // get the picture clicked in the gallery and display it in lightbox
    console.log("Target: ", e.currentTarget.children); // , pathTo_Photographers_Pictures);
    displayLightbox( e.currentTarget.children[0].src);
    // const clickedPicture = e.currentTarget.children[0].src;
    myLightbox.style.display = "flex";
}
function displayLightbox(image) {
    lightbox__image.setAttribute("src", image);  
    // test_index = sortedPictures.findIndex.call  //sortedPictures.indexOf();
    //           const test_index = sortedPictures.map(e => e.id).indexOf(2523434634);
    //           console.log ("index in Pictures", test_index);
}

function closeLightbox() {
  myLightbox.style.display = "none";
}

function nextSlide() {
  console.log("Next");
  lightbox__image.setAttribute(
    "src",
    "./assets/Photographers_Pictures/Marcel/Travel_OpenMountain.jpg"
  );
}

const test1 =
  "./assets/Photographers_Pictures/Tracy/Art_Wooden_Horse_Sculpture.mp4";
const test2 = "./assets/Photographers_Pictures/Marcel/Travel_Tower.jpg";

function previousSlide() {
  console.log("Previous");
  lightbox__image.setAttribute("src", test2);
}

document.querySelector(".lbBtnClose").addEventListener("click", closeLightbox);
document.querySelector(".lbBtnNext").addEventListener("click", nextSlide);
document
  .querySelector(".lbBtnPrevious")
  .addEventListener("click", previousSlide);
