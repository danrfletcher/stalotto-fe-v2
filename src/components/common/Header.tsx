import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AiOutlineSearch,
    AiOutlineShoppingCart,
    AiOutlineUser,
} from 'react-icons/ai';
import { dropdownMenu } from '../../data/headerData.js';
import commonContext from '../../contexts/common/commonContext.jsx';
import cartContext from '../../contexts/cart/cartContext.jsx';
import AccountForm from '../form/AccountForm.jsx';
import SearchBar from './SearchBar.jsx';
import { NavPages } from './NavPages.js';
import userContext from '../../contexts/user/userContext.jsx';
import { BarLoader, PuffLoader } from 'react-spinners';
import useUserAccounts from '../../hooks/useUserAccounts.js';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { toggleForm, toggleSearch, setCurrentHash, currentHash } =
        useContext(commonContext);
    const { user, isLoggedIn } = useContext(userContext);
    const { modifyLoginWorkflowState } = useContext(userContext);
    const { cartItems, cartIsUpdating } = useContext(cartContext);
    const [isSticky, setIsSticky] = useState(false);
    const [cartQuantity, setCartQuantity] = useState(0);
    const { handleUserLogout } = useUserAccounts();
    const { firstName } = user;
    const [logoutPending, setLogoutPending] = useState(false);
    const navigate = useNavigate();

    // handle the sticky-header
    useEffect(() => {
        const handleIsSticky = () =>
            window.scrollY >= 50 ? setIsSticky(true) : setIsSticky(false);
        window.addEventListener('scroll', handleIsSticky);

        return () => {
            window.removeEventListener('scroll', handleIsSticky);
        };
    }, [isSticky]);

    // handling smooth navigation to new hash on same page
    const handleHashChange = () => {
        setCurrentHash(window.location.hash);
    };

    useEffect(() => {
        handleHashChange();
    }, [currentHash]);

    useEffect(() => {
        let totalCartQtd = cartItems.reduce(
            (acc, cur) => acc + cur.quantity,
            0,
        );
        setCartQuantity(totalCartQtd);
    }, [cartItems]);

    const handleLogout = async () => {
        try {
            setLogoutPending(true);
            await handleUserLogout();
        } catch (err) {
            return;
        }
        setLogoutPending(false);
    };

    // ensure cart icon will not allow cart component to mount if cart update is in progress
    const [enableCartSpinner, setEnableCartSpinner] = useState<boolean>(false);

    const waitThenLoadCart = () => {
        //enable loading spinner when cart icon is clicked - wait for cart items to be fully updated
        if (cartIsUpdating) {
            setEnableCartSpinner(true);
        } else {
            navigate('/cart');
        }
    };

    useEffect(() => {
        //navigate the user to the cart once the update is completed if they clicked on the cart previously
        if (enableCartSpinner) {
            navigate('/cart');
            setEnableCartSpinner(false);
        }
    }, [cartIsUpdating]);

    return (
        <>
            <header
                onClick={handleHashChange}
                id="header"
                className={isSticky ? 'sticky' : ''}
            >
                <div className="container">
                    <div className="navbar">
                        <h2 className="nav_logo">
                            <Link to="/">
                                <img src="/logo.png" />
                                <h4>Stalotto</h4>
                            </Link>
                        </h2>
                        <NavPages />
                        <nav className="nav_actions">
                            <div className="search_action">
                                <span onClick={() => toggleSearch(true)}>
                                    <AiOutlineSearch />
                                </span>
                                <div className="tooltip">Search</div>
                            </div>

                            <div className="cart_action">
                                {/* <Link to={enableCartSpinner ? "" : "/cart"} onClick={() => { */}
                                <button
                                    className="cart_button"
                                    onClick={waitThenLoadCart}
                                >
                                    {!enableCartSpinner && (
                                        <div className="cart_icon_loader">
                                            <div className="cart_icon">
                                                <AiOutlineShoppingCart />
                                                {cartQuantity > 0 && (
                                                    <span className="badge">
                                                        {cartQuantity}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {enableCartSpinner && (
                                        <PuffLoader
                                            color="#a9afc3"
                                            size="2rem"
                                            cssOverride={{ marginLeft: 5 }}
                                        />
                                    )}
                                </button>
                                {/* </Link> */}
                                <div className="tooltip">Cart</div>
                            </div>

                            <div className="user_action">
                                <span>
                                    <AiOutlineUser />
                                </span>
                                <div className="dropdown_menu">
                                    <h4>
                                        Hello!{' '}
                                        {user.firstName && (
                                            <Link to="*">
                                                &nbsp;{firstName}
                                            </Link>
                                        )}
                                    </h4>
                                    <p>
                                        Email admin@stalotto.com if you need
                                        help.
                                    </p>
                                    {!user.firstName && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                modifyLoginWorkflowState(
                                                    'None',
                                                );
                                                toggleForm(true);
                                            }}
                                        >
                                            Login / Signup
                                        </button>
                                    )}
                                    {isLoggedIn ? (
                                        <>
                                            <div className="separator"></div>
                                            <ul>
                                                {dropdownMenu.map((item) => {
                                                    const { id, link, path } =
                                                        item;
                                                    return (
                                                        <li key={id}>
                                                            <Link to={path}>
                                                                {link}
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                            <div className="separator"></div>
                                            <ul>
                                                <li
                                                    className="logout"
                                                    key="logout"
                                                    onClick={handleLogout}
                                                >
                                                    <p className="logout_text">
                                                        Logout{' '}
                                                    </p>
                                                    {logoutPending && (
                                                        <BarLoader color="#a9afc3" />
                                                    )}
                                                </li>
                                            </ul>
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            <SearchBar />
            <AccountForm />
        </>
    );
};

export default Header;
