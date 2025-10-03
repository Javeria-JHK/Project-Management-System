import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import { useEffect } from "react";

function Dashboard() {
  const { getWorkspaces } = useWorkspaces();

  useEffect(() => {
    getWorkspaces();
  }, []);

  return (
    <div className="flex h-screen w-screen bg-[#E2E2E2] ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-2 bg-[#E2E2E2] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
