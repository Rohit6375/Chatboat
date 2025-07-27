import React from "react";

function SidebarIcon({ children, label }) {
  return (
    <div className="flex flex-col items-center justify-center w-14 h-14 my-1 cursor-pointer hover:bg-[#23242a] rounded-lg transition-all">
      {children}
      {label && <span className="text-xs text-gray-400 mt-1">{label}</span>}
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="bg-[#1F2120] w-20 min-w-[80px] h-screen hidden md:flex flex-col justify-between items-center py-4 fixed left-0 top-0 z-20 ">
      <div className="flex flex-col items-center gap-4">
      
        <SidebarIcon>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#fff"/><text x="16" y="21" textAnchor="middle" fill="#181A20" fontSize="18" fontFamily="Arial" dy=".3em">P</text></svg>
        </SidebarIcon>
     
        <SidebarIcon>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#23242a] text-white text-2xl">+</div>
        </SidebarIcon>
     
        <SidebarIcon label="Home">
          <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12L12 3l9 9"/><path d="M9 21V9h6v12"/></svg>
        </SidebarIcon>
        <SidebarIcon label="Discover">
          <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        </SidebarIcon>
        <SidebarIcon label="Spaces">
          <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        </SidebarIcon>
      </div>
      <div className="flex flex-col items-center gap-4 mb-2">
       
        <SidebarIcon>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-lg">R</div>
        </SidebarIcon>
       
        <SidebarIcon>
          <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>
        </SidebarIcon>
      
        <SidebarIcon>
          <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14"/><path d="M19 12l-7 7-7-7"/></svg>
        </SidebarIcon>
      </div>
    </aside>
  );
} 