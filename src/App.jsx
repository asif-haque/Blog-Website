import { useEffect, useState } from "react";
import { authService } from "./appwrite/authService";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";

function App() {
  /* fetching data: 
      1. data, setdata is handled by redux
      2. error is already provided
      3. for loading, gotta use useState 
  */
  // const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
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
      // .catch((error) => {
      //   setError(error);
      // })
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      {loading && <h1>Loading...</h1>}
      {/* {error &&
        <h1>{error}</h1>
        console.log(error)} */}
      <header>
        <Header />
      </header>
      <main>Inside Main</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
