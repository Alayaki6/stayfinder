export default async (request) => {

  // =========================================
  // METHOD CHECK
  // =========================================

  if (request.method !== "POST") {

    return new Response(
      JSON.stringify({
        success: false,
        message: "Method not allowed."
      }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  }


  try {

    // =========================================
    // READ REQUEST
    // =========================================

    const body =
      await request.json();


    const {
      propertyId,
      guestName,
      guestPhone,
      guestEmail,
      checkIn,
      checkOut,
      guests,
      message
    } = body;


    // =========================================
    // REQUIRED FIELDS
    // =========================================

    if (
      !propertyId ||
      !guestName ||
      !guestPhone ||
      !guestEmail ||
      !checkIn ||
      !checkOut ||
      !guests
    ) {

      return new Response(
        JSON.stringify({
          success: false,
          message:
            "Please complete all required fields."
        }),
        {
          status: 400,
          headers: {
            "Content-Type":
              "application/json"
          }
        }
      );

    }


    // =========================================
    // EMAIL VALIDATION
    // =========================================

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
      !emailPattern.test(
        String(guestEmail).trim()
      )
    ) {

      return new Response(
        JSON.stringify({
          success: false,
          message:
            "Please provide a valid email address."
        }),
        {
          status: 400,
          headers: {
            "Content-Type":
              "application/json"
          }
        }
      );

    }


    // =========================================
    // DATE VALIDATION
    // =========================================

    const startDate =
      new Date(checkIn);


    const endDate =
      new Date(checkOut);


    if (
      Number.isNaN(
        startDate.getTime()
      ) ||
      Number.isNaN(
        endDate.getTime()
      )
    ) {

      return new Response(
        JSON.stringify({
          success: false,
          message:
            "Please provide valid booking dates."
        }),
        {
          status: 400,
          headers: {
            "Content-Type":
              "application/json"
          }
        }
      );

    }


    if (
      endDate <= startDate
    ) {

      return new Response(
        JSON.stringify({
          success: false,
          message:
            "Check-out must be after check-in."
        }),
        {
          status: 400,
          headers: {
            "Content-Type":
              "application/json"
          }
        }
      );

    }


    // =========================================
    // GUEST VALIDATION
    // =========================================

    const guestNumber =
      Number(guests);


    if (
      !Number.isInteger(
        guestNumber
      ) ||
      guestNumber < 1
    ) {

      return new Response(
        JSON.stringify({
          success: false,
          message:
            "Please provide a valid number of guests."
        }),
        {
          status: 400,
          headers: {
            "Content-Type":
              "application/json"
          }
        }
      );

    }


    // =========================================
    // CREATE BOOKING ID
    // =========================================

    const bookingId =
      `SF-${Date.now()}`;


    // =========================================
    // BOOKING OBJECT
    // =========================================

    const booking = {

      bookingId,

      propertyId:
        Number(propertyId),

      guestName:
        String(
          guestName
        ).trim(),

      guestPhone:
        String(
          guestPhone
        ).trim(),

      guestEmail:
        String(
          guestEmail
        ).trim(),

      checkIn,

      checkOut,

      guests:
        guestNumber,

      message:
        String(
          message || ""
        ).trim(),

      status:
        "pending",

      createdAt:
        new Date().toISOString()

    };


    // =========================================
    // SERVER LOG
    // =========================================

    console.log(
      "NEW STAYFINDER BOOKING"
    );

    console.log(
      JSON.stringify(
        booking,
        null,
        2
      )
    );


    // =========================================
    // SUCCESS RESPONSE
    // =========================================

    return new Response(
      JSON.stringify({

        success: true,

        message:
          "Booking request received successfully.",

        bookingId,

        status:
          "pending"

      }),
      {
        status: 201,

        headers: {
          "Content-Type":
            "application/json"
        }

      }
    );


  } catch (error) {

    console.error(
      "BOOKING ERROR:",
      error
    );


    return new Response(
      JSON.stringify({

        success: false,

        message:
          "Unable to process your booking request. Please try again."

      }),
      {
        status: 500,

        headers: {
          "Content-Type":
            "application/json"
        }

      }
    );

  }

};
