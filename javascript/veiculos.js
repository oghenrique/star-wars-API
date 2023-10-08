'use strict'

function hideLoadingGif() {
    const loadingGif = document.getElementById('loading-gif')
    const loadingText = document.getElementById('loading-text')
    loadingGif.style.display = 'none'
    loadingText.style.display = 'none'
}

function getVehicles(pageNumber) {
    fetch(`https://swapi.dev/api/vehicles/?page=${pageNumber}`)
        .then((response) => response.json())
        .then((responseJson) => {
            hideLoadingGif()
            responseJson.results.forEach((vehicle) => {
                addVehicle(vehicle)
            })

            if (responseJson.next) {
                const nextPageNumber = pageNumber + 1
                getVehicles(nextPageNumber)
            }
        })
        .catch((error) => {
            console.error(error)
        })
}

function addVehicle(vehicle) {
    const vehicleImage = new Image()
    vehicleImage.src = `https://starwars-visualguide.com/assets/img/vehicles/${vehicle.url.replace(/\D/g, '')}.jpg`
    vehicleImage.alt = vehicle.name

    vehicleImage.onerror = function () {
        vehicleImage.src = '../img/erro.png'
        vehicleImage.alt = 'Image not found'
    }

    vehicleImage.onload = function () {
        const vehicleContent = `
            <div class="card">
                <h1>${vehicle.name}</h1>
                <div class="imagem">
                    ${vehicleImage.outerHTML}
                </div>
                <div class="info">
                    <h2>About:</h2>
                    <div class="info-content">
                        <h3>Name: ${vehicle.name}</h3>
                        <h3>Model: ${vehicle.model}</h3>
                        <h3>Manufacturer: ${vehicle.manufacturer}</h3>
                    </div>
                </div>
            </div>
        `

        const sectionGrid = document.getElementsByClassName('card-container')[0]
        sectionGrid.insertAdjacentHTML('beforeEnd', vehicleContent)
    }
}

getVehicles(1)
