import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import SessionMiddleware from "./middleware/SessionMiddleware";
import Main from "./components/Main";
import Logout from "./middleware/Logout";

function App() {
    console.log("test");
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<SessionMiddleware />}>
                <Route index element={<Main />} />
            </Route>
            <Route path={"/logout"} element={<Logout />} />
            <Route path="/auth/:action" element={<Login />} />
            <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
