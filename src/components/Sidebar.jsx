import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import SpokeOutlinedIcon from "@mui/icons-material/SpokeOutlined";
import EqualizerRoundedIcon from "@mui/icons-material/EqualizerRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";

const items = [
  { label: "Projects", icon: SpokeOutlinedIcon, link: "/projects" },
  { label: "My Tasks", icon: PlaylistAddCheckRoundedIcon, link: "/my-tasks" },
  { label: "Analytics", icon: EqualizerRoundedIcon, link: "/analytics" },
];

function Sidebar() {
  const [selected, setSelected] = useState(() => {
    return localStorage.getItem("selectedTab") || null;
  });

  useEffect(() => {
    if (selected) {
      localStorage.setItem("selectedTab", selected);
    }
  }, [selected]);

  return (
    <div className="w-[15%] h-screen bg-black p-1 flex ">
      <div className="w-full h-full bg-black text-white py-5 px-3 flex flex-col rounded-md shadow">
        <div className="flex justify-end ">
          <Tooltip title="Add Workspace" placement="bottom" arrow>
            <a
              href="/"
              className="p-2 w-5 h-5 rounded bg-[#2C2C2C] flex items-center justify-center border border-[#2C2C2C] hover:border-blue-900 "
            >
              <AddIcon sx={{ fontSize: 20, color: "white" }} />
            </a>
          </Tooltip>
        </div>
        <h2 className="text-2xl font-bold pb-3 self-center">Workspace 1</h2>
        <div className="w-full bg-gray-700 h-[1px]"></div>
        <div className="mt-4 mb-6 flex flex-col items-center justify-between">
          {items.map((item) => (
            <SidebarItem
              key={item.label}
              tabIcon={item.icon}
              label={item.label}
              link={item.link}
              isActive={selected === item.label}
              onClick={() => setSelected(item.label)}
            />
          ))}
        </div>
        <div className="flex-1">
          <div className="flex flex-col justify-end items-center h-full p-3 rounded-md">
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
