const properties = [
  {
    id: 1,
    name: "Modern City Apartment",
    location: "Lagos, Nigeria",
    type: "shortlet",
    price: 85000,
    guests: 4,
    beds: 2,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 2,
    name: "The Greenview Hotel",
    location: "Ikeja, Lagos",
    type: "hotel",
    price: 65000,
    guests: 2,
    beds: 1,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 3,
    name: "Luxury Lekki Residence",
    location: "Lekki, Lagos",
    type: "shortlet",
    price: 120000,
    guests: 6,
    beds: 3,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 4,
    name: "Palm View Hotel",
    location: "Victoria Island, Lagos",
    type: "hotel",
    price: 95000,
    guests: 2,
    beds: 1,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 5,
    name: "Serene Stay Apartment",
    location: "Yaba, Lagos",
    type: "shortlet",
    price: 70000,
    guests: 3,
    beds: 2,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 6,
    name: "Ocean Breeze Hotel",
    location: "Ikoyi, Lagos",
    type: "hotel",
    price: 110000,
    guests: 2,
    beds: 1,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=85"
  }
];


// =========================================
// PROPERTY DISPLAY
// =========================================

const propertyGrid =
  document.getElementById("propertyGrid");


function formatPrice(price) {
  return new Intl.NumberFormat(
    "en-NG"
  ).format(price);
}


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


  propertyGrid.innerHTML =
    list.map((property) => {

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
              src="${property.image}"
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
// PROPERTY BUTTONS
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
            `Booking details will be connected to the backend in the next stage.`
          );

        }
      );

    });
}


// =========================================
// SEARCH
// =========================================

const searchButton =
  document.getElementById("searchButton");

const locationInput =
  document.getElementById("locationInput");

const typeInput =
  document.getElementById("typeInput");


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
// INITIAL LOAD
// =========================================

displayProperties(properties);
