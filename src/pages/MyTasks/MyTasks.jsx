import { useParams, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWorkspace } from "../../hooks/useWorkspace";
import { useTasks } from "../../hooks/useTasks";
import SearchBar from "../../components/ui/SearchBar";
import MyTasksListView from "./MyTaskListView";
import { useStore } from "../../hooks/useStore";

// const tasksData = [
//   {
//     id: 1,
//     title: "Setup Vite project",
//     status: "To Do",
//     projectName: "Personal Portfolio Website",
//     workspaceId: "My Workspace",
//     comments: 0,
//     description: "Setup Vite project structure",
//     dueDate: "25 Aug",
//     priority: "Normal",
//   },
//   {
//     id: 2,
//     title: "Add Hero Section",
//     status: "To Do",
//     projectName: "Personal Portfolio Website",
//     workspaceId: "My Workspace",
//     comments: 2,
//     description: "Build hero section",
//     dueDate: "20 Aug",
//     priority: "High",
//   },
//   {
//     id: 3,
//     title: "Setup Database",
//     status: "In Progress",
//     projectName: "E-commerce Website",
//     workspaceId: "My Workspace",
//     comments: 3,
//     description: "Configure Postgres DB",
//     dueDate: "28 Aug",
//     priority: "Urgent",
//   },
//   {
//     id: 4,
//     title: "Implement Auth",
//     status: "Completed",
//     projectName: "E-commerce Website",
//     workspaceId: "My Workspace",
//     comments: 1,
//     description: "JWT-based authentication",
//     dueDate: "30 Aug",
//     priority: "High",
//   },
//   {
//     id: 5,
//     title: "Do Something",
//     status: "To Do",
//     projectName: "E-commerce Website",
//     workspaceId: "Wanclouds Inc.",
//     comments: 1,
//     description: "A Task to do something",
//     dueDate: "30 Aug",
//     priority: "High",
//   },
// ];

function MyTasks() {
  const { taskId } = useParams();
  // const { workspaceId } = useWorkspace();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("name");
  const { userTasks, getTasksByUser } = useTasks();
  const { state } = useStore();

  useEffect(() => {
    const user =
      state.auth.user || JSON.parse(localStorage.getItem("user") || "{}");
    console.log("Current user:", user);
    console.log("current user id :", user?.name);

    if (user.id) {
      getTasksByUser(user.id);
    }
  }, [state.userTasks.length]);

  const filters = [
    { value: "name", label: "By Name" },
    { value: "priority", label: "By Priority" },
    { value: "projectName", label: "By Project" },
  ];

  const filteredTasks =
    userTasks?.filter((task) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();

      if (searchFilter === "name") {
        return task.title.toLowerCase().includes(query);
      }
      if (searchFilter === "projectName") {
        return task.projectName.toLowerCase().includes(query);
      }
      if (searchFilter === "priority") {
        return task.priority.toLowerCase().includes(query);
      }
      return true;
    }) || [];

  return (
    <div className="px-2">
      <div className="flex justify-start gap-10 mb-4 items-start">
        <h2 className="text-2xl font-bold text-black">My Tasks</h2>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          filters={filters}
          rounded={true}
          border={false}
        />
      </div>

      <MyTasksListView tasks={filteredTasks} taskId={taskId} />

      <Outlet />
    </div>
  );
}

export default MyTasks;
