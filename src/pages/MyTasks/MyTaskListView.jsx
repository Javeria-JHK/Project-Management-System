import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FlagIcon from "@mui/icons-material/Flag";
import ChatIcon from "@mui/icons-material/Chat";
import IconButton from "../../components/ui/IconButton";
import TaskDrawer from "../Projects/components/TaskDrawer";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Button from "../../components/ui/Button";
import { formatDeadline } from "../../utils/DateFormatter";
import { useStore } from "../../hooks/useStore";
import { capitalize } from "../../utils/stringAlterations";
import { useTasks } from "../../hooks/useTasks";

const statusColors = {
  Completed: "bg-green-100 text-green-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
  "In Review": "bg-blue-100 text-blue-700",
  "To Do": "bg-gray-300 text-gray-800",
};

const mapStatus = {
  todo: "To Do",
  inprogress: "In Progress",
  inreview: "In Review",
  completed: "Completed",
};

function mapStatusforBackend(status) {
  const map = {
    "To Do": "todo",
    "In Progress": "inprogress",
    "In Review": "review",
    Completed: "completed",
  };
  return map[status] || status.toLowerCase();
}

const flagColors = {
  medium: "blue",
  high: "orange",
  urgent: "red",
  low: "gray",
};

function MyTasksListView({ tasks, setErrorAlert, setSuccessAlert }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const pageSize = 8; // tasks per page
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { editTask, getTasksByUser } = useTasks();
  const isTaskId = taskId;

  useEffect(() => {
    setOpen(!!isTaskId);
  }, [isTaskId]);

  const selectedTask = taskId
    ? tasks.find((t) => String(t.id) === String(taskId))
    : null;

  // Calculate pagination
  const totalPages = Math.ceil(tasks.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedTasks = tasks.slice(startIndex, startIndex + pageSize);

  const getProjectNameById = (projectId) => {
    const project = state.projects.find((p) => p.id === projectId);

    return project ? project.name : "Unknown Project";
  };

  const handleUpdateTask = async (newTask) => {
    const updatedTask = {
      title: newTask.title,
      description: newTask.description,
      assignee_id: "a1e53b6d-d17b-4c89-ab2c-19082fa844ed",
      priority: newTask.priority?.toLowerCase(),
      status: mapStatusforBackend(newTask.status),
      deadline: newTask.deadline
        ? new Date(newTask.deadline).toISOString()
        : null,
    };

    const result = await editTask(taskId, updatedTask);
    if (!result.error) {
      setSuccessAlert("Task updated successfully!");
      setTimeout(() => setSuccessAlert(null), 3000);
      getTasksByUser(state.auth.user?.id);
    }
    if (result.error) {
      setErrorAlert(result.error);
      setTimeout(() => setErrorAlert(null), 5000);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      navigate(`/my-tasks`);
    }, 300);
  };

  return (
    <div className="mt-2 mr-6">
      <table className="w-full border-1 border-gray-800 rounded-lg overflow-hidden px-2">
        <thead className="bg-gray-300 text-gray-700 text-sm font-semibold">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Project</th>
            <th className="px-4 py-2 text-left">Due Date</th>
            <th className="px-4 py-2 text-left">Priority</th>
            <th className="px-4 py-2 text-left">Comments</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-800 divide-y divide-gray-300">
          {paginatedTasks.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                className="px-4 py-4 text-center text-gray-400 italic"
              >
                No tasks available
              </td>
            </tr>
          ) : (
            paginatedTasks.map((task) => (
              <tr
                key={task.id}
                className="hover:bg-gray-300 transition bg-gray-100"
              >
                <td className="px-4 py-2 font-medium text-gray-800">
                  {task.title}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      statusColors[mapStatus[task.status]]
                    }`}
                  >
                    {mapStatus[task.status]}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {getProjectNameById(task.project_id)}
                </td>
                <td className="px-4 py-2 font-semibold">
                  {formatDeadline(task.deadline)}
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-1">
                    <FlagIcon
                      sx={{ fontSize: 18, color: flagColors[task.priority] }}
                    />
                    <p className="text-xs font-semibold">
                      {capitalize(task.priority)}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <ChatIcon sx={{ color: "gray", fontSize: 18 }} />
                    <p>{task.comments} </p>
                  </div>
                </td>
                <td className="px-4 py-2 flex justify-end items-center">
                  <Button
                    bgcolor="gray"
                    width="w-20"
                    height={"h-8"}
                    onClick={() => {
                      setOpen(true);
                      navigate(`/my-tasks/${task.id}`);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 mt-3 text-sm">
          <IconButton
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            Icon={KeyboardArrowLeftIcon}
            color={"black"}
            bgColor={"white"}
            bgHover={"white"}
          />
          <span className="text-sm font-semibold text-gray-800">
            Page {currentPage} of {totalPages}
          </span>
          <IconButton
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            Icon={KeyboardArrowRightIcon}
            color={"black"}
            bgColor={"white"}
            bgHover={"white"}
          />
        </div>
      )}

      {/* Task Drawer */}
      <TaskDrawer
        open={open}
        onClose={handleClose}
        task={selectedTask}
        onSave={async (updatedTask) => {
          await handleUpdateTask(updatedTask);
        }}
        setErrorAlert={setErrorAlert}
        setSuccessAlert={setSuccessAlert}
      />
    </div>
  );
}

export default MyTasksListView;
