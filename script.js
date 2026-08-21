const API_URL = "/.netlify/functions/properties";

const propertyGrid =
  document.getElementById("propertyGrid");

const locationInput =
  document.getElementById("locationInput");

const typeInput =
  document.getElementById("typeInput");

const searchButton =
  document.getElementById("searchButton");

let allProperties = [];


// =========================================
// PROPERTY IMAGES
// =========================================

const propertyImages = {

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


// =========================================
// FORMAT PRICE
// =========================================

function formatPrice(price) {

  return new Intl.NumberFormat(
    "en-NG"
  ).format(price);

}


// =========================================
// DISPLAY PROPERTIES
// =========================================

function displayProperties(
  properties
) {

  if (!propertyGrid) {
    return;
  }


  if (
    !properties ||
    properties.length === 0
  ) {

    propertyGrid.innerHTML = `

      <div class="empty-state">

        <h3>
          No stays found
        </h3>

        <p>
          Try another location or stay type.
        </p>

      </div>

    `;

    return;

  }


  propertyGrid.innerHTML =
    properties.map(
      (property) => {

        const image =
          propertyImages[property.id];


        const type =
          property.type === "shortlet"
            ? "Short-let"
            : "Hotel";


        return `

          <article
            class="property-card"
          >

            <div
              class="property-image"
            >

              <img
                src="${image}"
                alt="${property.name}"
                loading="lazy"
              >

              <span
                class="property-type"
              >
                ${type}
              </span>

            </div>


            <div
              class="property-content"
            >

              <p
                class="property-location"
              >
                📍 ${property.location}
              </p>


              <h3>
                ${property.name}
              </h3>


              <div
                class="property-meta"
              >

                <span>
                  👤 ${property.guests} guests
                </span>

                <span>
                  🛏 ${property.beds} beds
                </span>

              </div>


              <div
                class="property-footer"
              >

                <div>

                  <strong>
                    ₦${formatPrice(property.price)}
                  </strong>

                  <small>
                    / night
                  </small>

                </div>


                <a
                  href="property.html?id=${property.id}"
                  class="view-button"
                >
                  View stay
                </a>

              </div>

            </div>

          </article>

        `;

      }
    ).join("");

}


// =========================================
// FILTER PROPERTIES
// =========================================

function filterProperties() {

  const location =
    locationInput.value
      .trim()
      .toLowerCase();


  const type =
    typeInput.value;


  const filtered =
    allProperties.filter(
      (property) => {

        const matchesLocation =
          !location ||
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

      }
    );


  displayProperties(
    filtered
  );


  const staysSection =
    document.getElementById(
      "stays"
    );


  if (staysSection) {

    staysSection.scrollIntoView({
      behavior: "smooth"
    });

  }

}


// =========================================
// LOAD PROPERTIES
// =========================================

async function loadProperties() {

  if (!propertyGrid) {
    return;
  }


  propertyGrid.innerHTML = `

    <div class="loading-state">

      <h3>
        Finding your stays...
      </h3>

      <p>
        Please wait a moment.
      </p>

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
      !Array.isArray(
        data.properties
      )
    ) {

      throw new Error(
        "Invalid property data."
      );

    }


    allProperties =
      data.properties;


    displayProperties(
      allProperties
    );


  } catch (error) {

    console.error(error);


    propertyGrid.innerHTML = `

      <div class="empty-state">

        <h3>
          We couldn't load the stays
        </h3>

        <p>
          Please refresh the page and try again.
        </p>

        <button
          type="button"
          class="contact-button"
          id="retryButton"
        >
          Try Again
        </button>

      </div>

    `;


    const retryButton =
      document.getElementById(
        "retryButton"
      );


    if (retryButton) {

      retryButton.addEventListener(
        "click",
        loadProperties
      );

    }

  }

}


// =========================================
// SEARCH BUTTON
// =========================================

if (searchButton) {

  searchButton.addEventListener(
    "click",
    filterProperties
  );

}


// =========================================
// SEARCH WITH ENTER
// =========================================

if (locationInput) {

  locationInput.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Enter"
      ) {

        event.preventDefault();

        filterProperties();

      }

    }
  );

}


// =========================================
// TYPE FILTER
// =========================================

if (typeInput) {

  typeInput.addEventListener(
    "change",
    filterProperties
  );

}


// =========================================
// MOBILE NAVIGATION
// =========================================

const menuToggle =
  document.querySelector(
    ".menu-toggle"
  );

const navLinks =
  document.querySelector(
    ".nav-links"
  );


if (
  menuToggle &&
  navLinks
) {

  menuToggle.addEventListener(
    "click",
    () => {

      const isOpen =
        navLinks.classList.toggle(
          "active"
        );


      menuToggle.setAttribute(
        "aria-expanded",
        isOpen
      );

    }
  );


  navLinks
    .querySelectorAll("a")
    .forEach(
      (link) => {

        link.addEventListener(
          "click",
          () => {

            navLinks.classList.remove(
              "active"
            );

            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      }
    );

}


// =========================================
// START
// =========================================

loadProperties();
