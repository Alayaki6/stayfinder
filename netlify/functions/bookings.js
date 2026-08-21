export default async (request) => {

  // Only allow POST requests
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


    // =====================================
    // VALIDATION
    // =====================================

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


    // =====================================
    // DATE VALIDATION
    // =====================================

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


    if (endDate <= startDate) {

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


    // =====================================
    // BOOKING ID
    // =====================================

    const bookingId =
      `SF-${Date.now()}`;


    // =====================================
    // BOOKING RECORD
    // =====================================

    const booking = {

      bookingId,

      propertyId:

        Number(propertyId),

      guestName:
        String(guestName).trim(),

      guestPhone:
        String(guestPhone).trim(),

      guestEmail:
        String(guestEmail).trim(),

      checkIn,

      checkOut,

      guests:
        Number(guests),

      message:
        String(message || "").trim(),

      status:
        "pending",

      createdAt:
        new Date().toISOString()

    };


    // =====================================
    // TEMPORARY STORAGE
    // =====================================

    console.log(
      "NEW STAYFINDER BOOKING:",
      booking
    );


    // =====================================
    // SUCCESS RESPONSE
    // =====================================

    return new Response(
      JSON.stringify({

        success: true,

        message:
          "Booking request received.",

        bookingId

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
      "Booking error:",
      error
    );


    return new Response(
      JSON.stringify({

        success: false,

        message:
          "Unable to process booking request."

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
