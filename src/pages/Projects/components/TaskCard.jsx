import FlagIcon from "@mui/icons-material/Flag";
import PaddedIcon from "../../../components/ui/PaddedIcon";
import ChatIcon from "@mui/icons-material/Chat";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

function TaskCard({ task }) {
  return (
    <div className={`py-2 px-2 rounded-lg shadow-md bg-gray-200`}>
      <div className="flex justify-between items-center">
        <h3 className="text-gray-700 font-semibold text-sm py-1">
          {task.title}
        </h3>
        <div className="flex gap-1 border-1 border-gray-400 rounded px-1 py-[2px]">
          <FlagIcon sx={{ fontSize: 18, color: "black" }} />
          <p className="text-xs font-semibold text-gray-700">{task.priority}</p>
        </div>
      </div>

      <p className="text-gray-500 text-xs font-semibold py-1 ">
        {task.description}
      </p>

      <div className="flex  my-2 gap-1 text-gray-700 text-xs items-center">
        <p className="w-7 h-7 rounded-full border-1 bg-red-900 text-white font-bold  flex justify-center items-center">
          {task.assignedTo[0].toUpperCase()}
        </p>
        <PaddedIcon Icon={ChatIcon} />
        <p>{task.comments} Comments</p>
      </div>
      <div className="flex gap-1 border-1 border-gray-400 rounded px-1 py-[2px] w-30 items-center">
        <CalendarMonthOutlinedIcon sx={{ fontSize: 18, color: "black" }} />
        <p className="text-xs font-semibold text-gray-700">{task.dueDate}</p>
      </div>
    </div>
  );
}

export default TaskCard;
