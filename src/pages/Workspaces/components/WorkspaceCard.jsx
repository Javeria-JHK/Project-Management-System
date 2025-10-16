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
        isDefault
          ? "border-2 border-gray-800 dark:border-gray-600"
          : "border border-gray-200 dark:border-gray-900"
      } bg-white dark:bg-black shadow-md rounded-xl p-4 w-70 hover:shadow-lg transition cursor-pointer flex flex-col justify-between`}
      onClick={onClick}
    >
      <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-[#b5b5b5] ">
          {name}{" "}
          {isDefault && (
            <span className="text-xs text-[#14B8A6]">(Active)</span>
          )}
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#838383] mt-1">
          {description}
        </p>
      </div>

      <div className="flex justify-between items-center mt-10">
        <div className="flex items-center">
          <GroupIcon
            className="text-gray-800 dark:text-[#838383]"
            sx={{ fontSize: 24 }}
          />
          <p className=" ml-2 text-sm text-gray-600 dark:text-[#838383]">
            {members} {members < 2 ? "Member" : "Members"}{" "}
          </p>
        </div>

        <div className="flex justify-end items-center gap-2">
          <IconButton
            Icon={EditIcon}
            bgColor="lightGray"
            bgHover="lightGray"
            onClick={onEdit}
          />
          <IconButton
            Icon={DeleteIcon}
            bgColor="lightGray"
            bgHover="lightGray"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default WorkspaceCard;
