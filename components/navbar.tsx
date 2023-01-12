import classNames from "classnames";
import { browser } from "process";
import React, { useEffect, useState, useCallback } from "react";

const Navbar = () => {
    const [_scrollY, setScrollY] = useState(0);

    const onScroll = useCallback(() => {
        const { scrollY } = window;
        setScrollY(scrollY);
        console.log(scrollY)
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
    });

    const styles = classNames("border-t-4 border-orange-700 bg-nav-pink w-full p-5 text-white text-lg shadow-md flex flex-row justify-center", {
        "sticky top-0 p-2 !w-screen z-20": _scrollY > 0
    });

    return (
        <div className={styles}>
            <div className="max-w-5xl w-full flex flex-row justify-between">
                <header className="flex flex-col">
                    <h1 className="font-semibold">Channel</h1>
                    <span className="italic font-base text-sm text-white/70">By Aquaducts</span>
                </header>

                <div className="justify-end items-center flex">
                    <button onClick={() => window.open("https://ci.yiff.day/api/oauth/login?service=github", "_")} className="flex-1 px-4 py-1 bg-orange-500 text-white transition-all duration-200 rounded-[0.250rem] hover:bg-orange-600 active:bg-orange-700">Login</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar;