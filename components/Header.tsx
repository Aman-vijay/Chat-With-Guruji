import React from 'react';
import Link from 'next/link';


interface HeaderProps {
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
    return (
        <header className={`w-full py-4 px-6 shadow-lg border-b border-gray-800 ${className}`}>
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-3">
                 
                    <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-green-500 text-transparent bg-clip-text">Chat with Guruji</span>
                </Link>
                
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link href="/" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                                Home
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;