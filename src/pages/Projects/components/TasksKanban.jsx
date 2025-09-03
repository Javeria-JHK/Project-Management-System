import TaskCard from "./TaskCard";
function TasksKanban({ tasks }) {
  const columns = ["To Do", "In Progress", "In Review", "Completed"];
  const statusColors = {
    Completed: "bg-green-100 text-green-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    "In Review": "bg-blue-100 text-blue-700",
    "To Do": "bg-gray-300 text-gray-800",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      {columns.map((col) => (
        <div key={col} className="bg-gray-50  rounded-2xl shadow p-3">
          <span
            className={`text-md font-semibold px-6 py-1  rounded-xl ${statusColors[col]}`}
          >
            {col}
          </span>
          <span className="text-gray-800 px-3">
            {tasks.filter((t) => t.status === col).length}
          </span>

          <div className="space-y-2 mt-5">
            {tasks.filter((t) => t.status === col).length === 0 ? (
              <p className="text-sm text-gray-400 italic">No tasks</p>
            ) : (
              tasks
                .filter((t) => t.status === col)
                .map((task) => <TaskCard task={task} key={task.id} />)
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TasksKanban;
