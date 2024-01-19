import {FaShippingFast, FaShieldAlt, FaTags, FaCreditCard} from 'react-icons/fa';
import { IoTicket } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";

const servicesData = [
    {
        id: 1,
        icon: <AiFillLike />,
        title: "4,500 Players",
        info: "No. 1 for brand based competitions.",
    },
    {
        id: 2,
        icon: <FaShieldAlt />,
        title: "Brand Warranty",
        info: "100% Original products, verified creators & brands only.",
    },
    {
        id: 3,
        icon: <IoTicket />,
        title: "Guaranteed Draws",
        info: "Winner guaranteed regardless of how many tickets sold.",
    },
    {
        id: 4,
        icon: <FaCreditCard />,
        title: "Secure Payments",
        info: "Backed by leading payment provider for online competitions with SSL / Secure payments.",
    },
];

export default servicesData;