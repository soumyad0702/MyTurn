// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Header(){
  return (
    <header className="w-full bg-white/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow">
            Q
          </div>
          <div>
            <div className="text-lg font-semibold">QuickLine</div>
            <div className="text-xs text-gray-500">Smart Queue & ETA</div>
          </div>
        </div>

        <nav className="flex items-center gap-4 text-sm">
          <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          <a href="#" className="text-gray-700 hover:text-gray-900">About</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Docs</a>
        </nav>
      </div>
    </header>
  );
}
