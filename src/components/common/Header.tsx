import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { dropdownMenu } from '../../data/headerData.js';
import commonContext from '../../contexts/common/commonContext.jsx';
import cartContext from '../../contexts/cart/cartContext.jsx';
import AccountForm from '../form/AccountForm.jsx';
import SearchBar from './SearchBar.jsx';
import { NavPages } from './NavPages.js';
import userContext from '../../contexts/user/userContext.jsx';
import { logoutUser } from '../../services/userAccountApi.js';
import { BarLoader } from 'react-spinners';

const Header = () => {

    const { formUserInfo, toggleForm, toggleSearch, setCurrentHash, currentHash, setFormUserInfo } = useContext(commonContext);
    const { user, isLoggedIn, token, setUserDefaults } = useContext(userContext);
    const { modifyLoginWorkflowState } = useContext(userContext);
    const { cartItems } = useContext(cartContext);
    const [isSticky, setIsSticky] = useState(false);
    const [cartQuantity, setCartQuantity] = useState(0);

    const {firstName} = user;

    const [logoutPending, setLogoutPending] = useState(false);

    // handle the sticky-header
    useEffect(() => {
        const handleIsSticky = () => window.scrollY >= 50 ? setIsSticky(true) : setIsSticky(false);
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
    },[currentHash])

    useEffect(() => {
        let totalCartQtd = 0
        const getCartQuantity = cartItems.map(cartItem => totalCartQtd += cartItem.quantity);
        setCartQuantity(getCartQuantity);
    },[cartItems])

    const handleLogout = async () => {
        try {
            setLogoutPending(true);
            const logout = await logoutUser(token);
            if (logout) {
                setFormUserInfo('');
                setUserDefaults();
                setLogoutPending(false);
            } else {
                setLogoutPending(false);
                modifyLoginWorkflowState("ServerError");
                toggleForm(true);
            }
        } catch (err) {
            setLogoutPending(false);
            modifyLoginWorkflowState("ServerError");
            toggleForm(true);
        }
    }

    return (
        <>
            <header onClick={handleHashChange} id="header" className={isSticky ? 'sticky' : ''}>
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
                                <Link to="/cart">
                                    <AiOutlineShoppingCart />
                                    {
                                        cartQuantity > 0 && (
                                            <span className="badge">{cartQuantity}</span>
                                        )
                                    }
                                </Link>
                                <div className="tooltip">Cart</div>
                            </div>

                            <div className="user_action">
                                <span>
                                    <AiOutlineUser />
                                </span>
                                <div className="dropdown_menu">
                                    <h4>Hello! {formUserInfo && <Link to="*">&nbsp;{firstName}</Link>}</h4>
                                    <p>Access account and manage orders. Password reset is coming soon. For now, email admin@stalotto.com for help.</p>
                                    {
                                        !formUserInfo && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    modifyLoginWorkflowState("None");
                                                    toggleForm(true);
                                                }}
                                            >
                                                Login / Signup
                                            </button>
                                        )
                                    }
                                    {isLoggedIn ? (
                                        <>
                                            <div className="separator"></div>
                                            <ul>
                                                {
                                                    dropdownMenu.map(item => {
                                                        const { id, link, path } = item;
                                                        return (
                                                            <li key={id}>
                                                                <Link to={path}>{link}</Link>
                                                            </li>
                                                        );
                                                    })
                                                }
                                            </ul>
                                            <div className="separator"></div>
                                            <ul>
                                                <li className="logout" key="logout" onClick={handleLogout}>
                                                        <p className="logout_text">Logout </p>
                                                        {
                                                            logoutPending && (
                                                                <BarLoader color="#a9afc3" /> 
                                                            )
                                                        }     
                                                </li>
                                            </ul>
                                        </>
                                    ) : ""}
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