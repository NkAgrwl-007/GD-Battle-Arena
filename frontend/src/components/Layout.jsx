// components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 ml-60 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-6 bg-slate-950 text-slate-50">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
