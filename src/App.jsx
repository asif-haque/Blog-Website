import { useEffect, useState } from "react";
import { authService } from "./appwrite/authService";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/features/authSlice";
// import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Protected from "./components/Protected";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AllPosts from "./pages/AllPosts";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import Loading from "./components/Loading";
import Search from "./pages/Search";
import toast, { Toaster } from "react-hot-toast";

function App() {
  /* fetching data: 
      1. data, setdata is handled by redux
      2. error is already provided
      3. for loading, gotta use useState 
  */
  const [loading, setLoading] = useState(true);
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();

  // calling for userData
  useEffect(() => {
    authService
      .getAccount()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData })); // i.e. my setData()
        } else {
          dispatch(logout()); // if the user not found, stay logged out
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className={`min-h-screen ${
        isDark && `dark`
      } dark:bg-[#282828] dark:text-white`}
    >
      <Loading loading={loading} />

      <header>
        <Header />
        <div className="h-[4.5rem]"></div>
        <Toaster
          toastOptions={{
            style: {
              position: "relative",
              top: "12vh",
            },
          }}
        />
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <Protected authentication={false}>
              <Login />
            </Protected>
          }
        />
        <Route
          path="/signup"
          element={
            <Protected authentication={false}>
              <Signup />
            </Protected>
          }
        />
        <Route
          path="/all-posts"
          element={
            <Protected authentication>
              <AllPosts />
            </Protected>
          }
        />
        <Route
          path="/add-post"
          element={
            <Protected authentication>
              <AddPost />
            </Protected>
          }
        />
        <Route
          path="/edit-post/:slug"
          element={
            <Protected authentication>
              <EditPost />
            </Protected>
          }
        />
        <Route
          path="/post/:slug"
          element={
            <Protected authentication>
              <Post />
              {/* But I want someone to read a blog with or without authentication */}
            </Protected>
          }
        />
        <Route
          path="/search"
          element={
            <Protected authentication>
              <Search />
              {/* But I want someone to read a blog with or without authentication */}
            </Protected>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
