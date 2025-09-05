import { useState } from "react";
import TaskCard from "./TaskCard";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddTaskModal from "./AddTaskModal";

const statusColors = {
  Completed: "bg-green-100 text-green-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
  "In Review": "bg-blue-100 text-blue-700",
  "To Do": "bg-gray-300 text-gray-800",
};

function TasksKanban({ tasks, setTasks, members }) {
  const [draggedTask, setDraggedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = ["To Do", "In Progress", "In Review", "Completed"];

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDrop = (status) => {
    if (!draggedTask) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === draggedTask.id ? { ...t, status } : t))
    );
    setDraggedTask(null);
  };

  //add task
  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div className="flex gap-4 items-start pb-1 mt-4 overflow-x-auto">
      {columns.map((col) => (
        <div
          key={col}
          className="bg-gray-50  rounded-2xl shadow p-3 w-74 flex-shrink-0"
          onDragOver={(e) => e.preventDefault()} //helps drop
          onDrop={() => handleDrop(col)}
        >
          <div className="flex justify-between items-center">
            <div>
              <span
                className={`text-md font-semibold px-6 py-1  rounded-xl ${statusColors[col]}`}
              >
                {col}
              </span>
              <span className="text-gray-800 px-3 text-sm">
                {tasks.filter((t) => t.status === col).length}
              </span>
            </div>
            {col === "To Do" && (
              <Tooltip title="Add Task" placement="top" arrow>
                <IconButton aria-label="add task" size="small">
                  <AddIcon
                    fontSize="inherit"
                    sx={{ color: "black" }}
                    onClick={() => setIsModalOpen(true)}
                  />
                </IconButton>
              </Tooltip>
            )}
          </div>

          <div className="space-y-4 mt-5 max-h-115 min-h-10 overflow-y-auto ">
            {tasks.filter((t) => t.status === col).length === 0 ? (
              <p className="text-sm text-gray-400 italic">No tasks</p>
            ) : (
              <div className="py-1 space-y-4">
                {tasks
                  .filter((t) => t.status === col)
                  .map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task)}
                    >
                      <TaskCard task={task} />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      ))}
      {/*Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTask}
        members={members}
      />
    </div>
  );
}

export default TasksKanban;
