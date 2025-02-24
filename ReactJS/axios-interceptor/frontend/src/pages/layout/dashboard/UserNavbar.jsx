import React from "react";
import { Link } from "react-router-dom";
import LinkCmp from "./LinkCmp";

const UserNavbar = () => {
    return (
        <>
            <nav className="bg-gray-800 text-white mx-auto">
                <div className="container flex flex-wrap items-center justify-between mx-auto py-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse" ><span className="self-center text-2xl font-semibold whitespace-nowrap">Soft-Dev-Journey</span></Link>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                            <LinkCmp url="/blogs" name="Blogs" />
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default UserNavbar;