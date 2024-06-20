import Container from "../container/Container";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Logoutbtn from "./LogoutBtn";
import Logo from "../Logo";
import "./Header.css";
import { RxHamburgerMenu } from "react-icons/rx";
import SearchBar from "./SearchBar";
import MobileNav from "./MobileNav";
import MyDarkModeButton from "../MyDarkModeButton";

export default function Header() {
  const [show, setShow] = useState(true);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [search, setSearch] = useState("");
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const inputRef = useRef();

  const navItems = [
    { name: "Home", url: "/", show: true },
    { name: "Login", url: "/login", show: !authStatus },
    { name: "Sign Up", url: "/signup", show: !authStatus },
    { name: "All Posts", url: "/all-posts", show: authStatus },
    { name: "Write", url: "/add-post", show: authStatus },
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    // make a query to the DB
    const searchTerm = search.trim();
    if (searchTerm) {
      navigate(`/search?q=${searchTerm}`);
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    if (!location.href.includes("/search")) {
      setSearch("");
    }
    setIsOpenNav(false);
  }, [location.href]);

  // mobile nav close
  window.addEventListener("click", () => {
    setIsOpenNav(false);
  });

  //  we want to show the bar whenever scrolling up
  let oldScrollY = window.scrollY;
  window.onscroll = () => {
    const newScrollY = window.scrollY;
    if (newScrollY > oldScrollY && oldScrollY > 200) {
      setShow(false);
    }
    if (newScrollY < oldScrollY) {
      setShow(true);
    }
    oldScrollY = newScrollY;
  };
  return (
    <>
      <header
        className={`py-3 bg-[rgba(255,255,255,0.3)] backdrop-blur-sm fixed z-50 w-full top-0 ${
          !show && `hide`
        } border-b dark:bg-[#141414] dark:border-0`}
      >
        <Container>
          <nav className="flex items-center px-2">
            {/* Logo */}
            <div className="md:mr-7 mr-2">
              <Logo width="70px" />
            </div>
            {/* Search Bar */}
            {authStatus && (
              <SearchBar
                handleSearch={handleSearch}
                search={search}
                setSearch={setSearch}
                inputRef={inputRef}
              />
            )}
            {/* Nav */}
            <div className="ml-auto flex gap-5 md:gap-10">
              <MyDarkModeButton />
              <ul className="hidden lg:flex items-center gap-10">
                {navItems.map(
                  (item) =>
                    item.show && (
                      <li key={item.name}>
                        <NavLink
                          to={item.url}
                          className="py-2 flex justify-center items-center opacity-70 hover:opacity-100"
                        >
                          {item.name === "Write" && (
                            <span className="material-symbols-outlined mr-2">
                              edit_square
                            </span>
                          )}
                          {item.name}
                        </NavLink>
                      </li>
                    )
                )}
                {authStatus && (
                  <li>
                    <Logoutbtn /> {/* as this has no url, written seperately */}
                  </li>
                )}
              </ul>
              {/* for mobile */}
              <RxHamburgerMenu
                className="lg:hidden text-3xl ml-auto mr-2"
                onClick={(e) => {
                  setIsOpenNav(!isOpenNav);
                  e.stopPropagation();
                }}
              />
            </div>
          </nav>
        </Container>
      </header>

      {/* Mobile Nav*/}
      <MobileNav
        isOpenNav={isOpenNav}
        navItems={navItems}
        authStatus={authStatus}
      />
    </>
  );
}
