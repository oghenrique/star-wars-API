'use strict'

function hideLoadingGif() {
    const loadingGif = document.getElementById('loading-gif')
    const loadingText = document.getElementById('loading-text')
    loadingGif.style.display = 'none'
    loadingText.style.display = 'none'
}

function addPlanet(planet) {
    if (!planet.url) {
        return
    }

    const planetImage = new Image()
    planetImage.src = `https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, '')}.jpg`
    planetImage.alt = planet.name

    planetImage.onerror = function () {
        planetImage.src = '../img/erro.png'
        planetImage.alt = 'Image not found'
    }

    planetImage.onload = function () {
        const planetContent = `
            <div class="card">
                <h1>${planet.name}</h1>
                <div class="imagem">
                    ${planetImage.outerHTML}
                </div>
                <div class="info">
                    <div class="info-content">
                        <p>Terreno: ${planet.terrain}</p>
                        <p>Clima: ${planet.climate}</p>
                        <p>População: ${planet.population}</p>
                    </div>
                </div>
            </div>
        `

        const sectionGrid = document.getElementsByClassName('card-container')[0]
        sectionGrid.insertAdjacentHTML('beforeEnd', planetContent)
    }
}

function getPlanets(pageNumber) {
    fetch(`https://swapi.dev/api/planets/?page=${pageNumber}`)
        .then((response) => response.json())
        .then((responseJson) => {
            hideLoadingGif()
            responseJson.results.forEach((planet) => {
                if (planet.url) {
                    addPlanet(planet)
                }
            })

            if (responseJson.next) {
                const nextPageNumber = pageNumber + 1
                getPlanets(nextPageNumber)
            }
        })
        .catch((error) => console.log(error))
}

getPlanets(1)
