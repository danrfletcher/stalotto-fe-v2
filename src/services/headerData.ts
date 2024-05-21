export const dropdownMenu = [
    {
        id: 1,
        link: 'Orders',
        path: '*',
    },
    {
        id: 2,
        link: 'Wishlist',
        path: '*',
    },
    {
        id: 3,
        link: 'Gift Cards',
        path: '*',
    },
    {
        id: 4,
        link: 'Saved Cards',
        path: '*',
    },
    {
        id: 5,
        link: 'Saved Addresses',
        path: '*',
    },
];

export const navPages = [
    // {
    //     name: "Competitions",
    //     path: "/competitions",
    //     children: []
    // },
];

interface NavPage {
    name: string;
    path: string;
    children: NavSubpage[];
}

interface NavSubpage {
    name: string;
    path: string;
}

export interface NavPagesObject {
    navPages: NavPage[];
}

export const getNavPages = async (): Promise<NavPagesObject> => {
    return { navPages: navPages };
};
