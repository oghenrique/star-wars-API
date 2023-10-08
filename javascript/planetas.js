'use strict'

function hideLoadingGif() {
    const loadingGif = document.getElementById('loading-gif')
    const loadingText = document.getElementById('loading-text')
    loadingGif.style.display = 'none'
    loadingText.style.display = 'none'
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

function addPlanet(planet) {
    if (!planet.url) {
        return
    }

    const planetContent = `
        <div class="card">
            <h1>${planet.name}</h1>
            <div class="imagem">
                <img src="https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, '')}.jpg" 
                alt="${planet.name}">
            </div>
            <div class="info">
                <h2>About:</h2>
                <div class="info-content">
                    <h3>Name: ${planet.name}</h3>
                    <h3>Climate: ${planet.climate}</h3>
                    <h3>Population: ${planet.population}</h3>
                </div>
            </div>
        </div>
    `

    const sectionGrid = document.getElementsByClassName('card-container')[0]
    sectionGrid.insertAdjacentHTML('beforeEnd', planetContent)
}

getPlanets(1)
