import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddTaskModal from "./AddTaskModal";
import FlagIcon from "@mui/icons-material/Flag";
import ChatIcon from "@mui/icons-material/Chat";
import IconButton from "../../../components/ui/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TaskDrawer from "./TaskDrawer";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Button from "../../../components/ui/Button";
import { useTasks } from "../../../hooks/useTasks";

import { capitalize } from "../../../utils/stringAlterations";
import { formatDeadline } from "../../../utils/DateFormatter";

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

const statusColors = {
  Completed: "bg-green-100 text-green-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
  "In Review": "bg-blue-100 text-blue-700",
  "To Do": "bg-gray-300 text-gray-800",
};

const flagColors = {
  medium: "blue",
  high: "orange",
  urgent: "red",
  low: "gray",
};

function TasksListView({
  tasks,
  members,
  projectId,
  setSuccessAlert,
  setErrorAlert,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const pageSize = 8; // tasks per page
  const { createTask, getTasksByProject, editTask } = useTasks();
  const navigate = useNavigate();
  const pId = projectId;
  const { taskId } = useParams();
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

  const handleAddTask = async (newTask) => {
    const task = {
      title: newTask.title,
      description: newTask.description,
      project_id: projectId,
      assignee_id: newTask.assignee_id,
      priority: newTask.priority.toLowerCase(),
      deadline: new Date(newTask.dueDate).toISOString(),
    };

    const result = await createTask(pId, task);
    if (!result.error) {
      setSuccessAlert("Task created successfully!");
      setTimeout(() => setSuccessAlert(null), 3000);
      getTasksByProject(projectId);
    }
    if (result.error) {
      setErrorAlert(result.error);
      setTimeout(() => setErrorAlert(null), 5000);
    }
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
      getTasksByProject(projectId);
    }
    if (result.error) {
      setErrorAlert(result.error);
      setTimeout(() => setErrorAlert(null), 5000);
    }
  };

  const handleClose = () => {
    setOpen(false); // triggers AnimatePresence exit
    setTimeout(() => {
      navigate(`/projects/${pId}`);
    }, 300); // matches transition duration
  };

  return (
    <div className="mt-2 mr-6">
      <div className="flex justify-end px-1 py-2">
        {/* <div
          className="w-28 h-7 rounded-md border-2 border-gray-800 border-dashed hover:bg-white flex hover:cursor-pointer hover:border-double justify-between items-center px-2 ml-30"
          onClick={() => setIsModalOpen(true)}
        >
          <AddIcon sx={{ fontSize: 18, color: "black" }} />
          <p className="text-sm text-gray-800 font-bold">Add Task</p>
        </div> */}
        <Button
          width="w-34"
          height={"h-8"}
          bgcolor="accent"
          onClick={() => setIsModalOpen(true)}
        >
          <AddIcon sx={{ fontSize: 24, color: "white" }} />
          <p className="text-white font-semibold ml-2 text-sm"> Add Task</p>
        </Button>
      </div>
      <table className="w-full border-1  border-gray-800  dark:border-gray-100 rounded-lg overflow-hidden px-2">
        <thead className="bg-gray-300 dark:bg-[#0E1012]  text-gray-700 dark:text-gray-300 text-sm font-semibold dark:border-b-1 dark:border-b-gray-500">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Assignee</th>
            <th className="px-4 py-2 text-left">Due Date</th>
            <th className="px-4 py-2 text-left">Priority</th>
            <th className="px-4 py-2 text-left">Comments</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-800 dark:text-gray-500 dark:bg-[#121517]  divide-y divide-gray-300 dark:divide-gray-800">
          {paginatedTasks.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                className="px-4 py-4 text-center dark:bg-[#121517] text-gray-400 italic"
              >
                No tasks available
              </td>
            </tr>
          ) : (
            paginatedTasks.map((task) => (
              <tr
                key={task.id}
                className="hover:bg-gray-300 dark:hover:bg-gray-800 transition dark:bg-[#0E1012] bg-gray-100"
              >
                <td className="px-4 py-2 font-medium ">{task.title}</td>
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
                  {task.assignee_id?.slice(0, 10) || "Assignee"}
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
                    <p>{task.comments || 0} </p>
                  </div>
                </td>
                <td className="px-4 py-2 flex justify-end items-center">
                  <Button
                    bgcolor="mdGray"
                    width="w-20"
                    height={"h-8"}
                    onClick={() => {
                      setOpen(true);
                      navigate(`/projects/${pId}/tasks/${task.id}`);
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
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-400">
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
      {/*Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTask}
        members={members}
      />
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

export default TasksListView;
