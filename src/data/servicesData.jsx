import {FaShippingFast, FaShieldAlt, FaTags, FaCreditCard} from 'react-icons/fa';
import { IoTicket } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";

const servicesData = [
    {
        id: 1,
        icon: <AiFillLike />,
        title: "Exclusive Creators & Brands",
        info: "No. 1 for competitions, led by your favourite content creators & brands.",
    },
    {
        id: 2,
        icon: <FaShieldAlt />,
        title: "Unbeatable Prizes",
        info: "Unbeatable prizes & experiences by verified creators & brands only.",
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
        info: "Choose to pay by bank & avoid entering sensitive information .",
    },
];

export default servicesData;