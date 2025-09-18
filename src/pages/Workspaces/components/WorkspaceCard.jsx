import GroupIcon from "@mui/icons-material/Group";

import IconButton from "../../../components/ui/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function WorkspaceCard({
  name,
  description,
  members,
  isDefault,
  onClick,
  onEdit,
  onDelete,
}) {
  return (
    <div
      className={`${
        isDefault ? "border-2 border-gray-800" : "border border-gray-200"
      } bg-white shadow-md rounded-xl p-4 w-70 hover:shadow-lg transition cursor-pointer`}
      onClick={onClick}
    >
      <h2 className="text-xl font-bold text-gray-800">
        {name}{" "}
        {isDefault && <span className="text-xs text-blue-500">(Active)</span>}
      </h2>
      <p className="text-sm text-gray-600 mt-1">{description}</p>

      <div className="flex justify-between items-center mt-10">
        <div className="flex items-center">
          <GroupIcon sx={{ fontSize: 24, color: "black" }} />
          <p className=" ml-2 text-sm text-gray-600">
            {members} {members < 2 ? "Member" : "Members"}{" "}
          </p>
        </div>

        <div className="flex justify-end items-center gap-2">
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

export default WorkspaceCard;
