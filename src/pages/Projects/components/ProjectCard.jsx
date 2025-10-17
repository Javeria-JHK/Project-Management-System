import { useState } from "react";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useTheme from "../../../hooks/useTheme";
import {
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PaddedIcon from "../../../components/ui/PaddedIcon";

function ProjectCard({ project, onEdit, onDelete }) {
  const { theme } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isDark = theme === "dark";
  const handleMenuOpen = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const statusColors = {
    Completed: "bg-green-100 text-green-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    "In Review": "bg-blue-100 text-blue-700",
    "To Do": "bg-gray-300 text-gray-800",
    active: "bg-gray-300 text-gray-800",
  };
  return (
    <div className="rounded-2xl shadow-md hover:shadow-lg transition-all bg-white dark:bg-[#0E1012] w-96 ">
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Link to={`/projects/${project.id}`}>
            <h3 className="text-lg font-bold  text-gray-800 dark:text-gray-300 flex items-center gap-2 cursor-pointer">
              {project.name}
            </h3>
          </Link>
          <div>
            <span
              className={`text-xs font-semibold dark:bg-[#15191C] dark:text-gray-200 px-2 py-1 rounded-full mr-1 ${
                statusColors[project.status]
              }`}
            >
              {project.status}
            </span>

            {/* More menu button */}

            <MoreVertIcon
              onClick={handleMenuOpen}
              className="cursor-pointer text-black dark:text-white"
            />

            {/* Dropdown menu */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                sx: {
                  backgroundColor: isDark ? "#15191C" : "#ffffff",
                  color: isDark ? "#f3f4f6" : "#111827",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // optional
                  borderRadius: "8px",
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  onEdit();
                }}
              >
                <ListItemIcon>
                  <PaddedIcon
                    Icon={EditIcon}
                    bgColor="lightGray"
                    bgHover="lightGray"
                  />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  onDelete();
                }}
              >
                <ListItemIcon>
                  <PaddedIcon Icon={DeleteIcon} bgColor="lightGray" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </Menu>
          </div>
        </div>
        <Link to={`/projects/${project.id}`}>
          <p className="text-sm text-gray-600 dark:text-[#838383] line-clamp-2 h-10 cursor-pointer">
            {project.description}
          </p>

          <div className="flex justify-between text-sm text-gray-500 mt-6 cursor-pointer">
            <div className="flex items-center dark:text-[#838383] gap-2">
              <GroupIcon className="text-red-900 " sx={{ fontSize: 24 }} />
              {project.members || 1} members
            </div>
            <div className="flex items-center text-sm text-gray-500  dark:text-[#838383] gap-2">
              <PaddedIcon
                Icon={AssignmentIcon}
                bgColor={"lightGray"}
                color={"text-gray-800 dark:text-gray-400"}
              />

              <p className="font-semibold">{project.tasks || 0} tasks</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
