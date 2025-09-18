import FlagIcon from "@mui/icons-material/Flag";
import PaddedIcon from "../../../components/ui/PaddedIcon";
import ChatIcon from "@mui/icons-material/Chat";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Tooltip, IconButton } from "@mui/material";

const flagColors = {
  Normal: "blue",
  High: "orange",
  Urgent: "red",
  Low: "gray",
};

function TaskCard({ task, onClick, bordered }) {
  return (
    <div
      className={`py-3 px-2 rounded-xl  bg-[#f0f0f0] ${
        bordered ? "border-2 border-gray-700 p-2" : "border-1 border-gray-300"
      } border-1 border-gray-300`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center cursor-pointer">
        <h3 className="text-gray-800 font-semibold text-sm py-1">
          {task.title}
        </h3>
      </div>

      <p className="text-gray-600 text-xs font-semibold py-1 overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer">
        {task.description}
      </p>

      <div className="flex my-1 gap-1 text-gray-700 text-xs items-center justify-between">
        <div className="flex items-center">
          <p className="w-7 h-7 rounded-full border-1 bg-black/80 text-white font-bold  flex justify-center items-center">
            {task.assignedTo[0].toUpperCase()}
          </p>

          <p className="font-semibold w-20 overflow-hidden text-ellipsis whitespace-nowrap ml-1">
            {task.assignedTo}
          </p>
        </div>
        <div className="flex items-center">
          <PaddedIcon Icon={ChatIcon} color="grey" />
          <p>{task.comments} Comments</p>
        </div>
      </div>
      <div className="flex rounded justify-between items-center">
        <div className="flex items-center">
          <CalendarMonthOutlinedIcon sx={{ fontSize: 18, color: "black" }} />
          <p className="text-xs ml-2 font-semibold text-gray-800">
            Due: {task.dueDate}
          </p>
        </div>
        <div className="flex items-center">
          <Tooltip title="Priority" placement="top" arrow>
            <div className="flex gap-1 border-1 border-gray-400   rounded-full px-2 py-[2px]">
              <FlagIcon
                sx={{ fontSize: 18, color: flagColors[task.priority] }}
              />
              <p className="text-xs font-semibold text-gray-800">
                {task.priority}
              </p>
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
