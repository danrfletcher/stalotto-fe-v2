interface FeaturedCompetition {
    id: number
    thumbnail: string
    title: string
    finalPrice: number
    originalPrice: number
    totalTickets: number
    ticketsRemaining: number
    closes: Date
}

const featuredCompetitionsData: FeaturedCompetition[] = [];

export const featuredCompetitionsErrors = [];