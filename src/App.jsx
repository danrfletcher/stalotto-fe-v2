import Header from './components/common/Header.tsx';
import RouterRoutes from './routes/RouterRoutes';
import Footer from './components/common/Footer';
import BackTop from './components/common/BackTop';
import loadingContext from './contexts/loading/loadingContext.jsx';
import { useContext } from 'react';


const App = () => {
  const { isFirstLoad } = useContext(loadingContext);

  return (
    <>
      {isFirstLoad ? null : <Header />}
      <RouterRoutes />
      {isFirstLoad ? null : (
        <>
          <Footer />
          <BackTop />
        </>
      )}
    </>
  );
};

export default App;
