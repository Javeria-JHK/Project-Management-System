import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex h-screen w-screen bg-[#E2E2E2] ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-6 bg-[#E2E2E2] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
