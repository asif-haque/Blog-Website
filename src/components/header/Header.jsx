import Container from "../container/Container";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logoutbtn from "./LogoutBtn";
import Logo from "../Logo";

export default function Header() {
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", url: "/", show: true },
    { name: "Login", url: "/login", show: !status },
    { name: "Signup", url: "/signup", show: !status },
    { name: "All Posts", url: "/all-posts", show: status },
    { name: "Add Post", url: "/add-post", show: status },
  ];
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Logo width="70px" />
          </div>
          <ul className="flex ml-auto">
            {navItems.map(
              (item) =>
                item.show && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.url)}
                      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {item.name}
                    </button>
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
