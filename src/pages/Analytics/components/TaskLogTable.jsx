import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// // Example task logs
// const taskLogs = [
//   {
//     id: 1,
//     date: "2025-09-10 10:15",
//     user: "Alice",
//     action: "Created",
//     task: "Design Landing Page",
//     status: "To Do",
//   },
//   {
//     id: 2,
//     date: "2025-09-10 11:45",
//     user: "Bob",
//     action: "Completed",
//     task: "Setup Database Schema",
//     status: "Completed",
//   },
//   {
//     id: 3,
//     date: "2025-09-11 09:20",
//     user: "Charlie",
//     action: "Assigned",
//     task: "Implement Auth Flow",
//     status: "In Progress",
//   },
//   {
//     id: 4,
//     date: "2025-09-11 08:20",
//     user: "Alpha",
//     action: "Assigned",
//     task: "Design Product Page",
//     status: "In Review",
//   },
// ];

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
    <TableContainer className="rounded-2xl shadow">
      <Table>
        <TableHead>
          <TableRow className="bg-gray-100">
            <TableCell>Date</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Task</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taskLogs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center  text-gray-500">
                No recent activity
              </TableCell>
            </TableRow>
          ) : (
            taskLogs.map((log) => (
              <TableRow key={log.id} className="hover:bg-gray-50 text-xs">
                <TableCell>{log.date}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.task}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TaskLogTable;
