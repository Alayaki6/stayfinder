const API_URL = "/.netlify/functions/properties";

const propertyDetails =
  document.getElementById("propertyDetails");


// =========================================
// PROPERTY IMAGES
// =========================================

const propertyImages = {
  1: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",

  2: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85",

  3: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",

  4: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1400&q=85",

  5: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",

  6: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=85"
};


// =========================================
// PROPERTY DESCRIPTIONS
// =========================================

const propertyDescriptions = {
  1:
    "A comfortable modern apartment designed for guests looking for a relaxing stay in Lagos.",

  2:
    "A stylish hotel stay in Ikeja, offering a convenient base for business and leisure.",

  3:
    "A spacious luxury residence in Lekki, perfect for families, groups and longer stays.",

  4:
    "A comfortable hotel experience in Victoria Island, close to some of Lagos's major attractions.",

  5:
    "A peaceful apartment in Yaba designed for guests who want a comfortable and relaxing environment.",

  6:
    "A premium hotel stay in Ikoyi with a calm atmosphere for business or leisure."
};


// =========================================
// AMENITIES
// =========================================

const amenities = [
  "Wi-Fi",
  "Air conditioning",
  "Private bathroom",
  "Comfortable beds",
  "24/7 support",
  "Smart TV"
];


// =========================================
// FORMAT PRICE
// =========================================

function formatPrice(price) {
  return new Intl.NumberFormat("en-NG").format(price);
}


// =========================================
// GET PROPERTY ID
// =========================================

function getPropertyId() {

  const params =
    new URLSearchParams(
      window.location.search
    );

  return Number(
    params.get("id")
  );
}


// =========================================
// DISPLAY PROPERTY
// =========================================

function displayProperty(property) {

  if (!propertyDetails) return;


  const type =
    property.type === "shortlet"
      ? "Short-let"
      : "Hotel";


  const image =
    propertyImages[property.id];


  const description =
    propertyDescriptions[property.id] ||
    "A comfortable StayFinder property for your next trip.";


  propertyDetails.innerHTML = `

    <div class="property-detail-image">

      <img
        src="${image}"
        alt="${property.name}"
      >

      <span class="property-detail-type">
        ${type}
      </span>

    </div>


    <div class="property-detail-content">

      <a
        href="index.html#stays"
        class="back-link"
      >
        ← Back to stays
      </a>


      <p class="property-location">
        ${property.location}
      </p>


      <h1>
        ${property.name}
      </h1>


      <div class="property-detail-stats">

        <span>
          👤 ${property.guests} guests
        </span>

        <span>
          🛏 ${property.beds} beds
        </span>

        <span>
          📍 ${property.location}
        </span>

      </div>


      <div class="property-detail-price">

        <strong>
          ₦${formatPrice(property.price)}
        </strong>

        <span>
          / night
        </span>

      </div>


      <div class="property-description">

        <h2>
          About this stay
        </h2>

        <p>
          ${description}
        </p>

      </div>


      <div class="amenities">

        <h2>
          Amenities
        </h2>

        <div class="amenity-list">

          ${amenities.map(
            (amenity) => `
              <span>
                ✓ ${amenity}
              </span>
            `
          ).join("")}

        </div>

      </div>


      <div class="booking-box">

        <div>

          <p>
            Ready to stay here?
          </p>

          <small>
            Send a booking request to get started.
          </small>

        </div>


        <button
          id="bookingButton"
          class="contact-button"
          type="button"
        >
          Request to Book
        </button>

      </div>

    </div>
  `;


  const bookingButton =
    document.getElementById(
      "bookingButton"
    );


  if (bookingButton) {

    bookingButton.addEventListener(
      "click",
      () => {

        window.location.href =
          `booking.html?id=${property.id}`;

      }
    );

  }

}


// =========================================
// LOAD PROPERTY
// =========================================

async function loadProperty() {

  if (!propertyDetails) return;


  const propertyId =
    getPropertyId();


  if (!propertyId) {

    propertyDetails.innerHTML = `
      <div class="empty-state">

        <h2>
          Property not found
        </h2>

        <p>
          Please return to the available stays.
        </p>

        <a
          href="index.html#stays"
          class="contact-button"
        >
          Browse Stays
        </a>

      </div>
    `;

    return;

  }


  try {

    const response =
      await fetch(API_URL);


    if (!response.ok) {
      throw new Error(
        "Unable to load property."
      );
    }


    const data =
      await response.json();


    const property =
      data.properties.find(
        (item) =>
          item.id === propertyId
      );


    if (!property) {

      throw new Error(
        "Property not found."
      );

    }


    displayProperty(property);


  } catch (error) {

    console.error(error);


    propertyDetails.innerHTML = `
      <div class="empty-state">

        <h2>
          Something went wrong
        </h2>

        <p>
          We couldn't load this property.
        </p>

        <a
          href="index.html#stays"
          class="contact-button"
        >
          Browse Stays
        </a>

      </div>
    `;

  }

}


// =========================================
// START
// =========================================

loadProperty();
