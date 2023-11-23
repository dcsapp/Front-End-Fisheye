//Mettre le code JavaScript lié à la page photographer.html

// C O N S T A N T S
// Paths to assets
const pathTo_Photographers_Pictures = "./assets/Photographers_Pictures";
const pathTo_Photographers_ID_Photos = "./assets/Photographers_ID_Photos/";
// Path to JSON data
const pathTo_JSON_Data = "./data/";

let sortedPictures = [];
let mediumList = [];

// Get dir name where photographer pictures are located
// Dir name is based on first nane without "-" if any and replaced by " "
function getPicturesDirName(photographerName) {
  const name = photographerName.split(" ")[0];
  console.log("name", name);
  return name.includes("-") ? name.replace("-", " ") : name;
}

// Pictures sortation default criteria when is displayed first time
const sortationCriteria = "likes";

// Pictures likes list to persinst any like update
picturesLikeStatus = [];

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

// P H O T O G R A P H E R  H E A D E R
// ========================================================================
function displayHeaderPhotographer(data) {
  console.log("display header: ", data);
  const { id, name, country, city, tagline, price, portrait } = data;

  function createPhotographerHeader() {
    // 1 - Photographer header container
    const photographerHeader = document.createElement("div");
    photographerHeader.classList.add("photographerHeader");

    // 2 -Photographer profile
    const photographerProfile = document.createElement("div");
    photographerProfile.classList.add("photographerProfile");

    const photographerProfile__name = document.createElement("h1");
    photographerProfile__name.classList.add("photographerProfile__name");
    photographerProfile__name.textContent = name;

    const photographerProfile__location = document.createElement("p");
    photographerProfile__location.classList.add(
      "photographerProfile__location"
    );
    photographerProfile__location.textContent = `${city}, ${country}`;

    const photographerProfile__tagline = document.createElement("p");
    photographerProfile__tagline.classList.add("photographerProfile__tagline");
    photographerProfile__tagline.textContent = tagline;

    photographerProfile.appendChild(photographerProfile__name);
    photographerProfile.appendChild(photographerProfile__location);
    photographerProfile.appendChild(photographerProfile__tagline);

    photographerHeader.appendChild(photographerProfile);

    // Contact button
    const contact_button = document.createElement("button");
    contact_button.classList.add("contact_button");
    contact_button.setAttribute("onclick", "displayModal()");
    contact_button.textContent = "Contactez-moi";

    photographerHeader.appendChild(contact_button);

    // Photographer picture Id
    const photographerPictureId = document.createElement("div");
    photographerPictureId.classList.add("photographerPictureId");

    const photographerPictureId__img = document.createElement("img");
    photographerPictureId__img.classList.add("photographerPictureId__img");

    photographerPictureId__img.setAttribute(
      "src",
      `${pathTo_Photographers_ID_Photos}${portrait}`
    );
    photographerPictureId.setAttribute("alt", name);

    photographerPictureId.appendChild(photographerPictureId__img);
    photographerHeader.appendChild(photographerPictureId);

    return photographerHeader;
  }
  return { createPhotographerHeader };
}

// S O R T A T I O N  D R O P D O W N  L I S T
// ========================================================================
const select = document.querySelector(".select");
const select_menu = document.querySelector(".select-menu");
const options_list = document.querySelector(".options-list");
const options = document.querySelectorAll(".option");

// show / hide criterias list
select.addEventListener("click", () => {
  options_list.classList.toggle("active");
  select.querySelector(".fa-angle-down").classList.toggle("rotate-arrow");
});

options.forEach((option) =>
  option.addEventListener("click", () => {
    options.forEach((option) => {
      option.classList.remove("selected");
    });
    options.forEach((option) => {
      option.classList.remove("hide");
    });
    select.querySelector("span").innerHTML = option.innerHTML;
    option.classList.add("selected");
    option.classList.add("hide");
    options_list.classList.toggle("active");
    const sortationCriteria = option.getAttribute("value");
    console.log("Option", id, sortationCriteria);

    /* retreiveAPIData(id, sortationCriteria); */
    // displayThumbnailGallery(pictures);
    /* init(id, selectedCriteria); */
    createPhotographerGallery(id, sortationCriteria);
    select.querySelector(".fa-angle-down").classList.toggle("rotate-arrow");
  })
);

