'use strict'

function hideLoadingGif() {
    const loadingGif = document.getElementById('loading-gif')
    const loadingText = document.getElementById('loading-text')
    loadingGif.style.display = 'none'
    loadingText.style.display = 'none'
}

function getSpecies(pageNumber) {
    fetch(`https://swapi.dev/api/species/?page=${pageNumber}`)
        .then((response) => response.json())
        .then((responseJson) => {
            hideLoadingGif()
            responseJson.results.forEach((species) => {
                addSpecies(species)
            })

            if (responseJson.next) {
                const nextPageNumber = pageNumber + 1
                getSpecies(nextPageNumber)
            }
        })
        .catch((error) => {
            console.error(error)
        })
}

function addSpecies(species) {
    const speciesImage = new Image()
    speciesImage.src = `https://starwars-visualguide.com/assets/img/species/${species.url.replace(/\D/g, '')}.jpg`
    speciesImage.alt = species.name

    speciesImage.onerror = function () {
        speciesImage.src = '../img/erro.png'
        speciesImage.alt = 'Image not found'
    }

    speciesImage.onload = function () {
        const speciesContent = `
            <div class="card">
                <h1>${species.name}</h1>
                <div class="imagem">
                    ${speciesImage.outerHTML}
                </div>
                <div class="info">
                    <h2>About:</h2>
                    <div class="info-content">
                        <h3>Name: ${species.name}</h3>
                        <h3>Classification: ${species.classification}</h3>
                        <h3>Language: ${species.language}</h3>
                    </div>
                </div>
            </div>
        `

        const sectionGrid = document.getElementsByClassName('card-container')[0]
        sectionGrid.insertAdjacentHTML('beforeEnd', speciesContent)
    }
}

getSpecies(1)
