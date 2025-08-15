import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="w-full py-4 px-6  shadow-md">
            <div className="container mx-auto text-center">
                <p className="text-zinc-400">
                    &copy; {new Date().getFullYear()} Chat with <span className="bg-gradient-to-r from-indigo-400 to-green-500 text-transparent bg-clip-text">Guruji</span>. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
