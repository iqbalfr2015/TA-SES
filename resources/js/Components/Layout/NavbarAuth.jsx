import React, { useState, useEffect } from "react";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 bg-blue-600 h-16 ${
                isScrolled ? "shadow-md" : "" // Hanya tambahkan shadow saat di-scroll
            }`}
        >
            <div className="container mx-32 py-3 flex items-center">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <a href="/">
                        <h1 className="text-white text-3xl font-bold">Smart Exam</h1>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;