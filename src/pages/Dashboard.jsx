import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex h-screen w-screen ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
