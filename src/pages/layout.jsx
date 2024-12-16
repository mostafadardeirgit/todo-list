import { Outlet } from "react-router-dom";
import Header from "./header";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="bg-gray-800 text-white shadow-md">
        <div className="container mx-auto px-4">
          <Header />
        </div>
      </header>

      {/* Main Content Section */}
      <main className="flex-grow bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </main>

    </div>
  );
}
