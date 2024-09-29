document.addEventListener("DOMContentLoaded", function () {
  // Main Layout Elements
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");

  // User Actions and Navigation
  const userActions = document.querySelector(".user-action");
  const btnOpen = document.querySelector(".js-btnOpen");
  const btnClose = document.querySelector(".js-btnClose");
  const media = window.matchMedia("(width <= 45em)");
  const navContent = document.querySelector(".nav__content");
  const navOverlay = document.querySelector(".nav__overlay");

  // Cart Dialog Elements
  const cartButton = document.querySelector(".user-action__btn");
  const cartClose = document.querySelector(".js-cart-close");
  const cartDialog = document.querySelector(".cart");

  // Lightbox and Carousel Elements
  const dialog = document.querySelector(".lightbox");
  const openButton = document.querySelector(".open-lightbox");
  const closeButton = document.querySelector(".lightbox-close");

  // Carousel Elements
  const carouselThumbnails = document.querySelectorAll(".carousel .thumbnail");
  const carouselMainImage = document.querySelector(".carousel-main-image");
  const carouselImageWrappers = document.querySelectorAll(
    ".carousel .thumbnail-img-wrapper"
  );
  let carouselImageNumber = carouselMainImage.getAttribute("data-number");

  // Lightbox Elements
  const lightboxThumbnails = document.querySelectorAll(".lightbox .thumbnail");
  const lightboxImageWrappers = document.querySelectorAll(
    ".lightbox .thumbnail-img-wrapper"
  );
  const lightboxMainImage = document.querySelector(".lightbox-main-image");
  let lightboxImageNumber = lightboxMainImage.getAttribute("data-number");

  // Carousel Navigation Buttons
  const previousButtons = document.querySelectorAll(".carousel-nav.previous");
  const nextButtons = document.querySelectorAll(".carousel-nav.next");

  // Quantity Controls
  const quantityInput = document.querySelector(".quantity-input");
  const quantityDecreaseButton = document.querySelector(".quantity-decrease");
  const quantityIncreaseButton = document.querySelector(".quantity-increase");

  // Product Form and Cart Elements
  const productForm = document.querySelector(".product-form");
  const quantityBadge = document.querySelector(".quantity-badge");
  const emptyMessage = document.querySelector(".cart__description");
  const cartItems = document.querySelector(".cart__checkout--items");
  const checkoutButton = document.querySelector(".checkout-button");

  // State Variables
  let totalQuantity = 0;

  function openMobileMenu() {
    btnOpen.setAttribute("aria-expanded", "true");
    navContent.removeAttribute("inert");
    userActions.setAttribute("inert", "");
    main.setAttribute("inert", "");
    footer.setAttribute("inert", "");

    btnClose.focus();
  }

  function closeMobileMenu() {
    btnOpen.setAttribute("aria-expanded", "false");
    navContent.setAttribute("inert", "");
    userActions.removeAttribute("inert", "");
    main.removeAttribute("inert");
    footer.removeAttribute("inert");

    btnOpen.focus();
  }

  function setupNav(event) {
    if (event.matches) {
      // Is mobile
      navContent.setAttribute("inert", "");
      setTimeout(() => {
        navContent.style.display = "block";
        navOverlay.style.display = "block";
      }, 500);
    } else {
      // Is desktop
      navContent.removeAttribute("inert");
      userActions.removeAttribute("inert");
      main.removeAttribute("inert");
      footer.removeAttribute("inert");
      navContent.style.display = "";
      navOverlay.style.display = "";
    }
  }

  setupNav(media);

  btnOpen.addEventListener("click", openMobileMenu);
  btnClose.addEventListener("click", closeMobileMenu);

  media.addEventListener("change", function (event) {
    setupNav(event);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });
  // -------------------------------------------------------------------------------------
  cartButton.addEventListener("click", function () {
    const expanded =
      cartButton.getAttribute("aria-expanded") === "true" || false;
    cartButton.setAttribute("aria-expanded", !expanded);
    if (cartDialog.getAttribute("open") === "") {
      cartDialog.close();
    } else {
      cartDialog.show();
    }
  });

  cartClose.addEventListener("click", function () {
    cartButton.setAttribute("aria-expanded", "false");
    cartDialog.close();
  });

  // -------------------------------------------------------------------------------------
  function handleResize() {
    if (window.innerWidth < 550 && dialog.open) {
      dialog.close();
    }
  }

  openButton.addEventListener("click", () => {
    if (window.innerWidth >= 550) {
      dialog.showModal();
    }
  });

  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  window.addEventListener("resize", handleResize);
  handleResize();

  // -----------------------------------------------------------------------------------
  function updateImage(index, mainImage, imageWrappers, altTexts) {
    mainImage.src = `/assets/images/image-product-${index + 1}.jpg`;
    mainImage.setAttribute("data-number", `${index + 1}`);
    const imageNumber = mainImage.getAttribute("data-number");
    mainImage.alt = altTexts[imageNumber - 1];

    imageWrappers.forEach((imgWrapper) => {
      imgWrapper.classList.remove("active-img");
    });

    imageWrappers[index].classList.add("active-img");
  }

  const altTexts = [
    "1. A single beige and white sneaker with its sole facing upwards, set against a dual-tone background with orange at the top and yellow at the bottom.",
    "2. A pair of beige sneakers with orange accents, placed on top of and next to smooth, white stones. Thin brown twigs are scattered around the stones and shoes. The background is split diagonally between a textured grey surface and a solid orange surface.",
    "3. A sneaker placed on top of two balanced stones. The background is split diagonally between a white upper half and an orange lower half, with the sneaker and stones positioned over both colors.",
    "4. A single sneaker placed on top of two smooth, flat stones. The sneaker has a white lace-up front, a beige toe cap and side panel, and an orange heel accent. The background is a solid orange color which complements the orange heel of the shoe.",
  ];

  function handleThumbnailClick(index, mainImage, imageWrappers) {
    updateImage(index, mainImage, imageWrappers, altTexts);
  }

  carouselThumbnails.forEach((cThumbnail, index) => {
    cThumbnail.addEventListener("click", function () {
      handleThumbnailClick(index, carouselMainImage, carouselImageWrappers);
      handleThumbnailClick(index, lightboxMainImage, lightboxImageWrappers);
    });
  });

  lightboxThumbnails.forEach((lThumbnail, index) => {
    lThumbnail.addEventListener("click", function () {
      handleThumbnailClick(index, lightboxMainImage, lightboxImageWrappers);
    });
  });

  function handleButtonClick(direction, mainImage, imageWrappers, label) {
    let imageNumber = mainImage.getAttribute("data-number");
    if (direction === "prev") {
      imageNumber = imageNumber === "1" ? "4" : String(Number(imageNumber) - 1);
    } else {
      imageNumber = imageNumber === "4" ? "1" : String(Number(imageNumber) + 1);
    }

    mainImage.src = `/assets/images/image-product-${imageNumber}.jpg`;
    mainImage.setAttribute("data-number", imageNumber);
    mainImage.alt = altTexts[imageNumber - 1];

    imageWrappers.forEach((imgWrapper) => {
      imgWrapper.classList.remove("active-img");
    });

    imageWrappers[Number(imageNumber) - 1].classList.add("active-img");

    if (label === "carousel") {
      lightboxMainImage.src = mainImage.src;
      lightboxMainImage.alt = mainImage.alt;
      lightboxMainImage.setAttribute("data-number", imageNumber);

      lightboxImageWrappers.forEach((imgWrapper) => {
        imgWrapper.classList.remove("active-img");
      });

      lightboxImageWrappers[Number(imageNumber) - 1].classList.add(
        "active-img"
      );
    }
  }

  previousButtons.forEach((prevButton) => {
    prevButton.addEventListener("click", function () {
      const label = prevButton.getAttribute("data-label");
      if (label === "carousel") {
        handleButtonClick(
          "prev",
          carouselMainImage,
          carouselImageWrappers,
          label
        );
      } else {
        handleButtonClick(
          "prev",
          lightboxMainImage,
          lightboxImageWrappers,
          label
        );
      }
    });
  });

  nextButtons.forEach((nextButton) => {
    nextButton.addEventListener("click", function () {
      const label = nextButton.getAttribute("data-label");
      if (label === "carousel") {
        handleButtonClick(
          "next",
          carouselMainImage,
          carouselImageWrappers,
          label
        );
      } else {
        handleButtonClick(
          "next",
          lightboxMainImage,
          lightboxImageWrappers,
          label
        );
      }
    });
  });
  // --------------------------------------------------------------------------------------
  quantityDecreaseButton.addEventListener("click", function () {
    let quantityValue = Number(quantityInput.value);
    quantityInput.value = quantityValue > 0 ? quantityValue - 1 : 0;
  });

  quantityIncreaseButton.addEventListener("click", function () {
    quantityInput.value = String(Number(quantityInput.value) + 1);
  });
  // --------------------------------------------------------------------------------------
  productForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const quantityInputValue = parseInt(quantityInput.value, 10);
    quantityInput.value = "";
    if (quantityInputValue > 0) {
      totalQuantity += quantityInputValue;
      updateBadge(totalQuantity);
      addItemToCart(quantityInputValue);
    }
  });

  function addItemToCart(quantity) {
    const cartItem = document.createElement("li");
    cartItem.classList.add("cart__checkout");

    cartItem.innerHTML = `
      <img
        src="/assets/images/image-product-1-thumbnail.jpg"
        width="50"
        height="50"
        alt=""
      />
      <p>
        Fall Limited Edition Sneakers $125.00 x <span class="item-num">${quantity}</span>
        <strong class="final-price | clr-neutral-900">$${
          125 * quantity
        }.00</strong>
      </p>
      <button class="cart__delete" aria-label="delete the item">
        <img src="/assets/images/icon-delete.svg" alt="" />
      </button>
    `;

    cartItems.appendChild(cartItem);

    cartItems.classList.remove("hidden");
    checkoutButton.classList.remove("hidden");
    emptyMessage.classList.add("hidden");

    const deleteButton = cartItem.querySelector(".cart__delete");
    deleteButton.addEventListener("click", function () {
      const itemQuantity = parseInt(
        cartItem.querySelector(".item-num").textContent,
        10
      );
      totalQuantity -= itemQuantity;

      cartItem.remove();

      updateBadge(totalQuantity);
      checkCartIsEmpty();
    });
  }

  function checkCartIsEmpty() {
    if (cartItems.children.length === 0) {
      emptyMessage.classList.remove("hidden");
      cartItems.classList.add("hidden");
      checkoutButton.classList.add("hidden");
    }
  }

  function updateBadge(totalQuantity) {
    if (totalQuantity > 0) {
      quantityBadge.innerHTML = `${
        totalQuantity === 1
          ? `${totalQuantity} <span class="visually-hidden">sneaker item is inside the cart</span>`
          : `${totalQuantity} <span class="visually-hidden">sneaker items are inside the cart</span>`
      } `;
      quantityBadge.classList.remove("zero-opacity");
    } else {
      quantityBadge.innerHTML = `<span class="visually-hidden">No sneaker item is inside the cart</span>`;
      quantityBadge.classList.add("zero-opacity");
    }
  }
});
