import { AnimatePresence, motion } from "motion/react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import FlagIcon from "@mui/icons-material/Flag";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useState, useEffect } from "react";
import TextArea from "../../../components/ui/TextArea";
import Button from "../../../components/ui/Button";
import SelectMenu from "../../../components/ui/Select";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { formatCommentDate } from "../../../utils/DateFormatter";
import EditIcon from "@mui/icons-material/Edit";

const statusColors = {
  Completed: "bg-green-100 text-green-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
  "In Review": "bg-blue-100 text-blue-700",
  "To Do": "bg-gray-300 text-gray-800",
};

const flagColors = {
  Normal: "blue",
  High: "orange",
  Urgent: "red",
  Low: "gray",
};

const activities = [
  {
    user: "Alice",
    date: "20-Aug-2025",
    action: "created the task",
  },
  {
    user: "Bob",
    date: "21-Aug-2025",
    action: "changed status to In Progress",
  },
];

function TaskDrawer({ open, onClose, task, onSave }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [isEditMode, setIsEditMode] = useState(false);

  const [taskDetails, setTaskDetails] = useState({
    id: task?.id || "",
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "To Do",
    priority: task?.priority || "Normal",
    assignedTo: task?.assignedTo || "",
    dueDate: task?.dueDate || "",
  });

  useEffect(() => {
    if (task) {
      setTaskDetails({
        id: task?.id || "",
        title: task.title || "",
        description: task.description || "",
        status: task.status || "To Do",
        priority: task.priority || "Normal",
        assignedTo: task.assignedTo || "",
        dueDate: task.dueDate || "",
      });
    }
  }, [task]);

  const updateTaskDetail = (field, value) => {
    setTaskDetails((prev) => {
      const updated = { ...prev, [field]: value };

      return updated;
    });
  };

  if (!task) return null;

  return (
    <AnimatePresence>
      {open && task && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-1/2 bg-white shadow-2xl z-50 flex flex-col"
          >
            {
              isEditMode ? (
                <>
                  {/* Header */}
                  <div className="flex justify-between items-center bg-gray-100 border-b p-4">
                    <h2 className="text-xl font-bold text-gray-800">
                      <input
                        className="border p-1 rounded-md h-8"
                        value={taskDetails.title}
                        onChange={(e) =>
                          updateTaskDetail("title", e.target.value)
                        }
                        autoFocus
                      />
                    </h2>
                    <div className="flex gap-2">
                      <Button
                        bgcolor="lightGray"
                        width="w-20"
                        height="h-8"
                        onClick={() => {
                          onSave(taskDetails);

                          setIsEditMode(!isEditMode);
                        }}
                      >
                        <TaskAltIcon sx={{ color: "black" }} />
                        <p className="text-black ml-2">Save</p>
                      </Button>

                      <IconButton
                        onClick={() => {
                          setIsEditMode(false);
                          onClose();
                        }}
                      >
                        <CloseIcon sx={{ color: "black", fontSize: 18 }} />
                      </IconButton>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Header */}
                  <div className="flex justify-between items-center bg-gray-100 border-b p-4">
                    <h2 className="text-xl font-bold text-gray-800">
                      <span className="cursor-pointer h-8 p-1">
                        {taskDetails.title}
                      </span>
                    </h2>

                    <div>
                      <IconButton
                        onClick={() => {
                          setIsEditMode(!isEditMode);
                        }}
                      >
                        <EditIcon sx={{ color: "black", fontSize: 18 }} />
                      </IconButton>

                      <IconButton onClick={onClose}>
                        <CloseIcon sx={{ color: "black", fontSize: 18 }} />
                      </IconButton>
                    </div>
                  </div>
                </>
              ) //normal
            }

            {/* Body */}
            <div className="flex flex-col justify-between items-start overflow-y-auto p-4 space-y-4 h-full mb-1">
              <div className="flex-1 w-full ">
                {/* Task Info */}
                <div className="text-md text-gray-800">
                  <div className="flex justify-between h-8 ">
                    <p className="font-semibold">Description:</p>
                  </div>

                  {isEditMode ? (
                    <textarea
                      className="w-full rounded-xl text-gray-600  border  p-2 mt-2"
                      value={taskDetails.description}
                      onChange={(e) =>
                        updateTaskDetail("description", e.target.value)
                      }
                      autoFocus
                    />
                  ) : (
                    <>
                      <div className=" text-gray-600 w-full py-1 ">
                        {taskDetails.description || "No description"}
                      </div>

                      <div className="h-[1px] my-2 bg-gray-200 shadow"></div>
                    </>
                  )}

                  <div className="flex flex-col gap-3  mt-4 w-full text-md">
                    <p className="font-semibold">Task details</p>

                    <div className="flex justify-between">
                      {/* Status */}
                      <div className="flex gap-4 w-1/2 ">
                        <div className="flex items-center gap-2 text-gray-600">
                          <AdjustIcon sx={{ fontSize: 18 }} />
                          <p className="font-normal">Status:</p>
                        </div>
                        {isEditMode ? (
                          <SelectMenu
                            height={20}
                            value={taskDetails.status}
                            onChange={(e) =>
                              updateTaskDetail("status", e.target.value)
                            }
                            autoFocus
                            items={[
                              { value: "To Do" },
                              { value: "In Progress" },
                              { value: "In Review" },
                              { value: "Completed" },
                            ]}
                          />
                        ) : (
                          <span
                            className={`px-2 py-1 text-xs h-6 flex justify-center items-center w-20 font-semibold rounded-full cursor-pointer ${
                              statusColors[taskDetails.status]
                            }`}
                          >
                            {taskDetails.status}
                          </span>
                        )}
                      </div>

                      {/* Priority */}
                      <div className="flex gap-6 w-1/2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <OutlinedFlagIcon sx={{ fontSize: 18 }} />
                          <p className="font-normal">Priority:</p>
                        </div>
                        <div className="flex items-center gap-2 text-gray-800 ">
                          {isEditMode ? (
                            <SelectMenu
                              className="border rounded px-2 py-1"
                              value={taskDetails.priority}
                              height={20}
                              onChange={(e) =>
                                updateTaskDetail("priority", e.target.value)
                              }
                              autoFocus
                              items={[
                                { value: "Low" },
                                { value: "Normal" },
                                { value: "High" },
                                { value: "Urgent" },
                              ]}
                            />
                          ) : (
                            <>
                              {" "}
                              <FlagIcon
                                sx={{
                                  fontSize: 18,
                                  color: flagColors[taskDetails.priority],
                                }}
                              />
                              <span className="cursor-pointer text-sm">
                                {taskDetails.priority}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-2 py-1 w-full text-md">
                    {/* Assignee */}
                    <div className="flex  gap-4 w-1/2 ">
                      <div className="flex items-center gap-2 text-gray-600">
                        <PersonOutlineIcon sx={{ fontSize: 18 }} />
                        <p className="font-normal">Assignee:</p>
                      </div>
                      <div className="flex items-center">
                        {isEditMode ? (
                          <SelectMenu
                            value={taskDetails.assignedTo}
                            height={20}
                            onChange={(e) =>
                              updateTaskDetail("assignedTo", e.target.value)
                            }
                            autoFocus
                            items={[{ value: "Alice" }, { value: "Bob" }]}
                          />
                        ) : (
                          <>
                            <p className="w-7 h-7 rounded-full border bg-black/80 text-white font-bold flex justify-center items-center">
                              {taskDetails.assignedTo[0]?.toUpperCase()}
                            </p>
                            <span className="cursor-pointer ml-2 h-6 font-semibold">
                              {taskDetails.assignedTo}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Due Date */}
                    <div className="flex w-1/2  gap-6 ">
                      <div className="flex items-center gap-2 text-gray-600">
                        <CalendarMonthIcon sx={{ fontSize: 18 }} />
                        <p className="font-normal">Due Date:</p>
                      </div>
                      <div className="flex items-center gap-2 text-gray-800 ">
                        {isEditMode ? (
                          <input
                            type="date"
                            className="border p-1 rounded h-8"
                            value={taskDetails.dueDate}
                            onChange={(e) =>
                              updateTaskDetail("dueDate", e.target.value)
                            }
                            autoFocus
                          />
                        ) : (
                          <span className="cursor-pointer text-sm">
                            {taskDetails.dueDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {!isEditMode && (
                  <>
                    <div className="h-[1px] my-3 bg-gray-200 shadow"></div>
                    {/* Activity Logs */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mt-4 mb-2">
                        Activity Log
                      </h3>
                      {activities.length ? (
                        <ul className="text-sm text-gray-600">
                          {activities.map((a, idx) => (
                            <li key={idx} className="p-2 ">
                              <span className="font-semibold mr-1 text-gray-800">
                                <ArrowRightAltIcon />
                                {a.user}
                              </span>
                              {"  "}
                              {a.action} {" | "}
                              <span className="text-xs ml-1 text-gray-500">
                                {a.date}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500 italic">
                          No activity recorded
                        </p>
                      )}
                    </div>

                    {/* Comments */}
                    <div>
                      <div className="h-[0.5px] my-2 bg-gray-200 shadow"></div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        Comments
                      </h3>
                      {comments.length > 0 ? (
                        <ul className="space-y-2">
                          {comments.map((c, idx) => (
                            <li key={idx} className="p-2 bg-gray-100 rounded">
                              <p className="text-gray-800">{c.text}</p>
                              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                <p>{c.user}</p>
                                <p>{formatCommentDate(c.date)}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500 italic">
                          No comments yet
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {!isEditMode && (
              <div className="text-gray-800  border-1 border-gray-300 mx-2 mb-4 rounded-2xl pt-4 p-2">
                <textarea
                  className="w-full rounded-xl focus:outline-none"
                  value={comment}
                  placeholder="Type your comment here..."
                  id="comment"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <div className="flex justify-end">
                  {/* <IconButton>
                  <AttachFileIcon sx={{ transform: "rotate(45deg)" }} />
                </IconButton> */}

                  <Button
                    bgcolor="gray"
                    width="w-24"
                    height="h-8 "
                    onClick={() => {
                      if (comment.trim() !== "") {
                        const newComment = {
                          text: comment,
                          user: "You",
                          date: new Date().toISOString(),
                        };
                        setComments([...comments, newComment]);
                        setComment("");
                      }
                    }}
                  >
                    Comment
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default TaskDrawer;
