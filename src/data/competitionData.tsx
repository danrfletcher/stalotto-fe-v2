const today = new Date(Date.now());
export const sevenDaysLater = new Date(today.setDate(today.getDate() + 7));

interface OfferParameters {
    category: string,
    offerId: number,
    parameters: (string | number)[]
}

interface SpecificationParameters {
    specificationId: number,
    text: string,
    value: string
}

export interface CommentReplyParameters {
    commentId: number,
    username: string,
    comment: string,
    userProfileImg: string
}

interface CommentParameters {
    commentId: number,
    username: string,
    comment: string,
    userProfileImg: string,
    replies: CommentReplyParameters[]
}

interface CompetitionParameters {
    id: number,
    tag: string,
    images: string[],
    title: string,
    creator: string,
    category: string,
    finalPrice: number,
    originalPrice: number,
    quantity: number,
    totalTickets: number,
    ticketsRemaining: number,
    closes: Date,
    state: string,
    offers: OfferParameters[],
    specifications: SpecificationParameters[],
    totalComments: number,
    comments: CommentParameters[],
    winningTicketId: number | null,
    description: JSX.Element
}

const competitionsData: CompetitionParameters[] = [
    {
        id: 1,
        tag: "featured-product",
        images: [
            "/images/competitions/volvo-940-black-1.png",
            "/images/competitions/volvo-940-black-2.jpeg",
            "/images/competitions/volvo-940-black-3.jpeg",
            "/images/competitions/volvo-940-black-4.jpeg"
        ],
        title: "Volvo 940",
        creator: "scottyfairno",
        category: "Vehicles",
        finalPrice: 1.90,
        originalPrice: 10,
        quantity: 1,
        totalTickets: 1000,
        ticketsRemaining: 542,
        closes: sevenDaysLater,
        state: "Now Live",
        offers: [
            {
                category: 'Patreon',
                offerId: 1,
                parameters: [25]
            },
            {
                category: 'Instagram',
                offerId: 1,
                parameters: [25, 1, 'month']
            }
        ],
        specifications: [
            {
                specificationId: 1,
                text: "Brand",
                value: "Volvo"
            },
            {
                specificationId: 2,
                text: "Engine",
                value: "2.4l"
            },
            {
                specificationId: 3,
                text: "Colour",
                value: "Black"
            },
            {
                specificationId: 4,
                text: "Fuel",
                value: "Diesel"
            },
            {
                specificationId: 5,
                text: "Brand",
                value: "Volvo"
            },
        ],
        totalComments: 7,
        comments: [
            {
                commentId: 1,
                username: "uncle_buzzcocks",
                comment: "This is a propa class vehicle. If I win, I'm gonna smoke tac buckets in it with Trekka.",
                userProfileImg: "/images/users/uncle_buzzcocks.jpg",
                replies: [
                    {
                        commentId: 2,
                        username: "danrfletcher",
                        comment: "I'll have tac buckets with you in it no problem.",
                        userProfileImg: "/images/users/danrfletcher.jpg",
                    }
                ]
            },
            {
                commentId: 3,
                username: "danrfletcher",
                comment: "Looks like a pure good veg oil burner!",
                userProfileImg: "/images/users/danrfletcher.jpg",
                replies: []
            },
            {
                commentId: 4,
                username: "scottyfairno",
                comment: "I'm sad to get rid of my prized volvo.",
                userProfileImg: "/images/users/scottyfairno-p.jpeg",
                replies: []
            },
            {
                commentId: 5,
                username: "connalsraiments",
                comment: "Can we use it to ram raid the Ralph Lauren HQ before it ends?",
                userProfileImg: "/images/users/connal-p.jpeg",
                replies: [
                    {
                        commentId: 6,
                        username: "scottyfairno",
                        comment: "Yes defo",
                        userProfileImg: "/images/users/scottyfairno-p.jpeg",
                    },
                    {
                        commentId: 7,
                        username: "mrbodge",
                        comment: "Lads I will be the getaway driver.",
                        userProfileImg: "/images/users/mrbodge.jpeg",
                    }
                ]
            }
        ],
        winningTicketId: null,
        description: 
            <p>2.4 litre D24tic 940, mechanical pump- making this the ideal veg-oil burner.<br /><br />
            the car is a very clean example, black interior with grey exterior, alloy wheels, turbo grill and a straight through sidepipe that blows black smoke<br /><br />
            The ultimate tax evading yoke, this machine will run on just about any flammable liquid you put in her (within reason)</p>
    },
    {
        id: 2,
        tag: "featured-product",
        images: [
            "/images/competitions/defender-ambulance.png",
        ],
        title: "Land Rover Defender Ambulance",
        creator: "scottyfairno",
        category: "Vehicles",
        finalPrice: 10,
        originalPrice: 10,
        quantity: 1,
        totalTickets: 1000,
        ticketsRemaining: 0,
        closes: sevenDaysLater,
        state: "Winners",
        offers: [],
        specifications: [],
        totalComments: 0,
        comments: [],
        winningTicketId: 486,
        description: <p></p>,
    },
];

export default competitionsData;