import React from "react";

const SkeletonSidebar = () => {
    return (
        <>
            <div className="w-full">
                {Array(3).fill(0).map((_, index) => (
                    <div className="animate-pulse space-y-4 pb-2" key={index}>
                        <div className="h-10 bg-gray-300 rounded"></div>
                        <div className="h-10 bg-gray-300 rounded"></div>
                        <div className="h-10 bg-gray-300 rounded"></div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SkeletonSidebar;
