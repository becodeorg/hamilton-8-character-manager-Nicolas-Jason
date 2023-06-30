const allCharacterContainer = document.querySelector('.container_character_list')

function getAllCharacter() {
    const getAllCharacterApi = fetch('https://character-database.becode.xyz/characters');
    
    getAllCharacterApi.then(async (response) => {
        try {
            const allCharacter = await response.json()
            allCharacter.forEach(element => {
                console.log(element)
                const imgBase64ToJs = 'data:image/png;base64,' + element.image;
                const createArticle = document.createElement('article');
                createArticle.setAttribute('class', 'character_list_card');

                allCharacterContainer.append(createArticle);
                const createFigure = document.createElement('figure');              
                createArticle.append(createFigure);

                const createImgInFigure = document.createElement('img')
                createImgInFigure.setAttribute('src', imgBase64ToJs);
                createFigure.append(createImgInFigure);

                const createDivTextContent = document.createElement('div');
                createDivTextContent.setAttribute('class', 'card_text_content');
                createFigure.insertAdjacentElement('afterend', createDivTextContent);

                const createNameCharacter = document.createElement('h3');
                const nameTextNode = document.createTextNode(element.name);
                createNameCharacter.appendChild(nameTextNode);
                createDivTextContent.appendChild(createNameCharacter);

                const createParagraph = document.createElement('p');
                const paragraphTextNode = document.createTextNode(element.shortDescription);
                createParagraph.appendChild(paragraphTextNode);
                createNameCharacter.insertAdjacentElement('afterend', createParagraph);

                const createBtn = document.createElement('a');
                createBtn.setAttribute('class', 'btn');
                createBtn.setAttribute('href', '');
                createParagraph.insertAdjacentElement('afterend', createBtn);
            });
        } catch (error) {
            console.log('ERROR', error);
        }
    }).catch((err) => {
        console.log(err)
    });
}

getAllCharacter()


const link = document.querySelectorAll('.btn');

link.forEach(elem => {
  elem.addEventListener('click', function(event) {
    event.preventDefault();
  });
});