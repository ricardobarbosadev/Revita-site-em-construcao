window.va =
  window.va ||
  function () {
    (window.vaq = window.vaq || []).push(arguments);
  };

document.addEventListener("DOMContentLoaded", function () {
  console.log("Página carregada. Site em construção!");
});

document.getElementById("year").textContent = new Date().getFullYear();
