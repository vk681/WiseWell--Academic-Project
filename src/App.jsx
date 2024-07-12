import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/Register";
import Layout from "./Layout";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage";
import Homepage from "./pages/HomePage";
import SingleEvent from "./pages/SingleEvent";
import View from "./pages/View";
import EditPofile from "./pages/EditProfile";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/index" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
          <Route path="/event/:id" element={<SingleEvent />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/edit/:id" element={<EditPofile />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
