function photographerTemplate(data) {
    const { name, country, city, tagline, price, portrait, id } = data;

   
    const picture = `assets/Photographers_ID_Photos/${portrait}`

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
     
            const linkToPhotographerPage = document.createElement('a');
            linkToPhotographerPage.setAttribute("href", `photographer.html?id=${id}&name=${name}`)

            const img = document.createElement( 'img' );
                img.setAttribute("src", picture);
                img.setAttribute("alt", name);
            
                linkToPhotographerPage.appendChild(img);

            const h2 = document.createElement( 'h2' );
            h2.textContent = name;
            linkToPhotographerPage.appendChild(h2);
        
        const p_city = document.createElement('p');
        p_city.classList.add("p_city");
        p_city.textContent = city +', '+country;

        const p_tagline = document.createElement('p');
        p_tagline.classList.add("p_tagline")
        p_tagline.textContent = tagline;

        const p_price = document.createElement('p');
        p_price.classList.add("p_price")
        p_price.innerHTML = price+'<span>&euro;</span>/jour';

        article.appendChild(linkToPhotographerPage);
        article.appendChild(p_city);
        article.appendChild(p_tagline);
        article.appendChild(p_price);
        return (article);
    }
    console.log('template: ', name, picture)
    return { name, picture, getUserCardDOM }
}