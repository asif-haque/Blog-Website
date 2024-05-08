import React from "react";
import { NavLink } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { GoHome, GoHomeFill } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { LuSearch } from "react-icons/lu";

const MobileNav = ({ isOpenNav, navItems, authStatus }) => {
  // console.log(window.location);
  return (
    <div>
      {/* Nav Box */}
      <ul
        className={`md:hidden fixed z-[100] bottom-0 bg-neutral-100 shadow w-full ${
          isOpenNav ? `translate-y-0` : `translate-y-full`
        } transition-all duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        {navItems.map(
          (item) =>
            item.show && (
              <li key={item.name}>
                <NavLink
                  to={item.url}
                  className="py-4 flex justify-center items-center opacity-70 hover:opacity-100"
                >
                  {item.name}
                </NavLink>
              </li>
            )
        )}
        {authStatus && (
          <li className="py-4 flex justify-center items-center">
            <LogoutBtn /> {/* as this has no url, written seperately */}
          </li>
        )}
      </ul>

      {/* Bottom Bar */}
      {authStatus && (
        <div className="md:hidden bg-neutral-200 w-full h-12 fixed bottom-0 z-[80] flex justify-center">
          <div className="m-auto">
            <NavLink to="/">
              {location.pathname === "/" ? (
                <GoHomeFill className="text-2xl" />
              ) : (
                <GoHome className="text-2xl" />
              )}
            </NavLink>
          </div>
          <div className="m-auto">
            <NavLink to="/all-posts">
              {location.pathname === "/all-posts" ? (
                <LuSearch className="text-2xl" />
              ) : (
                <CiSearch className="text-2xl" />
              )}
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
