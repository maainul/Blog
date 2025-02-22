import React from "react";

const SkeletonCard = () => {
    return (
        <>
            <div className="grid grid-cols-3 gap-4 pb-4 w-full">
                {Array(9).fill(0).map((_, index) => (
                    <div
                        key={index}
                        className="bg-white flex flex-col rounded-lg border border-gray-300 animate-pulse"
                    >
                        {/* Skeleton Image */}
                        <div className="h-48 bg-gray-300 rounded-t-lg"></div>

                        {/* Skeleton Text */}
                        <div className="pt-2 pl-4 pb-4 space-y-2">
                            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                            {/* Skeleton Button */}
                            <div className="mt-4 h-10 bg-gray-300 rounded-lg w-32"></div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SkeletonCard;
