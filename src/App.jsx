import { authService } from "./appwrite/auth";
import { config } from "./config/config";

function App() {
  console.log(authService.account);


  return null;
}

export default App;
