const propertyGrid = document.getElementById("propertyGrid");

const searchButton = document.getElementById("searchButton");
const locationInput = document.getElementById("locationInput");
const typeInput = document.getElementById("typeInput");

const API_URL = "/.netlify/functions/properties";

let properties = [];


// =========================================
// FORMAT PRICE
// =========================================

function formatPrice(price) {
  return new Intl.NumberFormat("en-NG").format(price);
}


// =========================================
// DISPLAY PROPERTIES
// =========================================

function displayProperties(list) {

  if (!propertyGrid) return;

  if (list.length === 0) {

    propertyGrid.innerHTML = `
      <div class="empty-state">
        <h3>No stays found</h3>
        <p>
          Try another location or stay type.
        </p>
      </div>
    `;

    return;
  }


  propertyGrid.innerHTML = list.map((property) => {

    const type =
      property.type === "shortlet"
        ? "Short-let"
        : "Hotel";


    return `
      <article
        class="property-card"
        data-id="${property.id}"
      >

        <div class="property-image">

          <img
            src="${getPropertyImage(property.id)}"
            alt="${property.name}"
            loading="lazy"
          >

          <span class="property-type">
            ${type}
          </span>

          <button
            class="favorite"
            type="button"
            aria-label="Save ${property.name}"
            data-favorite="${property.id}"
          >
            ♡
          </button>

        </div>


        <div class="property-info">

          <p class="property-location">
            ${property.location}
          </p>

          <h3>
            ${property.name}
          </h3>


          <div class="property-details">

            <span>
              👤 ${property.guests} guests
            </span>

            <span>
              🛏 ${property.beds} beds
            </span>

          </div>


          <div class="property-bottom">

            <p class="property-price">
              ₦${formatPrice(property.price)}
              <span>/ night</span>
            </p>

            <button
              class="view-button"
              type="button"
              data-view="${property.id}"
            >
              View stay
            </button>

          </div>

        </div>

      </article>
    `;

  }).join("");


  addPropertyEvents();
}


// =========================================
// PROPERTY IMAGES
// =========================================

function getPropertyImage(id) {

  const images = {

    1:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85",

    2:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85",

    3:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85",

    4:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=85",

    5:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",

    6:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=85"

  };

  return images[id];
}


// =========================================
// PROPERTY EVENTS
// =========================================

function addPropertyEvents() {

  document
    .querySelectorAll("[data-favorite]")
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          button.classList.toggle("saved");

          button.textContent =
            button.classList.contains("saved")
              ? "♥"
              : "♡";

        }
      );

    });


  document
    .querySelectorAll("[data-view]")
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const id =
            Number(button.dataset.view);

          const property =
            properties.find(
              (item) => item.id === id
            );

          if (!property) return;


          alert(
            `${property.name}\n\n` +
            `${property.location}\n` +
            `₦${formatPrice(property.price)} per night\n\n` +
            `Booking functionality will be connected in the next stage.`
          );

        }
      );

    });
}


// =========================================
// SEARCH
// =========================================

function searchProperties() {

  const location =
    locationInput.value
      .trim()
      .toLowerCase();


  const type =
    typeInput.value;


  const filtered =
    properties.filter((property) => {

      const matchesLocation =
        location === "" ||
        property.location
          .toLowerCase()
          .includes(location);


      const matchesType =
        type === "all" ||
        property.type === type;


      return (
        matchesLocation &&
        matchesType
      );

    });


  displayProperties(filtered);


  document
    .getElementById("stays")
    ?.scrollIntoView({
      behavior: "smooth"
    });
}


if (searchButton) {

  searchButton.addEventListener(
    "click",
    searchProperties
  );

}


if (locationInput) {

  locationInput.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Enter") {
        searchProperties();
      }

    }
  );

}


// =========================================
// MOBILE MENU
// =========================================

const menuToggle =
  document.querySelector(".menu-toggle");

const navLinks =
  document.querySelector(".nav-links");


if (menuToggle && navLinks) {

  menuToggle.addEventListener(
    "click",
    () => {

      const open =
        navLinks.classList.toggle("active");


      menuToggle.classList.toggle(
        "active",
        open
      );


      menuToggle.setAttribute(
        "aria-expanded",
        String(open)
      );

    }
  );


  navLinks
    .querySelectorAll("a")
    .forEach((link) => {

      link.addEventListener(
        "click",
        () => {

          navLinks.classList.remove(
            "active"
          );


          menuToggle.classList.remove(
            "active"
          );


          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });

}


// =========================================
// LOAD PROPERTIES FROM BACKEND
// =========================================

async function loadProperties() {

  if (!propertyGrid) return;


  propertyGrid.innerHTML = `
    <div class="loading-state">
      <h3>Finding beautiful stays...</h3>
      <p>Please wait a moment.</p>
    </div>
  `;


  try {

    const response =
      await fetch(API_URL);


    if (!response.ok) {
      throw new Error(
        "Unable to load properties."
      );
    }


    const data =
      await response.json();


    if (
      !data.success ||
      !Array.isArray(data.properties)
    ) {

      throw new Error(
        "Invalid property data."
      );

    }


    properties =
      data.properties;


    displayProperties(properties);


  } catch (error) {

    console.error(error);


    propertyGrid.innerHTML = `
      <div class="empty-state">
        <h3>Something went wrong</h3>
        <p>
          We couldn't load the available stays.
          Please try again later.
        </p>
      </div>
    `;

  }

}


// =========================================
// START APPLICATION
// =========================================

loadProperties();
