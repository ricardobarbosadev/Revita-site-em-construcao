// Meta de rastreamento
window.va =
  window.va ||
  function () {
    (window.vaq = window.vaq || []).push(arguments);
  };

// Espera o DOM estar completamente carregado
document.addEventListener("DOMContentLoaded", function () {
  console.log("Página carregada. Site em construção!");

  // Atualiza o ano automaticamente
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // número de WhatsApp vindo do .env
  const phone = import.meta.env.VITE_WHATSAPP_PHONE;
  const whatsappLink = `https://wa.me/${phone}`;

  // Atualiza botão "Peça um Orçamento"
  const ctas = document.querySelectorAll(".cta");
  ctas.forEach((cta) => {
    cta.setAttribute("href", whatsappLink);
    console.log(phone);
  });

  // Atualiza ícone do header
  const whatsappHeader = document.getElementById("whatsapp-header");
  if (whatsappHeader) {
    whatsappHeader.setAttribute("href", whatsappLink);
  }
});

const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu-container");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});
