import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <div>
            <h1>Dashboard Layout</h1>

            {/* `<Outlet />` should be used in parent route elements to render their child route elements */}
            <Outlet />
        </div>
    )
}

export default Layout;