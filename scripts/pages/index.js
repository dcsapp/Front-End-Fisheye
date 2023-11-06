const pathToData = "data/";
const pathToPhotographerIdPhoto = "../assets/Photographers_ID_Photos/";

async function getPhotographers() {
  try {
    let response = await fetch(`${pathToData}photographers.json`);
    if (!response.ok) throw new Error("no data found");
    let photographers = await response.json();
    return photographers;
  } catch (err) {
    console.warn(err.message);
  }
}
/* 
const photographerIdFields = [
  "name",
  "id",
  "city",
  "country",
  "tagline",
  "price",
  "portrait",
];
 */
/* 
    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        let photographers = [
            {
                "name": "Ma data test",
                "id": 1,
                "city": "Paris",
                "country": "France",
                "tagline": "Ceci est ma data test",
                "price": 400,
                "portrait": "account.png"
            },
            {
                "name": "Autre data test",
                "id": 2,
                "city": "Londres",
                "country": "UK",
                "tagline": "Ceci est ma data test 2",
                "price": 500,
                "portrait": "account.png"
            },
        ]
        // et bien retourner le tableau photographers seulement une fois récupéré
        return ({
            photographers: [...photographers, ...photographers, ...photographers]})
    }
 */
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
  console.log("photo", photographers);
}

init();
