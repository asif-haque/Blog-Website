import React from "react";
import { NavLink } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { GoHome, GoHomeFill } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { LuSearch } from "react-icons/lu";

const MobileNav = ({ isOpenNav, navItems, authStatus }) => {

  return (
    <div>
      {/* Nav Box */}
      <ul
        className={`lg:hidden fixed z-[100] bottom-0 bg-neutral-100 dark:bg-neutral-900 shadow w-full ${
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
        <div className="lg:hidden bg-neutral-200 dark:bg-neutral-900 w-full h-12 md:h-16 fixed bottom-0 z-[80] flex justify-center">
          <div className="m-auto">
            <NavLink to="/">
              {window.location.pathname === "/" ? (
                <GoHomeFill className="text-2xl dark:text-white" />
              ) : (
                <GoHome className="text-2xl" />
              )}
            </NavLink>
          </div>
          <div className="m-auto">
            <NavLink to="/all-posts">
              {window.location.pathname === "/all-posts" ? (
                <LuSearch className="text-2xl dark:text-white" />
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
