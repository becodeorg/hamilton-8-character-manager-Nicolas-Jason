

function getAllCharacter() {
    const getAllCharacterApi = fetch('https://character-database.becode.xyz/characters');
    
    getAllCharacterApi.then(async (response) => {
        try {
            const allCharacter = await response.json()
            allCharacter.forEach(element => {
                
            });
        } catch (error) {
            
        }
    }).catch((err) => {
        console.log(err)
    });
}

getAllCharacter()