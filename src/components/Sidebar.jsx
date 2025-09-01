import AddIcon from "@mui/icons-material/Add";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import SidebarItem from "./SidebarItem";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import GroupsIcon from "@mui/icons-material/Groups";
import SpokeOutlinedIcon from "@mui/icons-material/SpokeOutlined";
import EqualizerRoundedIcon from "@mui/icons-material/EqualizerRounded";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";
import Button from "./ui/Button";

import { useNavigate } from "react-router-dom";
import { useWorkspace } from "../Hooks/useWorkspace";

const items = [
  { label: "Dashboard", icon: SpaceDashboardIcon, link: "/" },
  { label: "Workspaces", icon: CategoryIcon, link: "/workspaces" },
  { label: "Projects", icon: SpokeOutlinedIcon, link: "/projects" },
  { label: "My Tasks", icon: PlaylistAddCheckRoundedIcon, link: "/my-tasks" },
  { label: "Team", icon: GroupsIcon, link: "/team" },
  { label: "Analytics", icon: EqualizerRoundedIcon, link: "/analytics" },
];

function Sidebar() {
  const { workspace } = useWorkspace();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <div className="w-[18%] h-screen bg-[#E2E2E2] p-1 flex ">
      <div className="w-full h-full bg-black text-gray-100 py-5 px-3 flex flex-col rounded-xl shadow">
        {/* <div className="flex justify-end ">
          <Tooltip title="Add Workspace" placement="bottom" arrow>
            <a
              href="/"
              className="p-2 w-5 h-5 rounded bg-[#2C2C2C] flex items-center justify-center border border-[#2C2C2C] hover:border-blue-900 "
            >
              <AddIcon sx={{ fontSize: 20, color: "white" }} />
            </a>
          </Tooltip>
        </div> */}
        <h2 className="text-xl font-bold pb-3 self-center">{workspace}</h2>
        <div className="w-full bg-gray-800 h-[1px]"></div>
        <div className="mt-4 mb-6 flex flex-col items-center justify-between">
          {items.map((item) => (
            <SidebarItem
              key={item.label}
              tabIcon={item.icon}
              label={item.label}
              link={item.link}
            />
          ))}
        </div>
        <div className="flex-1">
          <div className="flex flex-col justify-end items-center h-full p-3 rounded-md">
            <Button onClick={handleLogOut} bgcolor={"#333"}>
              Log Out
            </Button>
            <Tooltip title="Settings" placement="right" arrow>
              <a
                href="/"
                className="p-2 w-8 h-8 flex items-center justify-center"
              >
                <SettingsIcon sx={{ fontSize: 28, color: "white" }} />
              </a>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
