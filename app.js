'use strict'

function alternarAudio(audio, iconeAudio, musica) {
    if (audio.paused) {
        audio.play()
        iconeAudio.classList.add('audio-playing')
        musica.classList.add('audio-playing')
    } else {
        audio.pause()
        iconeAudio.classList.remove('audio-playing')
        musica.classList.remove('audio-playing')
    }
}

function reproduzir(iconeAudio, musica) {
    iconeAudio.classList.add('audio-playing')
    musica.classList.add('audio-playing')
}

function pausa(iconeAudio, musica) {
    iconeAudio.classList.remove('audio-playing')
    musica.classList.remove('audio-playing')
}

document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('audioPlayer')
    const iconeAudio = document.getElementById('audioIcon')
    const musica = document.getElementById('customAudio')

    musica.addEventListener('click', function () {
        alternarAudio(audio, iconeAudio, musica)
    })

    audio.addEventListener('play', function () {
        reproduzir(iconeAudio, musica)
    })

    audio.addEventListener('pause', function () {
        pausa(iconeAudio, musica)
    })
})
