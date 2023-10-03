'use strict'
const scrollText = document.querySelector(".scroll-text");

scrollText.addEventListener("animationiteration", () => {
  scrollText.style.animation = "none"; // Remove a animação
  void scrollText.offsetWidth; // Trigger a reflow para reiniciar a animação imediatamente
  scrollText.style.animation = "scroll 30s linear infinite"; // Reaplica a animação
});
