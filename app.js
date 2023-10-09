'use strict'

document.addEventListener('DOMContentLoaded', function () {
    
    const audio = document.getElementById('audio-player')
    audio.addEventListener('ended', function () {
        audio.currentTime = 0
        audio.play()
    })

    audio.play()
})
