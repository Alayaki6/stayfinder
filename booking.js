const API_URL = "/.netlify/functions/properties";

const selectedProperty =
  document.getElementById("selectedProperty");

const bookingForm =
  document.getElementById("bookingForm");

const formMessage =
  document.getElementById("formMessage");

const bookingSubmit =
  document.getElementById("bookingSubmit");


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
// FORMAT PRICE
// =========================================

function formatPrice(price) {

  return new Intl.NumberFormat(
    "en-NG"
  ).format(price);

}


// =========================================
// LOAD SELECTED PROPERTY
// =========================================

async function loadProperty() {

  const propertyId =
    getPropertyId();


  if (!propertyId) {

    selectedProperty.innerHTML = `
      <div class="empty-state">

        <h3>
          No property selected
        </h3>

        <p>
          Please return to StayFinder and
          choose a property.
        </p>

        <a
          href="index.html#stays"
          class="contact-button"
        >
          Browse Stays
        </a>

      </div>
    `;

    bookingForm.style.display =
      "none";

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


    selectedProperty.innerHTML = `

      <div class="selected-property-info">

        <p class="eyebrow">
          YOUR SELECTED STAY
        </p>

        <h2>
          ${property.name}
        </h2>

        <p>
          📍 ${property.location}
        </p>

        <div class="selected-property-meta">

          <span>
            ${property.type === "shortlet"
              ? "Short-let"
              : "Hotel"}
          </span>

          <span>
            👤 ${property.guests} guests
          </span>

          <span>
            🛏 ${property.beds} beds
          </span>

        </div>

        <strong>
          ₦${formatPrice(property.price)}
          <small>/ night</small>
        </strong>

      </div>

    `;


    // Store property ID on form

    bookingForm.dataset.propertyId =
      property.id;


  } catch (error) {

    console.error(error);


    selectedProperty.innerHTML = `
      <div class="empty-state">

        <h3>
          Unable to load stay
        </h3>

        <p>
          Please return and try again.
        </p>

      </div>
    `;

  }

}


// =========================================
// FORM VALIDATION
// =========================================

function validateForm() {

  const name =
    document.getElementById(
      "guestName"
    ).value.trim();


  const phone =
    document.getElementById(
      "guestPhone"
    ).value.trim();


  const email =
    document.getElementById(
      "guestEmail"
    ).value.trim();


  const checkIn =
    document.getElementById(
      "checkIn"
    ).value;


  const checkOut =
    document.getElementById(
      "checkOut"
    ).value;


  const guests =
    document.getElementById(
      "guestCount"
    ).value;


  if (
    !name ||
    !phone ||
    !email ||
    !checkIn ||
    !checkOut ||
    !guests
  ) {

    showMessage(
      "Please complete all required fields.",
      "error"
    );

    return false;

  }


  if (!email.includes("@")) {

    showMessage(
      "Please enter a valid email address.",
      "error"
    );

    return false;

  }


  const start =
    new Date(checkIn);


  const end =
    new Date(checkOut);


  if (end <= start) {

    showMessage(
      "Check-out must be after check-in.",
      "error"
    );

    return false;

  }


  return true;

}


// =========================================
// MESSAGE
// =========================================

function showMessage(
  message,
  type
) {

  formMessage.textContent =
    message;


  formMessage.className =
    `form-message ${type}`;

}


// =========================================
// SUBMIT BOOKING
// =========================================

bookingForm.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();


    if (!validateForm()) {
      return;
    }


    const propertyId =
      bookingForm.dataset.propertyId;


    if (!propertyId) {

      showMessage(
        "Please select a property first.",
        "error"
      );

      return;

    }


    const bookingData = {

      propertyId:
        Number(propertyId),

      guestName:
        document.getElementById(
          "guestName"
        ).value.trim(),

      guestPhone:
        document.getElementById(
          "guestPhone"
        ).value.trim(),

      guestEmail:
        document.getElementById(
          "guestEmail"
        ).value.trim(),

      checkIn:
        document.getElementById(
          "checkIn"
        ).value,

      checkOut:
        document.getElementById(
          "checkOut"
        ).value,

      guests:
        Number(
          document.getElementById(
            "guestCount"
          ).value
        ),

      message:
        document.getElementById(
          "guestMessage"
        ).value.trim()

    };


    bookingSubmit.disabled =
      true;


    bookingSubmit.textContent =
      "Sending Request...";


    showMessage(
      "",
      ""
    );


    try {

      const response =
        await fetch(
          "/.netlify/functions/bookings",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify(
                bookingData
              )
          }
        );


      const result =
        await response.json();


      if (!response.ok) {

        throw new Error(
          result.message ||
          "Booking request failed."
        );

      }


      bookingForm.reset();


      showMessage(
        "🎉 Booking request sent successfully! We'll contact you soon.",
        "success"
      );


      bookingSubmit.textContent =
        "Request Sent";


    } catch (error) {

      console.error(error);


      showMessage(
        error.message ||
        "Something went wrong. Please try again.",
        "error"
      );


      bookingSubmit.disabled =
        false;


      bookingSubmit.textContent =
        "Send Booking Request";

    }

  }
);


// =========================================
// START
// =========================================

loadProperty();
