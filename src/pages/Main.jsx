import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useWorkspaces } from "../hooks/useWorkspaces";
import { useEffect } from "react";

function Main() {
  const { getWorkspaces } = useWorkspaces();

  useEffect(() => {
    getWorkspaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen w-screen dark:bg-[#15191C] bg-[#D9D9D9] ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-2 dark:bg-[#15191C] bg-[#D9D9D9] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
