import Header from './components/common/Header.tsx';
import RouterRoutes from './routes/RouterRoutes';
import Footer from './components/common/Footer';
import BackTop from './components/common/BackTop';
import loadingContext from './contexts/loading/loadingContext.jsx';
import { useContext } from 'react';
import { useEffect } from 'react';
import useUserAccounts from './hooks/useUserAccounts.js';
import useCartSync from './hooks/useCartSync.ts';
import cartContext from './contexts/cart/cartContext.jsx';
import { createAnonymousCart } from './services/cartApi.ts';

const App = () => {
  const { isFirstLoad, isUserDataLoaded, toggleItemsLoaded } = useContext(loadingContext);
  const { setNewCartId } = useContext(cartContext);

  const { handleUserLogin } = useUserAccounts();
  const { syncCart } = useCartSync();

  //Check for user token, silently log in user & update their cart
  const restoreState = async () => {

    //retrieve user data or anonymous cart items
    try {
      if (localStorage.userToken) {

        //if token, get user's credentials
        const doSilentLogin = await handleUserLogin(localStorage.userToken); //Log user in using token

      } else if (localStorage.cartId) {

        //if cart, update local cart from remote cart
        const retrieveAnonymousCart = await syncCart(localStorage.cartId);

      } else {
        //initialize a new empty cart
        const newCart = await createAnonymousCart();
        if (newCart.cartId) {
            localStorage.setItem('cartId', newCart.cartId); //add anonymous cart to localStorage
            await setNewCartId(newCart.cartId); //add to application state
        } else {
            throw new Error('Failed to create a new cart for the anonymous user');
        }

      }
      toggleItemsLoaded(['isUserDataLoaded']); //allows page loading to complete

    } catch (err) {
      throw err;
    };
  };

  //run silent login on first load
  useEffect(()=> {
    if (isFirstLoad) {
      restoreState()
    }
  },[])

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
