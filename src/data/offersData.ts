export const offersData = [
    {
        id: 1,
        category: 'Patreon',
        offers: [
            {
                offerId: 1,
                title: 'Patreon Followers get $1% off',
                parameters: [
                    {
                        parameterId: 1,
                        title: 'discount',
                        type: 'number',
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        category: 'Instagram',
        offers: [
            {
                offerId: 1,
                title: 'Buy $1 to get $2 $3 access to private Instagram close friends',
                parameters: [
                    {
                        parameterId: 1,
                        title: 'quantity',
                        type: 'number',
                    },
                    {
                        parameterId: 2,
                        title: 'length',
                        type: 'number',
                    },
                    {
                        parameterId: 3,
                        title: 'timescale',
                        type: 'string',
                    },
                ],
            },
        ],
    },
];
