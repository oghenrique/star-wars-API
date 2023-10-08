'use strict'

function hideLoadingGif() {
    const loadingGif = document.getElementById('loading-gif')
    const loadingText = document.getElementById('loading-text')
    loadingGif.style.display = 'none'
    loadingText.style.display = 'none'
}

function getStarships(pageNumber) {
    fetch(`https://swapi.dev/api/starships/?page=${pageNumber}`)
        .then((response) => response.json())
        .then((responseJson) => {
            hideLoadingGif()
            responseJson.results.forEach((starship) => {
                addStarship(starship)
            })

            if (responseJson.next) {
                const nextPageNumber = pageNumber + 1
                getStarships(nextPageNumber)
            }
        })
        .catch((error) => {
            console.error(error)
        })
}

function addStarship(starship) {
    const starshipContent = `
        <div class="card">
            <h1>${starship.name}</h1>
            <div class="imagem">
                <img src="https://starwars-visualguide.com/assets/img/starships/${starship.url.replace(/\D/g, '')}.jpg" 
                alt="${starship.name}" onerror="handleImageError(this)">
            </div>
            <div class="info">
                <h2>About:</h2>
                <div class="info-content">
                    <h3>Name: ${starship.name}</h3>
                    <h3>Model: ${starship.model}</h3>
                    <h3>Passengers: ${starship.passengers}</h3>
                </div>
            </div>
        </div>
    `

    const sectionGrid = document.getElementsByClassName('card-container')[0]
    sectionGrid.insertAdjacentHTML('beforeEnd', starshipContent)
}

function handleImageError(img) {
    img.src = '../img/erro.png'
    img.alt = 'Image not found'
}

getStarships(1)
