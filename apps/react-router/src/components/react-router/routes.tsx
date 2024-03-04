import type { RouteObject } from 'react-router-dom';
import {Link, Routes} from 'react-router-dom'

// Home
import HomePage from "./pages/home";

// Dashboard
import DashboardLayout from "./pages/dashboard/layout";
import DisplayPage from "./pages/dashboard/settings/display";
import {loader as informationLoader} from "./pages/dashboard/settings/information";
import InformationSkeleton from "./pages/dashboard/settings/information-skeleton";

// Only for src/components/react-router module
function ModuleRoutes() {
    return <Routes />
}

export const routes:  RouteObject[] = [
    { path: '/home', Component: HomePage },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: 'settings',
                children: [
                    {
                        index: true,
                        element: (
                            <>
                                <h1>Settings Index Page</h1>
                                <Link to='display'>Go to settings - display</Link>
                            </>
                        ),
                    },
                    {
                        path: 'display',
                        element: <DisplayPage />,
                    },
                    {
                        path: 'information/:userId',
                        loader: informationLoader,
                        hydrateFallbackElement: <InformationSkeleton />,
                        async lazy() {
                            const { Page: InformationPage } = await import("./pages/dashboard/settings/information")
                            return { Component: InformationPage };
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        element: <ModuleRoutes />
    }
]