function initSortationCriteria(criteria) {
  // criteria variable is the JSON field used to select and sort pictures (likes / date / title)
  // loop through all options to:
  // 1 - add flag "selected"
  // 2 - setup the in use criteria for the user ( Popularité / Date / Titre)
  // 3 - hide the criteria from the dropdown list
  options.forEach((option) => {
    if (option.getAttribute("value") === criteria) {
      option.classList.add("selected");
      select.querySelector("span").innerHTML = option.innerHTML;
      option.classList.add("hide");
    }
  });
}

// P I C T U R E S  G A L L E R Y
// ========================================================================
function thumbnailGalleryTemplate(data, index) {
  /* const { name, country, city, tagline, price, portrait, id } = data; */
  const { title, likes, image, video, dirName } = data;

  // get directory name
  // const photographerName = document.querySelector(photographerProfile__name);
  // console.log("photographerName", photographerName.value);

  function getThumbnailCard() {
    // 1 - create the thumbnail card as article
    // Contains 2 main elements
    //  - the thumbnail as link to the lightbox
    //  - the card footer ( title and like (with rating and heart))
    const article = document.createElement("article");
    article.classList.add("thumbImgCard");

    // 2 - create image container with link to lightbox
    /* const lightboxLink = document.createElement("a");
    article.classList.add("thumbImgCard");
    lightboxLink.setAttribute("href", "#");
    lightboxLink.classList.add("medium");
    lightboxLink.setAttribute("onclick", "return displayLightbox()"); */

    /*  */
    const lightboxLink = document.createElement("div");
    lightboxLink.classList.add("medium");
    lightboxLink.dataset.index= index;
    /*  */

    // 2A Check type of media: image or video
    let mediaType = "";
    if (data.hasOwnProperty("image")) {
      mediaType = "image";
      lightboxLink.dataset.mediumType = "image";
      const { title, likes, image } = data;
    }
    if (data.hasOwnProperty("video")) {
      mediaType = "video";
      lightboxLink.dataset.mediumType = "video";
      const { title, likes, video } = data;
    }

    // 2Aa The media is an image
    if (mediaType === "image") {
      const thumbImgCard = document.createElement("img");
      thumbImgCard.classList.add("thumbImgCard__img"); // , "azert"
      //

      thumbImgCard.setAttribute(
        "src",
        `${pathTo_Photographers_Pictures}/${dirName}/${image}`
      );
      thumbImgCard.setAttribute("alt", title);
      lightboxLink.appendChild(thumbImgCard);
    }
    // 2Ab The media is a video
    if (mediaType === "video") {
      const thumbImgCard = document.createElement("video");
      thumbImgCard.classList.add("thumbImgCard__vid"); // , "azert"
      // thumbImgCard.setAttribute("controls", "width=350");
      /* thumbImgCard.setAttribute("width", "100%"); */

      // create the video source child
      const videoSource = document.createElement("source");
      videoSource.setAttribute(
        "src",
        `${pathTo_Photographers_Pictures}/${dirName}/${video}`
      );
      videoSource.setAttribute("type", "video/mp4");
      videoSource.setAttribute("alt", title);
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
    cardFooterLikeHeart.classList.add("addLikes");
    cardFooterLikeHeart.setAttribute("data-oneLikeAdded", "false");
    cardFooterLike.appendChild(cardFooterLikeHeart);

    // 4 Build the full article / thumbnail card
    article.appendChild(lightboxLink);
    /* article.appendChild(imgDiv); */
    article.appendChild(cardFooter);
    return article;
  }
  return { getThumbnailCard };
  /* return { title, likes, getThumbnailCard }; */
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

// 2 - F R O M  I D  R E T R I E V E
//              A N D  D I S P L A Y  P H O T O G R A P H E R  D A T A
async function createPhotographerHeader(id) {
  try {
    let response = await fetch(`${pathTo_JSON_Data}photographers.json`);
    if (!response.ok) throw new Error("no data found");

    let dataJSON = await response.json();
    console.log("dataJSON: ", dataJSON);

    // Photographers header
    // ==============================================
    const { photographers } = dataJSON;
    console.log("photographers: ", photographers);
    // Select photographer data
    const photographerData = photographers.filter(
      (photographer) => photographer.id === id * 1
    ); // *1 to transform string to integer
    console.log("photographerData: ", photographerData[0].name);

    // Extract photographer name to create the dirName
    const dirName = getPicturesDirName(photographerData[0].name);

    displayHeader(photographerData[0]);
  } catch (err) {
    console.warn(err.message);
  }
}
// 3 - R E T R I E V E  P I C T U R E S  D A T A
// They are requested to feed thumbnail gallery
// pictures / video list is retreived and name of photographer
// dirName is created and added to picture object
// pictures are sorted according to sortCreteria
async function createPhotographerGallery(id, sortCriteria) {
  try {
    let response = await fetch(`${pathTo_JSON_Data}photographers.json`);
    if (!response.ok) throw new Error("no data found");
    let data = await response.json();

    const { photographers, media } = data; //photographers;
    // Retreive photographer name from ID
    console.log("photo", photographers);
    const photographerName = photographers.filter(
      (photographer) => photographer.id === id * 1
    ); // *1 to transform string to integer
    console.log("photographerData22: ", photographerName[0].name);

    // Extract photographer name to create the dirName
    const dirName = getPicturesDirName(photographerName[0].name);
    console.log("dirName: ", dirName);

    // Retreive price
    const photographerPrice = photographerName[0].price;

    // Select pictures / video list for id
    const pictures = media.filter((pict) => pict.photographerId === id * 1); // *1 to transform string to integer
    console.log("media before sorting: ", pictures);

    // Add dirName for each picture / video object
    pictures.forEach((picture) => (picture.dirName = dirName));

    // sort pictures / video according to sortCreteria
    sortedPictures = picturesSortation(pictures, sortCriteria);
        console.log("sortedPictures", sortedPictures)
    // L I K E S  H A N D L I N G
    // Create a list of likes of selected picture
    // if (picturesLikeStatus.length === 0) {
    // Create initial list
    /*     pictures.forEach((picture) => {
        picturesLikeStatus.push({
          pictId: picture.id,
          pictNbr: picture.likes,
          updated: "false",
        });
      });
      console.log("like list: ", picturesLikeStatus);
    } else {
        console.log("like list not empty: ", picturesLikeStatus);
      alert(picturesLikeStatus);
    }

 */

    // Calculate likes number
    let totalLikesNumber = 0;
    pictures.forEach((picture) => {
      totalLikesNumber += picture.likes;
    });
    console.log("likenumber: ", totalLikesNumber);
    const ratesField = document.querySelector(".rate");
    ratesField.textContent = totalLikesNumber;

    const rate = `${photographerPrice} \u20AC / jour`; // euro entity
    const priceField = document.querySelector(".price");
    priceField.textContent = rate;

    displayThumbnailGallery(sortedPictures);

    function addOneLike(event) {
      // Get the current picture heart
      // and acces to selected likes number => previousElementSibling.innerText
      // convert to an integer *1
      // and add 1   -oneLikeAdded
      const isUpdated = event.currentTarget.dataset.onelikeadded; // datasetlowercase
      if (isUpdated === "true") {
      } else {
        const updatedLikeRate =
          event.currentTarget.previousElementSibling.innerText * 1 + 1;
        // Display updated image like number
        event.currentTarget.previousElementSibling.innerText = updatedLikeRate;
        // Prevent further update
        event.currentTarget.dataset.onelikeadded = "true";
        // Update total like
        totalLikesNumber += 1;
        // Update total likes display
        ratesField.textContent = totalLikesNumber;
        // Just for fun: icone changed when picture has been clicked
        event.currentTarget.classList.remove("fa-heart");
        event.currentTarget.classList.add("fa-heart-circle-plus");
      }
    }

    document.querySelectorAll(".addLikes").forEach((addLikes) => {
      addLikes.addEventListener("click", addOneLike);

      // Photographer name in modal
      const modalName = document.querySelector(".modalName");
      modalName.textContent = photographerName[0].name;
    });


// +++++++++++++++ List of picture  ++++++++++++++++++

    mediumList = Array.from(document.querySelectorAll(".medium"));
    console.log("Array mediumList: ", Array.from(mediumList));
    /* 
    console.log('mediumList array image: ', Array.from(mediumList)[0].firstChild['src']);
    console.log('Media type -> image: ', Array.from(mediumList)[0].attributes["data-medium-type"].value);
    console.log('Media type -> video: ', Array.from(mediumList)[9].attributes["data-medium-type"].value);
    console.log('Media type -> Alt: ', Array.from(mediumList)[0].lastElementChild["alt"]);
    console.log('mediumList array video: ', Array.from(mediumList)[9]);
    console.log('mediumList array video: ', Array.from(mediumList)[9].firstChild.firstElementChild['src']);
     */
    // Add event listener to each image / video to trigger lightbox
    document.querySelectorAll(".medium").forEach((medium, index) => {
      medium.addEventListener("click", getFirstMedium);// displayLightbox);
      //  medium.addEventListener("click",launchLightbox);// displayLightbox);
      console.log("medium: ", medium, index);
    });
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++



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

// async function displayHeader(data) {
function displayHeader(data) {
  const headerSection = document.querySelector(".header__section");
  const headerTemplate = displayHeaderPhotographer(data);
  const headerGallery = headerTemplate.createPhotographerHeader();
  headerSection.appendChild(headerGallery);
}

async function displayThumbnailGallery(sortedPictures) {
  const thumbnailGallerySection = document.querySelector(
    ".thumbnailGallery__section"
  );

  // remove content before adding images according to sortation criteria
  thumbnailGallerySection.replaceChildren();

  // gallery building
  sortedPictures.forEach((picture, index) => {
    console.log("pictures for each", picture);
    // retreive the thumbnail card model from the template fed by individual picture data
    const thumbnailModel = thumbnailGalleryTemplate(picture, index);
    // build the thumbnail card
    const pictureCard = thumbnailModel.getThumbnailCard();
    // inject the thumbnail card in the DOM
    thumbnailGallerySection.appendChild(pictureCard);
  });
}

createPhotographerHeader(id);
initSortationCriteria(sortationCriteria);
createPhotographerGallery(id, sortationCriteria);

// L I K E S  H A N D L I N G
const likeCard = document.querySelectorAll(".addLikes");
console.log("like cards: ", likeCard);

// F O R M
/* const modalName = document.querySelector(".madalName");
modalName.innerText = name; */

// ======== Lightbox ===============================

console.log("=============================");
//           console.log ("Sorted Pictures", sortedPictures[5]);
// test_index = sortedPictures.findIndex.call  //sortedPictures.indexOf();
//           const test_index = sortedPictures.map(e => e.id).indexOf(2523434634);
//           console.log ("index in Pictures", test_index);


const tyty = document.getElementsByClassName("medium");
// const imageLocation = tyty[0].src//.children[0].childNodes[0].src;
console.log("tyty: ", tyty);

console.log("=============================");
//  document.querySelectorAll(".azert").forEach((azert) => {
//    azert.addEventListener("click", displayLightbox)
//    console.log('azert: ', azert.src)});

//    const imageLocation = tyty[2].children[0].childNodes[0].src;//[1];//.getAttribute("src");
//    console.log('imageLocation: ', imageLocation.split('/assets/').pop());

/* 
        document.querySelectorAll(".medium").forEach((medium) => {
            medium.addEventListener("click", displayLightbox)
            console.log('medium: ', medium)});
             */
// ======== Lightbox E N D ===============================
