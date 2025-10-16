function TaskLogTable({ analytics }) {
  const taskLogs = (analytics?.recent_activity ?? []).map((log, idx) => ({
    id: idx + 1,
    date: new Date(log.timestamp).toLocaleString(), // format nicely
    user: log.user_name,
    action: log.type,
    task: log.description,
    status: "To Do", // or derive later if backend adds statuses
  }));
  return (
    <div className="rounded-2xl shadow h-[90%]">
      <table className="w-full border-1 border-gray-800 rounded-lg overflow-hidden px-2">
        <thead className="bg-gray-300 text-gray-700 text-sm font-semibold">
          <tr>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">User</th>
            <th className="px-4 py-2 text-left">Action</th>
            <th className="px-4 py-2 text-left">Task</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-800 divide-y divide-gray-300 ">
          {taskLogs.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="px-4 py-4 text-center text-gray-400 italic"
              >
                No recent activity
              </td>
            </tr>
          ) : (
            taskLogs.map((log) => (
              <tr
                key={log.id}
                className="hover:bg-gray-100 transition bg-gray-50"
              >
                <td className="px-4 py-3 font-medium text-xs text-gray-800">
                  {log.date}
                </td>
                <td className="px-4 py-3  text-xs text-gray-800">{log.user}</td>
                <td className="px-4 py-3  text-xs text-gray-800">
                  Created {log.action}
                </td>
                <td className="px-4 py-3  text-xs text-gray-800">{log.task}</td>
                <tr className="px-4 py-2 flex justify-center items-center w-30">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      log.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : log.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : log.status === "In Review"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {log.status}
                  </span>
                </tr>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TaskLogTable;
