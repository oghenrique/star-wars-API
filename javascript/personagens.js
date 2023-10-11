'use strict'

function hideLoadingGif() {
    const loadingGif = document.getElementById('loading-gif')
    const loadingText = document.getElementById('loading-text')
    loadingGif.style.display = 'none'
    loadingText.style.display = 'none'
}

function getCharacters(pageNumber) {
    fetch(`https://swapi.dev/api/people/?page=${pageNumber}`)
        .then((response) => response.json())
        .then((responseJson) => {
            hideLoadingGif()
            responseJson.results.forEach((character) => {
                addCharacter(character)
            })

            if (responseJson.next) {
                const nextPageNumber = pageNumber + 1
                getCharacters(nextPageNumber)
            }
        })
        .catch((error) => {
            console.error(error)

        })
}

function addCharacter(character) {
    const characterImage = new Image();
    characterImage.src = `https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, '')}.jpg`
    characterImage.alt = character.name;

    characterImage.onerror = function () {
        characterImage.src = '../img/erro.png'
        characterImage.alt = 'Image not found'
    }

    characterImage.onload = function () {
        const characterContent = `
            <div class="card">
                <h1>${character.name}</h1>
                <div class="imagem">
                    ${characterImage.outerHTML}
                </div>
                <div class="info">
                    <div class="info-content">
                        <p>Gênero: ${character.gender}</p>
                        <p>Ano Nascimento: ${character.birth_year}</p>
                        <p>Altura: ${character.height}cm</p>
                    </div>
                </div>
            </div>
        `

        const sectionGrid = document.getElementsByClassName('card-container')[0]
        sectionGrid.insertAdjacentHTML('beforeEnd', characterContent)
    }
}

getCharacters(1)
