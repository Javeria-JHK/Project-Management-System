import GroupIcon from "@mui/icons-material/Group";
import AssignmentIcon from "@mui/icons-material/Assignment";
import IconButton from "../../../components/ui/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ProjectCard({ project, onEdit, onDelete }) {
  const statusColors = {
    Completed: "bg-green-100 text-green-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    "In Review": "bg-blue-100 text-blue-700",
    "To Do": "bg-gray-300 text-gray-800",
  };
  return (
    <div className="rounded-2xl shadow-md hover:shadow-lg transition-all bg-white w-100 h-54 cursor-pointer">
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            {project.name}
          </h3>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              statusColors[project.status]
            }`}
          >
            {project.status}
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 h-10">
          {project.description}
        </p>

        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <div className="flex items-center gap-2">
            <GroupIcon sx={{ fontSize: 24, color: "darkRed" }} />
            {project.members} members
          </div>
          <div className="flex items-center text-gray-700 gap-2">
            <p className="font-semibold">{project.tasks}</p>
            <IconButton
              Icon={AssignmentIcon}
              bgColor={"blue"}
              color={"darkBlue"}
              bgHover={"blue"}
            />
          </div>
        </div>
        <div className="h-[1px] w-full bg-gray-200 rounded my-2"></div>

        <div className="flex justify-end items-center gap-2 mb-2">
          <IconButton
            Icon={EditIcon}
            color="#333"
            bgColor="lightGray"
            bgHover="lightGray"
            onClick={onEdit}
          />
          <IconButton
            Icon={DeleteIcon}
            bgColor="lightGray"
            bgHover="lightGray"
            color="#333"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
