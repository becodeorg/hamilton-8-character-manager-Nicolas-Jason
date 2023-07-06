import '../scss/style.scss';

const queryStringId = window.location.search;
const idCharacterUrl = queryStringId.slice(1);
let uploadFile;


function getCharacterById(idCharacter) {
    console.log(idCharacter)
    const getCharacterApi = fetch('https://character-database.becode.xyz/characters/'+ idCharacter);
    getCharacterApi.then(async (response) => {
        console.table(response)
        try {
            const responseCharacter = await response.json();
            console.table(responseCharacter)
            console.log(response)
            const name = responseCharacter.name;
            const shortDesc = responseCharacter.shortDescription;
            const longDesc = responseCharacter.description;
            const image = responseCharacter.image;
            const cardImg = document.querySelector('.img_edit_character');
            const imgBase64ToJs = 'data:image/png;base64,' + image;
            cardImg.src = imgBase64ToJs;
            const cardName = document.querySelector('#name_edit');
            console.log(cardName)
            cardName.value = name;
            const cardShortDesc = document.querySelector('#short_desc_edit');
            cardShortDesc.value = shortDesc;
            const cardDescription = document.querySelector('#description_edit');
            cardDescription.value = longDesc;

        } catch (error) {
            console.log(error)
        }
    })
}

let inputFile = document.querySelector('#file-input-edit')
let fileNameField = document.querySelector('#file-name_edit')

inputFile.addEventListener('change', function(event) {
    const containerFile = document.querySelector('.container_chosen_file_edit');
    const imgPreview = document.createElement('img')
    let uploadFileName = event.target.files[0].name;
    console.log(event.target)
    uploadFile = inputFile.files[0];
    console.log(uploadFile)
    const createDivImg = document.createElement('div');
    createDivImg.setAttribute('class', 'container_img_preview');
    containerFile.insertAdjacentElement('beforeend',createDivImg);
    imgPreview.setAttribute('src','');
    imgPreview.setAttribute('class','img_preview_edit');
    createDivImg.appendChild(imgPreview);
    fileNameField.textContent = uploadFileName;

    if (uploadFile) {
        const imageURL = URL.createObjectURL(uploadFile);
        imgPreview.src = imageURL;
        imgPreview.style.display = 'block';
        imgPreview.style.height = '80px'
        imgPreview.style.width = '120px'
        imgPreview.style.marginTop = '1rem'
    } else {
        imgPreview.src = '';
        imgPreview.style.display = 'none';
    }

})

const btnSubmit = document.querySelector('.btn-save-edit');

btnSubmit.addEventListener('click', async function(event) {
    event.preventDefault();
    const name = document.querySelector('#name_edit').value;
    const shortDesc = document.querySelector('#short_desc_edit').value;
    const completDesc = document.querySelector('#description_edit').value;

    const reader = new FileReader();

        reader.onload = function() {
            const imageData = reader.result;
            sendDataToAPI(imageData);
        };

        reader.readAsDataURL(uploadFile);

    async function sendDataToAPI(imageData) {
        try {
            const sendDataToAPI = await fetch('https://character-database.becode.xyz/characters/'+ idCharacterUrl, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image: imageData.split(',')[1],
                    name: name,
                    shortDescription: shortDesc,
                    description: completDesc
                })
            });
            const data = await sendDataToAPI.json();
            location.replace('/page/redirect.html')
    }   catch (error) {
            console.log(error);
        }
    }
})

getCharacterById(idCharacterUrl);