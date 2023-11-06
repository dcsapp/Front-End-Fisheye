//Mettre le code JavaScript lié à la page photographer.html

// const arrayPictures = getPhotographersPictures(id);
// console.log("AAA", arrayPictures);

function sortPicturesBy(arrayPictures, sortCriteria) {
  arrayPictures.sort(function (a, b) {
    if (a[sortCriteria] < b[sortCriteria]) {
      rerturn - 1;
    } else if (a[sortCriteria] > b[sortCriteria]) {
      return 1;
    } else {
      return 0;
    }
  });
}

function checkMediaType(file) {
  let fileExtension = "";
  console.log("file: ", file);
  const videoExtension = ["mp4"];
  const imageExtension = ["png", "jpg", "jpeg"];

  extension = file.split(".").pop();

  if (videoExtension.includes(extension)) {
    return (fileExtension = "video");
  } else if (imageExtension.includes(extension)) {
    return (fileExtension = "image");
  } else {
    return (fileExtension = "File not supported");
  }
}

// A R R A Y  S O R T A T I O N
/* const sortedPicureBy(criteria) =>
pictures.sort(function(a,b) {
    if (`a.${criteria}` < `b.${criteria}`) {
        return -1;
    } else if (`a.${criteria}` > `b.${criteria}`) {
        return 1;
    } else {
        return 0;
    }});
 */

/* 
const dataTest = [
  {
    title: "Picture Test",
    likes: "12",
  },
]; */
//
function thumbnailGalleryTemplate(data) {
  /* const { name, country, city, tagline, price, portrait, id } = data; */
  const { title, likes, image, video } = data;
  /* }; */
  // check if object contains key image or video

  /* const { title, likes, image, video } = data; */

  // const picture = `assets/Photographers_ID_Photos/${portrait}`;

  const pathToPictures = "assets/Photographers_Pictures";
  const photographerName = "Nabeel";

  function getThumbnailCard() {
    // 1 - create the thumbnail card as article
    // Contains 2 main elements
    //  - the thumbnail as link to the lightbox
    //  - the card footer ( title and like (with rating and heart))
    const article = document.createElement("article");
    article.classList.add("thumbImgCard");

    // 2 - create image container with link to lightbox
    const lightboxLink = document.createElement("a");
    article.classList.add("thumbImgCard");
    lightboxLink.setAttribute("href", "#");

    // 2A Check type of media: image or video
    let mediaType = "";
    if (data.hasOwnProperty("image")) {
      mediaType = "image";
      const { title, likes, image } = data;
    }
    if (data.hasOwnProperty("video")) {
      mediaType = "video";
      const { title, likes, video } = data;
    }

    // 2Aa The media is an image
    if (mediaType === "image") {
      const thumbImgCard = document.createElement("img");
      thumbImgCard.classList.add("thumbImgCard__img");
      thumbImgCard.setAttribute(
        "src",
        `${pathToPictures}/${photographerName}/${image}`
      );
      thumbImgCard.setAttribute("alt", image);
      lightboxLink.appendChild(thumbImgCard);
    }
    // 2Ab The media is a video
    if (mediaType === "video") {
      const thumbImgCard = document.createElement("video");
      thumbImgCard.classList.add("thumbImgCard__vid");
      thumbImgCard.setAttribute("controls", "width=350");
      /* thumbImgCard.setAttribute("width", "100%"); */

      // create the video source child
      const videoSource = document.createElement("source");
      videoSource.setAttribute(
        "src",
        `${pathToPictures}/${photographerName}/${video}`
      );
      videoSource.setAttribute("type", "video/mp4");
      thumbImgCard.appendChild(videoSource);
      lightboxLink.appendChild(thumbImgCard);
    }

    // 3 - create "card footer" container for title and like
    const cardFooter = document.createElement("div");
    cardFooter.classList.add("thumbImgCard__footer");

    // 3A - in card footer create title
    const cardFooterTitle = document.createElement("p");
    cardFooterTitle.textContent = title;
    cardFooter.appendChild(cardFooterTitle);

    // 3B - in card footer create "like" container with rating and heart
    const cardFooterLike = document.createElement("div");
    cardFooterLike.classList.add("thumbImgCard__footer__like");
    cardFooter.appendChild(cardFooterLike);

    // 3Ba - add rating in cardFooterLike div
    const cardFooterLikeRating = document.createElement("p");
    cardFooterLikeRating.textContent = likes;
    cardFooterLike.appendChild(cardFooterLikeRating);

    // 3Bb - add heart icon in cardFooterLike div
    const cardFooterLikeHeart = document.createElement("i");
    cardFooterLikeHeart.classList.add("fa-solid");
    cardFooterLikeHeart.classList.add("fa-heart");
    cardFooterLike.appendChild(cardFooterLikeHeart);

    // 4 Build the full article / thumbnail card
    article.appendChild(lightboxLink);
    /* article.appendChild(imgDiv); */
    article.appendChild(cardFooter);
    return article;
  }
  return { title, likes, getThumbnailCard };
}

