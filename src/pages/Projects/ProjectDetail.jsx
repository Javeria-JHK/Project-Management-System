import { useParams, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import TasksKanban from "./components/TasksKanban";
import TasksListView from "./components/TasksListView";
import GroupIcon from "@mui/icons-material/Group";
import ListIcon from "@mui/icons-material/List";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import SearchBar from "../../components/ui/SearchBar";
import Button from "../../components/ui/Button";
import MemberList from "./components/MembersList";
import { useNavigate, useLocation } from "react-router-dom";
import { useTasks } from "../../hooks/useTasks";
import { useStore } from "../../hooks/useStore";
import { useProjects } from "../../hooks/useProjects";
import useTheme from "../../hooks/useTheme";

const members = [
  { value: "Alice" },
  {
    value: "Bob",
  },
];

const workspaceMembers = [
  { id: 1, name: "Alice", email: "alice@email.com" },
  { id: 2, name: "Bob", email: "bob@email.com" },
  { id: 3, name: "Charlie", email: "charlie@email.com" },
  { id: 4, name: "Alpha", email: "alpha@email.com" },
  { id: 5, name: "Bravo", email: "bravo@email.com" },
  { id: 6, name: "Beta", email: "beta@email.com" },
];

function ProjectDetail() {
  const { id, taskId } = useParams();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selectedTab, setSelectedTab] = useState("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("name");
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { getProjectById, getProjects, projects } = useProjects();
  const navigate = useNavigate();
  const { getTasksByProject, tasks } = useTasks();

  const { state } = useStore();
  const { project } = state;
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);

  const isMembersPage = location.pathname.endsWith("/members");

  const filters = [
    { value: "name", label: "By Name" },
    {
      value: "priority",
      label: "By Priority",
    },
    {
      value: "assignee",
      label: "By Assignee",
    },
  ];

  useEffect(() => {
    if (projects.length === 0) {
      getProjects();
    }
    getTasksByProject(id);
    setOpen(isMembersPage);
    getProjectById(id);
  }, [id, isMembersPage, tasks.length]);

  const filteredTasks =
    tasks.filter((task) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();

      if (searchFilter === "name") {
        return task.title.toLowerCase().includes(query);
      }
      if (searchFilter === "assignee") {
        return task.assignee_id.toLowerCase().includes(query);
      }
      if (searchFilter === "priority") {
        return task.priority.toLowerCase().includes(query);
      }

      return true;
    }) || [];

  const handleClose = () => {
    setOpen(false); // triggers AnimatePresence exit
    setTimeout(() => {
      navigate(`/projects/${id}`);
    }, 300);
  };

  const getIconColor = (tab) => {
    if (selectedTab === tab) {
      return isDark ? "#FFFFFF" : "#18213B";
    } else {
      return isDark ? "#9CA3AF" : "#6B7280";
    }
  };

  return (
    <div className="p-1 relative">
      {/* <MemberList members={project.members} /> */}
      <div className="flex justify-between items-start">
        <h2 className="font-bold text-xl text-gray-800 dark:text-white">
          {project.currentProject?.name || "Project Name"}
        </h2>
        <div>
          {successAlert && (
            <div className="absolute top-0 right-0 transform -translate-x-1/2 mt-4 px-4 py-2 bg-green-100 text-green-500 text-md rounded-lg border-1 border-green-300">
              <p>{successAlert}</p>{" "}
            </div>
          )}
          {errorAlert && (
            <div className="absolute top-0 right-0 transform -translate-x-1/2 mt-4 px-4 py-2 bg-red-100 text-red-500 text-md rounded-lg border-1 border-red-300">
              <p>{errorAlert}</p>{" "}
            </div>
          )}
        </div>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          filters={filters}
          rounded={true}
          border={false}
        />

        {/* <Link to="">
          <div className="flex items-center gap-2 bg-gray-300 py-1 px-2 rounded-md mr-4 border-1 border-gray-900 cursor-pointer hover:bg-gray-50">
            <GroupIcon sx={{ fontSize: 24, color: "black" }} />
            <p className="text-gray-900 font-semibold"> Members</p>
          </div>
        </Link> */}
        <Button
          width="w-34"
          height={"h-10"}
          bgcolor="accent"
          onClick={() => {
            setOpen(true);
            navigate(`/projects/${id}/members`);
          }}
        >
          <GroupIcon sx={{ fontSize: 24, color: "white" }} />
          <p className="text-white font-semibold ml-2"> Members</p>
        </Button>
      </div>

      {/* Tabs */}

      <div className="flex justify-start gap-4 mt-1">
        <div
          className={`flex gap-1 font-semibold cursor-pointer ${
            selectedTab === "kanban"
              ? "border-b-3 border-[#499E8E] text-gray-800 dark:text-gray-100"
              : "text-gray-700 dark:text-gray-400"
          }`}
          onClick={() => {
            setSelectedTab("kanban");
          }}
        >
          <ViewKanbanIcon
            sx={{ fontSize: 24, color: getIconColor("kanban") }}
          />
          <p>Kanban</p>
        </div>
        <div
          className={`flex gap-1 font-semibold cursor-pointer ${
            selectedTab === "list"
              ? "border-b-3 border-[#499E8E] text-gray-800 dark:text-gray-100 "
              : "text-gray-700 dark:text-gray-400"
          }`}
          onClick={() => {
            setSelectedTab("list");
          }}
        >
          <ListIcon
            sx={{
              fontSize: 24,
              color: getIconColor("list"),
            }}
          />
          <p>List</p>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-400 rounded "></div>

      {tasks.length === 0 ? (
        <p className="p-4 italic text-gray-500">No Tasks Found</p>
      ) : selectedTab === "kanban" ? (
        <TasksKanban
          tasks={filteredTasks}
          members={members}
          taskId={taskId}
          projectId={id}
          setSuccessAlert={setSuccessAlert}
          setErrorAlert={setErrorAlert}
        />
      ) : (
        <TasksListView
          tasks={filteredTasks}
          setSuccessAlert={setSuccessAlert}
          setErrorAlert={setErrorAlert}
          members={members}
          taskId={taskId}
          projectId={id}
        />
      )}

      <Outlet />

      <MemberList
        open={open}
        onClose={handleClose}
        projectMembers={workspaceMembers}
        workspaceMembers={workspaceMembers}
        // onAddMember={(member) =>
        //   setProject((p) => ({ ...p, members: [...p.members, member] }))
        // }
        // onRemoveMember={(id) =>
        //   setProject((p) => ({
        //     ...p,
        //     members: p.members.filter((m) => m.id !== id),
        //   }))
        // }
      />
    </div>
  );
}

export default ProjectDetail;
