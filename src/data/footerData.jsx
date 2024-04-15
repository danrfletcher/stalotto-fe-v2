import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa';

export const footMenu = [
    {
        id: 1,
        title: "Help",
        menu: [
            {
                id: 1,
                link: "FAQs",
                path: "/"
            },
            {
                id: 2,
                link: "Check Winning Tickets",
                path: "/"
            },
            {
                id: 3,
                link: "Cancel Order",
                path: "/"
            },
        ]
    },
    {
        id: 2,
        title: "Policies",
        menu: [
            {
                id: 1,
                link: "Cancellation Policy",
                path: "/"
            },
            {
                id: 2,
                link: "Security",
                path: "/"
            },
            {
                id: 3,
                link: "Sitemap",
                path: "/"
            },
            {
                id: 4,
                link: "Privacy Policy",
                path: "/"
            },
            {
                id: 5,
                link: "Terms & Conditions",
                path: "/"
            },
            {
                id: 6,
                link: "Postal Entry Route",
                path: "/postal-entry-route"
            },
        ]
    },
    {
        id: 3,
        title: "Company",
        menu: [
            {
                id: 1,
                link: "About Us",
                path: "/"
            },
            {
                id: 2,
                link: "Contact Us",
                path: "/"
            },
            {
                id: 3,
                link: "Service Centres",
                path: "/"
            },
        ]
    }
];

export const footSocial = [
    {
        id: 1,
        icon: <FaFacebookF />,
        path: "/",
    },
    {
        id: 2,
        icon: <FaTwitter />,
        path: "/",
    },
    {
        id: 3,
        icon: <FaInstagram />,
        path: "/",
    },
    {
        id: 4,
        icon: <FaLinkedinIn />,
        path: "/",
    },
    {
        id: 5,
        icon: <FaTiktok />,
        path: "/",
    }
];
