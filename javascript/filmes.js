'use strict'

function hideLoadingGif() {
    const loadingGif = document.getElementById('loading-gif')
    const loadingText = document.getElementById('loading-text')
    loadingGif.style.display = 'none'
    loadingText.style.display = 'none'
}

function getFilms(pageNumber) {
    fetch(`https://swapi.dev/api/films/?page=${pageNumber}`)
        .then((response) => response.json())
        .then((responseJson) => {
            hideLoadingGif()
            responseJson.results.forEach((film) => {
                addFilm(film)
            })

            if (responseJson.next) {
                const nextPageNumber = pageNumber + 1
                getFilms(nextPageNumber)
            }
        })
        .catch((error) => {
            console.error(error)
        })
}

function addFilm(film) {
    const filmImage = new Image()
    filmImage.src = `https://starwars-visualguide.com/assets/img/films/${film.url.replace(/\D/g, '')}.jpg`
    filmImage.alt = film.title

    filmImage.onerror = function () {
        filmImage.src = '../img/erro.png'
        filmImage.alt = 'Image not found'
    }

    filmImage.onload = function () {
        const filmContent = `
            <div class="card">
                <h1>${film.title}</h1>
                <div class="imagem">
                    ${filmImage.outerHTML}
                </div>
                <div class="info">
                    <h2>About:</h2>
                    <div class="info-content">
                        <h3>Title: ${film.title}</h3>
                        <h3>Director: ${film.director}</h3>
                        <h3>Release Date: ${film.release_date}</h3>
                    </div>
                </div>
            </div>
        `

        const sectionGrid = document.getElementsByClassName('card-container')[0]
        sectionGrid.insertAdjacentHTML('beforeEnd', filmContent)
    }
}

getFilms(1)