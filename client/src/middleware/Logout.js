import {useCookies} from "react-cookie";
import {Navigate} from "react-router-dom";

const Logout = () => {
    const [, , removeCookie] = useCookies(['account-token']);
    removeCookie("account-token");
    return <Navigate to={"/"} />;
};

export default Logout;