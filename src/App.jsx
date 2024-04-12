import Header from './components/common/Header.tsx';
import RouterRoutes from './routes/RouterRoutes';
import Footer from './components/common/Footer';
import BackTop from './components/common/BackTop';
import loadingContext from './contexts/loading/loadingContext.jsx';
import { useContext } from 'react';
import { useEffect } from 'react';
import useUserAccounts from './hooks/useUserAccounts.js';
import useCartSync from './hooks/useCartSync.ts';

const App = () => {
  const { isFirstLoad, isUserDataLoaded, toggleItemsLoaded } = useContext(loadingContext);
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

      }
      toggleItemsLoaded(['isUserDataLoaded']); //allows page loading to complete

    } catch (err) {
      return;
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
