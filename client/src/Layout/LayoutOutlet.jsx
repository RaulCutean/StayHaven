import Header from "../components/Header.jsx"
import {Outlet} from "react-router-dom";
import Footer from "../components/Footer.jsx";

function LayoutOutlet() {
    return(
       <div className="px-16 py-4 min-h-screen">
           <Header />
            <Outlet />
           {/*<Footer />*/}
       </div>

    ) ;
}
export default LayoutOutlet ;