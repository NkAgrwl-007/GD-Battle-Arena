import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <NavBar />
        <main className="p-6 flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
