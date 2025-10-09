import { useState, useRef, useEffect } from "react";
import TaskCard from "./TaskCard";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Tooltip } from "@mui/material";
import AddTaskModal from "./AddTaskModal";
import TaskDrawer from "./TaskDrawer";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../../../hooks/useTasks";

const statusColors = {
  Completed: "bg-green-100 text-green-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
  "In Review": "bg-blue-100 text-blue-700",
  "To Do": "bg-gray-300 text-gray-800",
};

function mapStatus(status) {
  const map = {
    "To Do": "todo",
    "In Progress": "inprogress",
    "In Review": "review",
    Completed: "completed",
  };
  return map[status] || status.toLowerCase();
}

function TasksKanban({
  tasks,
  members,
  projectId,
  setSuccessAlert,
  setErrorAlert,
}) {
  const [draggedTask, setDraggedTask] = useState(null);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragOverCol, setDragOverCol] = useState(null);
  const { taskId } = useParams();
  const { createTask, editTask, getTasksByProject } = useTasks();

  const navigate = useNavigate();
  const pId = projectId;
  const isTaskId = taskId;

  const selectedTask = taskId
    ? tasks.find((t) => String(t.id) === String(taskId))
    : null;

  const previewRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    setOpen(!!isTaskId);
  }, [isTaskId]);

  const columns = ["To Do", "In Progress", "In Review", "Completed"];
  const mapCols = {
    todo: "To Do",
    inprogress: "In Progress",
    inreview: "In Review",
    completed: "Completed",
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);

    // Replace ghost with transparent img
    const img = new Image();
    img.src =
      "data:image/svg+xml;base64," +
      btoa(
        '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>'
      );
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDrag = (e) => {
    if (!draggedTask) return;
    const x = e.clientX + 10;
    const y = e.clientY + 10 + window.scrollY;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    });
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverCol(null);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  const handleDrop = async (st) => {
    if (!draggedTask) return;

    console.log(draggedTask, st);
    const task = { ...draggedTask, status: mapStatus(st) };

    await handleUpdateTask(task);
    setDraggedTask(null);

    setDragOverCol(null);
  };

  const handleDragEnter = (col) => {
    if (draggedTask) setDragOverCol(col);
  };

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
      status: mapStatus(newTask.status),
      deadline: newTask.deadline
        ? new Date(newTask.deadline).toISOString()
        : null,
    };

    const result = await editTask(newTask.id, updatedTask);
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
    <div className="flex gap-4 items-start pb-1 mt-4 overflow-x-auto relative">
      {columns.map((col) => (
        <div
          key={col}
          className="bg-gray-50 rounded-2xl shadow p-3 w-74 flex-shrink-0"
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => handleDragEnter(col)}
          onDrop={() => handleDrop(col)}
        >
          <div className="flex justify-between items-center">
            <div>
              <span
                className={`text-md font-semibold px-6 py-1 rounded-xl ${statusColors[col]}`}
              >
                {col}
              </span>
              <span className="text-gray-800 px-3 text-sm">
                {tasks.filter((t) => mapCols[t.status] === col).length}
              </span>
            </div>
            {col === "To Do" && (
              <Tooltip title="Add Task" placement="top" arrow>
                <IconButton
                  aria-label="add task"
                  size="small"
                  onClick={() => setIsModalOpen(true)}
                >
                  <AddIcon fontSize="inherit" sx={{ color: "black" }} />
                </IconButton>
              </Tooltip>
            )}
          </div>

          <div className="space-y-4 mt-5 max-h-115 min-h-10 overflow-y-auto">
            {/* Drop placeholder */}
            {dragOverCol === col &&
              dragOverCol !== mapCols[draggedTask?.status] && (
                <div className="h-16 border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center text-gray-800 text-sm">
                  Drop here
                </div>
              )}

            {tasks.filter((t) => mapCols[t.status] === col).length === 0 ? (
              <p className="text-sm text-gray-400 italic">No tasks</p>
            ) : (
              <div className="py-1 space-y-4">
                {tasks
                  .filter((t) => mapCols[t.status] === col)
                  .map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      onDrag={handleDrag}
                      onDragEnd={handleDragEnd}
                    >
                      <TaskCard
                        task={task}
                        onClick={() => {
                          setOpen(true);
                          navigate(`/projects/${pId}/tasks/${task.id}`);
                        }}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Floating preview card */}
      {draggedTask && (
        <div
          className="w-68"
          ref={previewRef}
          style={{
            position: "fixed",
            top: 0,

            left: 0,
            pointerEvents: "none",
            zIndex: 20,
            transform: "translate3d(-9999px,-9999px,0)",
          }}
        >
          <TaskCard bordered={true} task={draggedTask} />
        </div>
      )}

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTask}
        members={members}
      />

      {/* Task Drawer */}

      <TaskDrawer
        open={open}
        setErrorAlert={setErrorAlert}
        setSuccessAlert={setSuccessAlert}
        onClose={handleClose}
        task={selectedTask}
        onSave={async (updatedTask) => {
          await handleUpdateTask(updatedTask);
        }}
      />
    </div>
  );
}

export default TasksKanban;