// R E T R E I V E  D A T A  F R O M  J S O N  F I L E
// ====================================================
//
// 1 - R E T R I E V E  P H O T O G R A P H E R  I D
// Grab the URL query: i.e. ?id=243
const queryString = window.location.search;
// Convert the string into a usable object
const urlParams = new URLSearchParams(queryString);
// Extract the id from the object
const id = urlParams.get("id");

/* 
    "id"
    "photographerId"
    "title"
    "image"
	"likes"
	"date"
	"price"
*/

// 2 - F R O M  I D  R E T R I E V E  P H O T O G R A P H E R  D A T A
// They are requested for the header

// 3 - R E T R I E V E  P I C T U R E S  D A T A
// They are requested to feed thumbnail gallery

const pathToData = "data/";
const pathToPhotographerIdPhoto = "./assets/Photographers_ID_Photos/";




async function getPhotographerPictures(id, sortCriteria) {
  try {
    let response = await fetch(`${pathToData}photographers.json`);
    if (!response.ok) throw new Error("no data found");
    // console.log(response);
    let photographers = await response.json();
    const { media } = photographers;

    // Select pictures list for id
    const pictures = media.filter((pict) => pict.photographerId === id * 1); // *1 to transform string to integer
    console.log("media before sorting: ", pictures);
    const sortedPictures = picturesSortation(pictures, sortCriteria);
    console.log("media after sorting: ", sortedPictures);
    return sortedPictures;
  } catch (err) {
    console.warn(err.message);
  }
}

function picturesSortation(pictures, criteria) {
  const sorted = pictures.sort(function (a, b) {
    if (a[criteria] < b[criteria]) {
      return -1;
    } else if (a[criteria] > b[criteria]) {
      return 1;
    } else {
      return 0;
    }
  });
  return sorted;
}

async function displayThumbnailGallery(sortedPictures) {
  const thumbnailGallerySection = document.querySelector(
    ".thumbnailGallery__section"
  );

  sortedPictures.forEach((picture) => {
    console.log("pictures for each", picture);
    // retreive the thumbnail card model from the template fed by individual picture data
    const thumbnailModel = thumbnailGalleryTemplate(picture);
    // build the thumbnail card
    const pictureCard = thumbnailModel.getThumbnailCard();
    // inject the thumbnail card in the DOM
    console.log("card", pictureCard);
    thumbnailGallerySection.appendChild(pictureCard);
  });
}

async function init(id, criteria) {
  const pictures = await getPhotographerPictures(id, criteria);
  displayThumbnailGallery(pictures);
}

init(id, "title");

// S O R T A T I O N  D R O P D O W N  L I S T
const sortationCriteria = document.getElementById("pictureChoiceCriteria");
sortationCriteria.addEventListener("change", (e) => {
  const criteria = e.target.value;
  console.log("criteria: ", criteria);
  const gallery = document.querySelector(".thumbnailGallery__section");
  gallery.replaceChildren();
  init(id, criteria);
});
/* 
function displayItem() {
  var button = document.querySelector("button");
}

const arrow = document.querySelector(".fa-angle-down");

const picturesSortChoices = document.querySelector(".dropdown"); */
/* picturesSortChoices.addEventListener("click", displayItem); */
/* console.log(picturesSortChoices:first-child) */
/* let dropup = true;
picturesSortChoices.addEventListener("click", function () {
  if (dropup) {
    console.log("UP");
    this.style.height = "170px";
    arrow.style.transform = "rotate(180deg)";
    dropup = false;
  } else {
    this.style.height = "69px";
    arrow.style.transform = "rotate(0deg)";
    dropup = true;
  }
}); */
