import Header from './components/common/Header.tsx';
import RouterRoutes from './routes/RouterRoutes';
import Footer from './components/common/Footer';
import BackTop from './components/common/BackTop';
import loadingContext from './contexts/loading/loadingContext.jsx';
import { useContext } from 'react';


const App = () => {
  const { isFirstLoad } = useContext(loadingContext);

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
