import { useParams, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWorkspace } from "../../hooks/useWorkspace";
import TasksKanban from "./components/TasksKanban";
import TasksListView from "./components/TasksListView";
import GroupIcon from "@mui/icons-material/Group";
import ListIcon from "@mui/icons-material/List";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import SearchBar from "../../components/ui/SearchBar";
import Button from "../../components/ui/Button";
import MemberList from "./components/MembersList";
import { useNavigate, useLocation } from "react-router-dom";

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

const projectDetails = {
  1: {
    id: 1,
    owner: "Alice",
    workspaceId: "My Workspace",
    name: "Personal Portfolio Website",
    status: "To Do",
    members: [
      { id: 1, name: "Alice", email: "alice@email.com" },
      { id: 2, name: "Bob", email: "bob@email.com" },
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
      // {
      //   id: 5,
      //   title: "Deploy on Vercel",
      //   status: "Completed",
      //   assignedTo: "Bob",
      //   comments: 7,
      //   description:
      //     " This is the description of the task this is the description of the task",
      //   dueDate: "25 Sept",
      //   priority: "Low",
      // },
      // {
      //   id: 6,
      //   title: "Deploy on Vercel",
      //   status: "Completed",
      //   assignedTo: "Bob",
      //   comments: 7,
      //   description:
      //     " This is the description of the task this is the description of the task",
      //   dueDate: "25 Sept",
      //   priority: "Low",
      // },
      // {
      //   id: 7,
      //   title: "Deploy on Vercel",
      //   status: "Completed",
      //   assignedTo: "Bob",
      //   comments: 7,
      //   description:
      //     " This is the description of the task this is the description of the task",
      //   dueDate: "25 Sept",
      //   priority: "Low",
      // },
      // {
      //   id: 8,
      //   title: "Deploy on Vercel",
      //   status: "Completed",
      //   assignedTo: "Bob",
      //   comments: 7,
      //   description:
      //     " This is the description of the task this is the description of the task",
      //   dueDate: "25 Sept",
      //   priority: "Low",
      // },
      // {
      //   id: 9,
      //   title: "Deploy on Vercel",
      //   status: "Completed",
      //   assignedTo: "Bob",
      //   comments: 7,
      //   description:
      //     " This is the description of the task this is the description of the task",
      //   dueDate: "25 Sept",
      //   priority: "Low",
      // },
      // {
      //   id: 14,
      //   title: "Connect Backend",
      //   status: "In Progress",
      //   assignedTo: "Alice",
      //   comments: 5,
      //   description:
      //     " This is the description of the task this is the description of the task",
      //   dueDate: "5 Sept",
      //   priority: "Urgent",
      // },
      // {
      //   id: 13,
      //   title: "Connect Backend",
      //   status: "In Progress",
      //   assignedTo: "Alice",
      //   comments: 5,
      //   description:
      //     " This is the description of the task this is the description of the task",
      //   dueDate: "5 Sept",
      //   priority: "Urgent",
      // },
      // {
      //   id: 12,
      //   title: "Connect Backend",
      //   status: "In Progress",
      //   assignedTo: "Alice",
      //   comments: 5,
      //   description:
      //     " This is the description of the task this is the description of the task",
      //   dueDate: "5 Sept",
      //   priority: "Urgent",
      // },
      // {
      //   id: 11,
      //   title: "Connect Backend",
      //   status: "In Progress",
      //   assignedTo: "Alice",
      //   comments: 5,
      //   description:
      //     " This is the description of the task this is the description of the task",
      //   dueDate: "5 Sept",
      //   priority: "Urgent",
      // },
      // {
      //   id: 10,
      //   title: "Connect Backend",
      //   status: "In Progress",
      //   assignedTo: "Alice",
      //   comments: 5,
      //   description:
      //     " This is the description of the task this is the description of the task",
      //   dueDate: "5 Sept",
      //   priority: "Urgent",
      // },
    ],
  },
};

function ProjectDetail() {
  const { id, taskId } = useParams();
  const { workspace } = useWorkspace();
  const [selectedTab, setSelectedTab] = useState("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("name");
  const [project, setProject] = useState(projectDetails[id]);
  const [projectTasks, setProjectTasks] = useState(project?.tasks || []);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isMembersPage = location.pathname.endsWith("/members");
  const tasks = projectDetails[id]?.tasks;
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
    setProject(projectDetails[id]);
    setProjectTasks(tasks || []);
    setOpen(isMembersPage);
  }, [id, tasks, isMembersPage]);

  if (!project || project.workspaceId !== workspace) {
    return <p className="p-4 italic text-gray-500">Project Not Found</p>;
  }

  const filteredTasks =
    projectTasks.filter((task) => {
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
    }) || [];

  const updateTasks = (newTasks) => {
    setProjectTasks(newTasks);
    setProject((proj) => ({ ...proj, tasks: newTasks }));
  };

  const handleClose = () => {
    setOpen(false); // triggers AnimatePresence exit
    setTimeout(() => {
      navigate(`/projects/${id}`);
    }, 300); // matches transition duration
  };

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
          bgcolor="lightGray"
          onClick={() => {
            setOpen(true);
            navigate(`/projects/${id}/members`);
          }}
        >
          <GroupIcon sx={{ fontSize: 24, color: "black" }} />
          <p className="text-gray-900 font-semibold ml-2"> Members</p>
        </Button>
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
        <TasksKanban
          tasks={filteredTasks}
          setTasks={updateTasks}
          members={members}
          taskId={taskId}
          projectId={id}
        />
      ) : (
        <TasksListView
          tasks={filteredTasks}
          setTasks={updateTasks}
          members={members}
          taskId={taskId}
          projectId={id}
        />
      )}

      <Outlet />

      <MemberList
        open={open}
        onClose={handleClose}
        projectMembers={project.members}
        workspaceMembers={workspaceMembers}
        onAddMember={(member) =>
          setProject((p) => ({ ...p, members: [...p.members, member] }))
        }
        onRemoveMember={(id) =>
          setProject((p) => ({
            ...p,
            members: p.members.filter((m) => m.id !== id),
          }))
        }
      />
    </div>
  );
}

export default ProjectDetail;
