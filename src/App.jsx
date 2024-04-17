import Header from './components/common/Header.tsx';
import RouterRoutes from './routes/RouterRoutes';
import Footer from './components/common/Footer';
import BackTop from './components/common/BackTop';
import loadingContext from './contexts/loading/loadingContext.jsx';
import { useContext } from 'react';
import { useEffect } from 'react';
import { createAnonymousCart, getCartItems } from './services/cartApi.ts';
import useUserAccounts from './hooks/useUserAccounts.js';
import cartContext from './contexts/cart/cartContext.jsx';

const App = () => {
    const { isFirstLoad, toggleItemsLoaded, isUserDataLoaded, isCartDataLoaded } = useContext(loadingContext);
    const { setCart, productDataReceived, setProductDataState } = useContext(cartContext);
    const { handleUserLogin } = useUserAccounts();
    
    //silently load data the first time the application mounts & when local storage items change.
    const silentlyUpdateCart = async () => {
        try {
            if (localStorage.cartId) {
                const cartItems = await getCartItems();
                setCart(cartItems);
                if (!isCartDataLoaded) {
                    toggleItemsLoaded('isCartDataLoaded');
                }
            }
        } catch (err) {
            console.error('Error: ', err);
        }
        setProductDataState(true);
    };

    useEffect(() => {
        const silentlyLoginUserIfToken = async () => {
            try {
                if (localStorage.userToken) {
                    const login = await handleUserLogin(localStorage.userToken);
                    if (!login) {
                        localStorage.removeItem('userToken');
                        localStorage.removeItem('cartId');
                    }
                }
            } catch (err) {
                console.error('Error: ', err);
                localStorage.removeItem('userToken');
                localStorage.removeItem('cartId');
            }
        };   
        
        const getNewCartIfNone = async () => {
            try {
                if (!localStorage.userToken && !localStorage.cartId) {
                    const newCartId = await createAnonymousCart();
                    localStorage.setItem('cartId', newCartId);
                }
                return createAnonymousCart.cartId;
            } catch (err) {
                console.error('Error: ', err);
            }
        };

        silentlyLoginUserIfToken();
        silentlyUpdateCart();
        getNewCartIfNone();

        toggleItemsLoaded('isUserDataLoaded');
        
    }, [localStorage.userToken, localStorage.cartId]);

    useEffect(() => {
        if (isUserDataLoaded && isCartDataLoaded) {
            toggleItemsLoaded('isSilentDataLoaded');
        }
    }, [isUserDataLoaded, isCartDataLoaded]);

    useEffect(() => {
        silentlyUpdateCart();
    }, [productDataReceived]);

    return (
        <div className="app_container">
            {isFirstLoad ? null : <Header />}
            <div className="main_content">
                <RouterRoutes />
            </div>
            {isFirstLoad ? null : (
                <>
                    <Footer />
                    <BackTop />
                </>
            )}
        </div>
    );
};

export default App;
