const properties = [
  {
    id: 1,
    name: "Modern City Apartment",
    location: "Lagos, Nigeria",
    type: "shortlet",
    price: 85000,
    guests: 4,
    beds: 2
  },
  {
    id: 2,
    name: "The Greenview Hotel",
    location: "Ikeja, Lagos",
    type: "hotel",
    price: 65000,
    guests: 2,
    beds: 1
  },
  {
    id: 3,
    name: "Luxury Lekki Residence",
    location: "Lekki, Lagos",
    type: "shortlet",
    price: 120000,
    guests: 6,
    beds: 3
  },
  {
    id: 4,
    name: "Palm View Hotel",
    location: "Victoria Island, Lagos",
    type: "hotel",
    price: 95000,
    guests: 2,
    beds: 1
  },
  {
    id: 5,
    name: "Serene Stay Apartment",
    location: "Yaba, Lagos",
    type: "shortlet",
    price: 70000,
    guests: 3,
    beds: 2
  },
  {
    id: 6,
    name: "Ocean Breeze Hotel",
    location: "Ikoyi, Lagos",
    type: "hotel",
    price: 110000,
    guests: 2,
    beds: 1
  }
];

export default async () => {
  return new Response(
    JSON.stringify({
      success: true,
      count: properties.length,
      properties
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};
