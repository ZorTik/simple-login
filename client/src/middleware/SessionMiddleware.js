import {useCookies} from "react-cookie";
import {Navigate, Outlet} from "react-router-dom";

const SessionRouter = () => {
    const [cookies] = useCookies(['account-token']);
    if(cookies["account-token"] === undefined) {
        return <Navigate to={"/unauthorized"} />;
    }
    return <Outlet />;
}

export default SessionRouter;