// ==========================================
// STAYFINDER DATA
// ==========================================

const properties = [
  {
    id: 1,
    name: "The Green Haven",
    location: "Lekki, Lagos",
    type: "shortlet",
    price: "₦85,000",
    guests: "4 guests",
    beds: "2 beds",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 2,
    name: "Palm View Residence",
    location: "Victoria Island, Lagos",
    type: "hotel",
    price: "₦120,000",
    guests: "2 guests",
    beds: "1 king bed",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 3,
    name: "The Urban Escape",
    location: "Ikoyi, Lagos",
    type: "shortlet",
    price: "₦150,000",
    guests: "6 guests",
    beds: "3 beds",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 4,
    name: "Lagos Bay Hotel",
    location: "Victoria Island, Lagos",
    type: "hotel",
    price: "₦95,000",
    guests: "2 guests",
    beds: "1 king bed",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 5,
    name: "The Cozy Apartment",
    location: "Yaba, Lagos",
    type: "shortlet",
    price: "₦55,000",
    guests: "3 guests",
    beds: "2 beds",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 6,
    name: "Skyline Suites",
    location: "Ikeja, Lagos",
    type: "hotel",
    price: "₦75,000",
    guests: "2 guests",
    beds: "1 king bed",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80"
  }
];


// ==========================================
// PROPERTY ELEMENT
// ==========================================

const propertyGrid =
  document.getElementById("propertyGrid");


// ==========================================
// DISPLAY PROPERTIES
// ==========================================

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


  propertyGrid.innerHTML = list
    .map((property) => {

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
                ${property.guests}
              </span>

              <span>
                ${property.beds}
              </span>

            </div>


            <div class="property-bottom">

              <div class="property-price">
                ${property.price}
                <span>/ night</span>
              </div>

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

    })
    .join("");


  attachPropertyEvents();
}


// ==========================================
// SEARCH
// ==========================================

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


  const results =
    properties.filter((property) => {

      const matchesLocation =
        location === "" ||
        property.location
          .toLowerCase()
          .includes(location) ||
        property.name
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


  displayProperties(results);


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


// ==========================================
// ENTER KEY SEARCH
// ==========================================

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


// ==========================================
// PROPERTY BUTTONS
// ==========================================

function attachPropertyEvents() {

  const favoriteButtons =
    document.querySelectorAll(
      "[data-favorite]"
    );


  favoriteButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const isSaved =
          button.classList.toggle("saved");


        button.textContent =
          isSaved
            ? "♥"
            : "♡";

      }
    );

  });


  const viewButtons =
    document.querySelectorAll(
      "[data-view]"
    );


  viewButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const id =
          Number(
            button.dataset.view
          );


        const property =
          properties.find(
            (item) =>
              item.id === id
          );


        if (!property) return;


        alert(
          `${property.name}\n\n` +
          `${property.location}\n` +
          `${property.price} per night\n\n` +
          `Property details coming soon.`
        );

      }
    );

  });

}


// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuToggle =
  document.querySelector(
    ".menu-toggle"
  );

const navLinks =
  document.querySelector(
    ".nav-links"
  );


if (menuToggle && navLinks) {

  menuToggle.addEventListener(
    "click",
    () => {

      const open =
        navLinks.classList.toggle(
          "active"
        );


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


// ==========================================
// INITIAL LOAD
// ==========================================

displayProperties(properties);
