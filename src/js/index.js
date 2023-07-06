import '../scss/style.scss';

const allCharacterContainer = document.querySelector('.container_character_list');
const getBody = document.querySelector('body');
const getOverlay = document.querySelector('#overlay');
let idCharacter;

function getAllCharacter() {
    const getAllCharacterApi = fetch('https://character-database.becode.xyz/characters');
    
    getAllCharacterApi.then(async (response) => {
        try {
            const allCharacter = await response.json()
            allCharacter.forEach(element => {
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
                createBtn.setAttribute('data-id', element.id);
                createParagraph.insertAdjacentElement('afterend', createBtn);
                // getIdOfCharacter(getAllBtn);
            });
            const getAllBtn = document.querySelectorAll('.btn');
                removeReloadBtn(getAllBtn);
        } catch (error) {
            console.log('ERROR', error);
        }
    }).catch((err) => {
        console.log(err)
    });
}

function getCharacterById(idCharacter) {
    console.log(idCharacter)
    const getCharacterApi = fetch('https://character-database.becode.xyz/characters/'+ idCharacter);

    getCharacterApi.then(async (response) => {
        try {
            const responseCharacter = await response.json();
            const name = responseCharacter.name;
            const shortDesc = responseCharacter.shortDescription;
            const longDesc = responseCharacter.description;
            const image = responseCharacter.image;
            const cardImg = document.querySelector('.card-img-overlay');
            const imgBase64ToJs = 'data:image/png;base64,' + image;
            cardImg.src = imgBase64ToJs;
            const cardName = document.querySelector('.card-name-overlay');
            cardName.textContent = name;
            const cardShortDesc = document.querySelector('.short-desc');
            cardShortDesc.textContent = shortDesc;
            const cardDescription = document.querySelector('.description');
            cardDescription.textContent = longDesc;

        } catch (error) {
            console.log(error)
        }
    })
}

function removeReloadBtn(btn) {
    const clickHandler = function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('data-id');
        idCharacter = targetId;
        on();
        getCharacterById(targetId);
    };

    btn.forEach(elem => {
        elem.addEventListener('click', clickHandler);
    });
}

const articleElement = document.querySelector('#overlay article');

articleElement.addEventListener('click', function(event) {
    event.stopPropagation();
});


getOverlay.addEventListener('click', function(event) {
    off()
})

function on() {
  document.getElementById("overlay").style.display = "block";

}

function off() {
  document.getElementById("overlay").style.display = "none";
}

const btnEdit = document.querySelector('.btn-edit');

btnEdit.addEventListener('click', function(event) {
   location.replace(`/page/edit_character.html?${idCharacter}`)
})

async function deleteCharacter() {
       
    try {

        if (confirm('are you sure you want to delete the character?')) {

            const response = await fetch('https://character-database.becode.xyz/characters/' + idCharacter, {
                method: "DELETE",
            });
    
            if (response.ok) {
                location.replace('/page/redirect.html')
            } else {
                throw new Error("Échec de la suppression du personnage");
            }
        } else {
            console.log('ABORDED !')
        }
    } catch (error) {
        console.log("Erreur lors de la suppression !", error);
    }
}


const btnDelete = document.querySelector('.btn-del');

btnDelete.addEventListener('click', function(event) {
    event.preventDefault();
    deleteCharacter()
    console.log('OK')
})

getAllCharacter()
