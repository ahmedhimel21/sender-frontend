import Navbar from '../Components/Shared/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Shared/Footer';

const Main = () => {
  return (
    <>
     <Navbar></Navbar> 
     <Outlet></Outlet>
     <Footer></Footer>
    </>
  );
};

export default Main;