import React from "react";
import { Link } from "react-router-dom";
import { LuHexagon, LuPersonStanding, LuSearch } from "react-icons/lu";
import { CiShoppingCart } from "react-icons/ci";
import Button from "../Button";
import Logo from "./Logo";
import {useAppContext} from '../../hooks/useAppContext'
const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const {user, setUser, navigate} = useAppContext();
  const logOut = ()=>{
    setUser(null);
    navigate('/')
  }
  return (
    <nav className="flex items-center justify-between px-2 md:px-5 lg:px-10 xl:px-20 py-4 border-b border-gray-300 bg-gray-50 relative transition-all">
      {/* Logo */}
      <Logo />
      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-3 md:gap-5">
        {[
          { nav: "Home", link: "/" },
          { nav: "All Products", link: "/all-products" },
          { nav: "contact", link: "/contact" },
        ].map((elem, index) => (
          <Link key={index} className="" to={elem.link}>
            {elem.nav}
          </Link>
        ))}
       

        {/* Cart Icon */}
        <div onClick={navigate('/cart')} className="relative cursor-pointer">
          <CiShoppingCart className="text-xl font-semibold" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            3
          </button>
        </div>
       {!user? (<Link to={'/login'} ><Button text={"Login"}/></Link>): (
        <div className="relative group grow cursor-pointer ">
          <img className="w-10" alt="a"/>
          <ul className="hidden text-black group-hover:block absolute top-5 right-0 bg-gray-100 shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-100">
            <li className="p-1.5 pl-3 hover:bg-gray-400 cursor-pointer ">My Orders</li>
            <li onClick={logOut} className="p-1.5 pl-3 hover:bg-gray-400 cursor-pointer ">Logout</li>
          </ul>
       </div>)}
      </div>
      {/* Humber Menue */}
      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-15 left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        {[
          { nav: "Home", link: "/" },
          { nav: "All Products", link: "/all-products" },
          { nav: "contact", link: "/contact" },
        ].map((elem, index) => (
          <Link key={index} className="text-sm ml-1.5 block " to={elem.link}>
            {elem.nav}
          </Link>
        ))}
        {user && <Link to="/">My Orders</Link>}
        {user? <Button onClick={logOut} text={'Logout'} />: <a href="/login">
          <Button text={"Login"} />
        </a>}
      </div>
    </nav>
  );
};
export default Navbar;
