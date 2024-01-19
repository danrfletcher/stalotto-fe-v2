const today = new Date(Date.now());
export const sevenDaysLater = new Date(today.setDate(today.getDate() + 7));

const competitionsData = [
    {
        id: 1,
        tag: "featured-product",
        images: [
            "/images/competitions/volvo-940-black-1.png",
        ],
        title: "Volvo 940",
        finalPrice: 1.90,
        originalPrice: 10,
        path: "/product-details/",
        totalTickets: 1000,
        ticketsRemaining: 542,
        closes: sevenDaysLater,
        state: "Now Live"
    },
    {
        id: 2,
        tag: "featured-product",
        images: [
            "/images/competitions/defender-ambulance.png",
        ],
        title: "Land Rover Defender Ambulance",
        finalPrice: 10,
        originalPrice: 10,
        path: "/product-details/",
        totalTickets: 1000,
        ticketsRemaining: 0,
        closes: sevenDaysLater,
        state: "Winners",
        winningTicketId: "486"
    },
];

export default competitionsData;