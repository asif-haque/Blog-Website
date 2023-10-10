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
    <header>
      <Container>
        <nav>
          <div>
            <Logo />
          </div>
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <button onClick={() => navigate(item.url)}>
                  {item.show && item.name}
                </button>
              </li>
            ))}
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
