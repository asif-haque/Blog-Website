import Container from "../container/Container";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  Link,
  NavLink,
  Navigate,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Logoutbtn from "./LogoutBtn";
import Logo from "../Logo";
import "./Header.css";
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";

export default function Header() {
  const [show, setShow] = useState(true);
  const [search, setSearch] = useState("");
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const inputRef = useRef();

  const navItems = [
    { name: "Home", url: "/", show: true },
    { name: "Login", url: "/login", show: !status },
    { name: "Signup", url: "/signup", show: !status },
    { name: "All Posts", url: "/all-posts", show: status },
    { name: "Write", url: "/add-post", show: status },
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
  }, [location.href]);

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
    <header
      className={`py-3 bg-[rgba(255,255,255,0.3)] backdrop-blur-sm fixed z-50 w-full top-0 ${
        show === false && `hide`
      } border-b`}
    >
      <Container>
        <nav className="flex items-center">
          <div className="mr-7">
            <Logo width="70px" />
          </div>
          <div className="relative">
            <form onSubmit={handleSearch}>
              <input
                className="bg-neutral-100 rounded-full h-[35px] min-w-[80px] outline-none px-9"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                ref={inputRef}
              />
            </form>
            <CiSearch className="text-lg absolute left-3 top-1/2 -translate-y-1/2" />
            {search && (
              <IoIosClose
                className="text-3xl absolute right-2 top-1/2 -translate-y-1/2 text-neutral-600 cursor-pointer"
                onClick={() => setSearch("")}
              />
            )}
          </div>
          <ul className="flex items-center ml-auto gap-10">
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
            {status && (
              <li>
                <Logoutbtn /> {/* as this has no url, written seperately */}
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
