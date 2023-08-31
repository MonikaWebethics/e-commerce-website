import { NavBar } from "./NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <ToastContainer />
      {children}
    </>
  );
};
