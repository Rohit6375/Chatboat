import "./globals.css";
import Sidebar from "@components/Sidebar";
const metadata = {
  title: "Chatbot ",
  description: "A simple chatbot application built with Next.js and Redux.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#181A20] text-white">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 flex flex-col items-center justify-center min-h-screen bg-[#181A20]">
        {children}
          </main>
        </div>
      </body> 
    </html>
  );
}
