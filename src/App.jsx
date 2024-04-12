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


const App = () => {
  const { isFirstLoad, isUserDataLoaded, toggleItemsLoaded } = useContext(loadingContext);

  const { handleUserLogin } = useUserAccounts();
  const { updateCartFromId } = useCartSync();

  //Check for user token, silently log in user & update their cart
  const restoreState = async () => {

    const customerCredentials = {
      savedToken: localStorage.userToken ? localStorage.userToken : false,
      savedCartId: localStorage.cartId ? localStorage.cartId : false,
    };
    const { savedToken, savedCartId } = customerCredentials;

    try {
      if (savedToken) {
        const doSilentLogin = await handleUserLogin(localStorage.userToken); //Log user in using token
      } else if (savedCartId) {
        const retrieveAnonymousCart = await updateCartFromId(savedCartId);
      }
      toggleItemsLoaded(['isUserDataLoaded']);

    } catch (err) {

    };
  };

  useEffect(()=> {
    restoreState()
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
