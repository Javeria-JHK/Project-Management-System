import Avatar from "./ui/Avatar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "./ui/Badge";
import SearchBar from "./ui/SearchBar";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import PaddedIcon from "./ui/PaddedIcon";
import Tooltip from "@mui/material/Tooltip";
import SelectMenu from "./ui/Select";
import { useWorkspace } from "../hooks/useWorkspace";
import useTheme from "../hooks/useTheme";
import IconButton from "./ui/IconButton";

import { useEffect } from "react";

function Header() {
  const { workspaceId, workspaces, updateWorkspace } = useWorkspace();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    console.log("Current workspace:", workspaceId);
  }, [workspaceId, workspaces]);

  const workspaceItems = workspaces.map((ws) => ({
    id: ws.id,
    label: ws.name,
    value: ws.id,
  }));
  console.log("Available workspaces:", workspaceItems);

  return (
    <header className="w-full h-[10%] p-1 flex ">
      <div className=" bg-gray-100 dark:bg-gray-800 text-white rounded-xl w-full h-full flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center">
          {/* <h2 className="text-xl font-bold">Project Management</h2> */}
          {/* <div className="w-32 h-32  dark:bg-gray-100 bg-red-600"></div> */}
          <SelectMenu
            value={workspaceId}
            header={true}
            height={40}
            placeholder="Select Workspace"
            onChange={(e) => updateWorkspace(e.target.value)}
            items={workspaceItems}
          />
        </div>

        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center relative w-6 h-6 mr-5 cursor-pointer bg-gray-700 hover:bg-gray-600 rounded-md">
            <NotificationsIcon sx={{ fontSize: 18, color: "white" }} />
            <div className="absolute bottom-4 left-4 flex items-center justify-center">
              <Badge text={4} color="red" />
            </div>
          </div>

          <Avatar
            alt="User Img"
            src="https://avatar.iran.liara.run/public/75"
          />
          <div className=" px-2 text-xl text-gray-700">|</div>
          <IconButton
            Icon={theme === "dark" ? LightModeIcon : DarkModeIcon}
            bgColor={"gray"}
            hoverBg={"gray"}
            onClick={toggleTheme}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
