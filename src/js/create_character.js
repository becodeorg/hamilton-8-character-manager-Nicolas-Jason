import '../scss/style.scss';

let url = window.location.href;
console.log(url, 'URL')
const btnSubmit = document.querySelector('.btn-create-send');
let inputFile = document.querySelector('#file-input')
let fileNameField = document.querySelector('#file-name')

inputFile.addEventListener('change', function(event) {
    const containerFile = document.querySelector('.container_upload_file');
    const imgPreview = document.createElement('img')
    let uploadFileName = event.target.files[0].name;
    let uploadFile = inputFile.files[0];
    console.log(uploadFile)
    const createDivImg = document.createElement('div');
    containerFile.insertAdjacentElement('beforeend',createDivImg)
    imgPreview.setAttribute('src','');
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


btnSubmit.addEventListener('click', async function(event) {
    event.preventDefault();
    const image = document.querySelector('#file-input').files[0];
    const name = document.querySelector('#characterName').value;
    const shortDesc = document.querySelector('#shortDesc').value;
    const completDesc = document.querySelector('#completDesc').value;

    const reader = new FileReader();

        reader.onload = function() {
            const imageData = reader.result;
            sendDataToAPI(imageData);
        };

        reader.readAsDataURL(image);

    async function sendDataToAPI(imageData) {
        try {
            const sendDataToAPI = await fetch('https://character-database.becode.xyz/characters', {
                method: "POST",
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
            console.table('DATA OK', data);
            location.replace('/page/redirect.html');
    }   catch (error) {
            console.log(error);
        }
    }
})