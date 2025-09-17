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

// Script para trocar imagem de serviço com highlight
document.addEventListener("DOMContentLoaded", () => {
  const lista = document.querySelectorAll(".lista-servicos li");
  const imagem = document.getElementById("imagem-servico");

  lista.forEach((item) => {
    item.addEventListener("click", () => {
      // Troca imagem com efeito fade
      const novaImagem = item.getAttribute("data-img");
      imagem.style.opacity = "0";
      setTimeout(() => {
        imagem.src = novaImagem;
        imagem.style.opacity = "1";
      }, 300);

      // Remove classe ativo de todos
      lista.forEach((li) => li.classList.remove("ativo"));

      // Adiciona classe ao item selecionado
      item.classList.add("ativo");
    });
  });

  // Define o primeiro como ativo por padrão
  if (lista.length > 0) {
    lista[0].classList.add("ativo");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const ul = document.querySelector(".lista-servicos");
  if (!ul) return;

  const items = Array.from(ul.querySelectorAll("li[data-img]"));
  const imgEl = document.getElementById("imagem-servico");
  if (!imgEl || items.length === 0) return;

  // Preload images (opcional, melhora experiência)
  items.forEach((li) => {
    const src = li.dataset.img;
    if (src) {
      const pre = new Image();
      pre.src = src;
    }
  });

  // Helper: muda imagem com fade
  const changeImage = (newSrc, altText = "") => {
    if (!newSrc) return;
    // se já for a mesma src, apenas destaca o item
    if (
      imgEl.src &&
      imgEl.src.indexOf(newSrc.replace("./", "")) !== -1 &&
      imgEl.src.indexOf(newSrc) !== -1
    ) {
      imgEl.alt = altText;
      return;
    }
    imgEl.style.opacity = "0";
    setTimeout(() => {
      imgEl.src = newSrc;
      imgEl.alt = altText;
      // forçar repaint não necessário; apenas restaurar opacidade
      imgEl.style.opacity = "1";
    }, 260);
  };

  // Remove ativo de todos e adiciona ao selecionado
  const setActive = (el) => {
    items.forEach((i) => i.classList.remove("ativo"));
    if (el) el.classList.add("ativo");
  };

  // Event handler
  const handler = (li) => {
    const src = li.dataset.img;
    const altText = li.querySelector("b")
      ? li.querySelector("b").innerText
      : "";
    changeImage(src, altText);
    setActive(li);
  };

  // Tornar items focáveis e adicionar listeners
  items.forEach((li) => {
    li.tabIndex = 0; // torna focável no teclado
    li.addEventListener("click", () => handler(li));
    li.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handler(li);
      }
    });
  });

  // Inicializa com o primeiro ativo (se existir)
  if (items[0]) {
    handler(items[0]);
  }
});
