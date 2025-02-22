import { Route, Routes } from "react-router-dom";
import { React } from "react";


import Blogs from "./pages/blog/Blogs";
import MainLayout from "./pages/layout/dashboard/MainLayout";
import { ROUTES } from "./routes";
import Error from './pages/Error';


const AppRoutes = () => {

    return (
        <>
            <MainLayout>
                <Routes>
                    {/* Public Routes */}
                    <Route path={ROUTES.HOME_PAGE} element={<Blogs />} />
                    <Route path={ROUTES.BLOGS} element={<Blogs />} />

                    {/* 404 Page */}
                    <Route path="*" element={<Error />} />
                </Routes>
            </MainLayout>
        </>
    );
}

export default AppRoutes;
