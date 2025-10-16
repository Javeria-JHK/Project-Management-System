import { useParams, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWorkspace } from "../../hooks/useWorkspace";
import { useTasks } from "../../hooks/useTasks";
import SearchBar from "../../components/ui/SearchBar";
import MyTasksListView from "./MyTaskListView";
import { useStore } from "../../hooks/useStore";

function MyTasks() {
  const { taskId } = useParams();
  // const { workspaceId } = useWorkspace();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("name");
  const { userTasks, getTasksByUser, isUserTasksLoading } = useTasks();
  const { state } = useStore();

  useEffect(() => {
    const user =
      state.auth.user || JSON.parse(localStorage.getItem("user") || "{}");
    console.log("Current user:", user);
    console.log("current user id :", user?.name);

    if (user.id) {
      getTasksByUser(user.id);
    }
  }, [userTasks.length]);

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
        <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
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

      {isUserTasksLoading ? (
        <div className="w-full flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
        </div>
      ) : (
        <MyTasksListView tasks={filteredTasks} taskId={taskId} />
      )}

      <Outlet />
    </div>
  );
}

export default MyTasks;
