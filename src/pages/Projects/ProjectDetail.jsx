import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useWorkspace } from "../../hooks/useWorkspace";
import TasksKanban from "./components/TasksKanban";
import GroupIcon from "@mui/icons-material/Group";
import ListIcon from "@mui/icons-material/List";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import SearchBar from "../../components/ui/SearchBar";

const projectDetails = {
  1: {
    id: 1,
    owner: "Alice",
    workspaceId: "My Workspace",
    name: "Personal Portfolio Website",
    status: "To Do",
    members: [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ],
    tasks: [
      {
        id: 1,
        title: "Setup Vite project",
        status: "To Do",
        assignedTo: "Alice ",
        comments: 0,
        description:
          " This is the description of the task this is the description of the task",
        dueDate: "25 Aug",
        priority: "Normal",
      },
      {
        id: 2,
        title: "Add Hero Section",
        status: "To Do",
        assignedTo: "Bob",
        comments: 2,
        description:
          " This is the description of the task this is the description of the task",
        dueDate: "20 Aug",
        priority: "High",
      },
      {
        id: 3,
        title: "Connect Backend",
        status: "In Progress",
        assignedTo: "Alice",
        comments: 5,
        description:
          " This is the description of the task this is the description of the task",
        dueDate: "5 Sept",
        priority: "Urgent",
      },
      {
        id: 4,
        title: "Deploy on Vercel",
        status: "Completed",
        assignedTo: "Bob",
        comments: 7,
        description:
          " This is the description of the task this is the description of the task",
        dueDate: "25 Sept",
        priority: "Low",
      },
    ],
  },
};

function ProjectDetail() {
  const { id } = useParams();
  const { workspace } = useWorkspace();
  const [selectedTab, setSelectedTab] = useState("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("name");
  const [projectTasks, setProjectTasks] = useState(projectDetails[id].tasks);

  const filters = ["name", "priority", "assignee"];

  const project = projectDetails[id];

  if (!project || project.workspaceId !== workspace) {
    return <p className="p-4 italic text-gray-500">Project Not Found</p>;
  }

  const filteredTasks = projectTasks.filter((task) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();

    if (searchFilter === "name") {
      return task.title.toLowerCase().includes(query);
    }
    if (searchFilter === "assignee") {
      return task.assignedTo.toLowerCase().includes(query);
    }
    if (searchFilter === "priority") {
      return task.priority.toLowerCase().includes(query);
    }

    return true;
  });

  return (
    <div className="p-1">
      {/* Breadcrumb  */}
      {/* <nav className="text-md text-gray-700 mb-4">
        <Link to="/projects">
          <span className="hover:underline text-gray-800"> Projects</span>
        </Link>
        <span className="mx-2">/</span>
        <span className="font-semibold">{project.name}</span>
      </nav> */}

      {/* <MemberList members={project.members} /> */}
      <div className="flex justify-between items-start">
        <h2 className="font-bold text-xl text-black">{project.name}</h2>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          filters={filters}
        />

        <Link to="">
          <div className="flex items-center gap-2 bg-gray-300 py-1 px-2 rounded-md mr-4 border-1 border-gray-900 cursor-pointer hover:bg-gray-50">
            <GroupIcon sx={{ fontSize: 24, color: "black" }} />
            <p className="text-gray-900 font-semibold"> Members</p>
          </div>
        </Link>
      </div>

      {/* Tabs */}

      <div className="flex justify-start gap-4 mt-1">
        <div
          className={`flex gap-1 font-semibold cursor-pointer ${
            selectedTab === "kanban"
              ? "border-b-3 border-black text-gray-900 "
              : "text-gray-700"
          }`}
          onClick={() => {
            setSelectedTab("kanban");
          }}
        >
          <ViewKanbanIcon
            sx={{
              fontSize: 24,
              color: selectedTab === "kanban" ? "#18213B" : "#343846",
            }}
          />
          <p>Kanban</p>
        </div>
        <div
          className={`flex gap-1 font-semibold cursor-pointer ${
            selectedTab === "list"
              ? "border-b-3 border-black text-gray-900 "
              : "text-gray-700"
          }`}
          onClick={() => {
            setSelectedTab("list");
          }}
        >
          <ListIcon
            sx={{
              fontSize: 24,
              color: selectedTab === "list" ? "#18213B" : "#343846",
            }}
          />
          <p>List</p>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-400 rounded "></div>

      {selectedTab === "kanban" ? (
        <TasksKanban tasks={filteredTasks} setTasks={setProjectTasks} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProjectDetail;
