import Container from "../container/Container";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import Logoutbtn from "./LogoutBtn";
import Logo from "../Logo";
import "./Header.css";

export default function Header() {
  const [show, setShow] = useState(true);
  const status = useSelector((state) => state.auth.status);

  const navItems = [
    { name: "Home", url: "/", show: true },
    { name: "Login", url: "/login", show: !status },
    { name: "Signup", url: "/signup", show: !status },
    { name: "All Posts", url: "/all-posts", show: status },
    { name: "Write", url: "/add-post", show: status },
  ];
  //  we want to show the bar whenever scrolling up
  let oldScrollY = window.scrollY;
  window.onscroll = () => {
    const newScrollY = window.scrollY;
    if (newScrollY > oldScrollY) {
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
      }`}
    >
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Logo width="70px" />
          </div>
          <ul className="flex ml-auto gap-10">
            {navItems.map(
              (item) =>
                item.show && (
                  <li key={item.name}>
                    <NavLink
                      to={item.url}
                      className="h-full w-full flex justify-center items-center"
                    >
                      {item.name === "Write" && (
                        <span className="material-symbols-outlined mr-1">
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
