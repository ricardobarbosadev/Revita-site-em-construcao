// Espera o DOM estar completamente carregado
document.addEventListener("DOMContentLoaded", function () {
  // Ano dinâmico no footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Menu mobile toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const menuContainer = document.querySelector(".menu-container");

  if (menuToggle && menuContainer) {
    menuToggle.addEventListener("click", () => {
      menuContainer.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }

  // Fechar menu ao clicar em um link
  const navLinks = document.querySelectorAll(".menu-container a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuContainer.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });

  // Troca de imagens na secção serviços - HOVER em vez de CLICK
  const listaServicos = document.querySelectorAll(".lista-servicos li");
  const imagemServico = document.getElementById("imagem-servico");

  if (listaServicos.length > 0 && imagemServico) {
    // Preload de imagens para melhor performance
    listaServicos.forEach((item) => {
      const imgSrc = item.getAttribute("data-img");
      if (imgSrc) {
        const img = new Image();
        img.src = imgSrc;
      }
    });

    // Função para trocar imagem com efeito fade
    const changeServiceImage = (item) => {
      const novaImagem = item.getAttribute("data-img");
      const altText = item.querySelector("h3")
        ? item.querySelector("h3").textContent
        : "";

      if (novaImagem && !imagemServico.src.includes(novaImagem)) {
        // Aplica efeito fade out
        imagemServico.style.opacity = 0;

        // Troca a imagem após a transição
        setTimeout(() => {
          imagemServico.src = novaImagem;
          imagemServico.alt = altText;

          // Aplica fade in
          setTimeout(() => {
            imagemServico.style.opacity = 1;
          }, 50);
        }, 300);
      }
    };

    // Função para restaurar a imagem ativa padrão
    const restoreActiveImage = () => {
      const activeItem = document.querySelector(".lista-servicos li.ativo");
      if (activeItem) {
        changeServiceImage(activeItem);
      }
    };

    // Adiciona eventos a cada item de serviço
    listaServicos.forEach((item) => {
      // Mouse enter - muda a imagem
      item.addEventListener("mouseenter", () => {
        changeServiceImage(item);
      });

      // Mouse leave - restaura a imagem ativa
      item.addEventListener("mouseleave", () => {
        restoreActiveImage();
      });

      // Clique - define como item ativo
      item.addEventListener("click", () => {
        // Remove a classe ativo de todos os itens
        listaServicos.forEach((i) => i.classList.remove("ativo"));

        // Adiciona a classe ativo ao item clicado
        item.classList.add("ativo");
      });

      // Teclado (acessibilidade) - foco
      item.addEventListener("focus", () => {
        changeServiceImage(item);
      });

      item.addEventListener("blur", () => {
        restoreActiveImage();
      });

      // Torna os itens focáveis para navegação por teclado
      item.setAttribute("tabindex", "0");
    });

    // Define o primeiro item como ativo por padrão
    if (listaServicos[0]) {
      listaServicos[0].classList.add("ativo");
    }
  }
});
