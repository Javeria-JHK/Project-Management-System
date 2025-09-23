import PaddedIcon from "../../components/ui/PaddedIcon";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import GroupsIcon from "@mui/icons-material/Groups";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import SpokeOutlinedIcon from "@mui/icons-material/SpokeOutlined";
import EqualizerRoundedIcon from "@mui/icons-material/EqualizerRounded";
import CategoryIcon from "@mui/icons-material/Category";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DonutChart from "../../components/DonutChart";
import SettingsIcon from "@mui/icons-material/Settings";

const DashboardView = () => {
  const quickStats = [
    { label: "Workspaces", value: 3, icon: CategoryIcon },
    { label: "Projects", value: 8, icon: SpokeOutlinedIcon },
    { label: "Total Tasks", value: 54, icon: AssignmentIcon },
    { label: "My Tasks", value: 12, icon: PlaylistAddCheckRoundedIcon },
  ];

  const projects = [
    {
      id: 1,
      name: "Personal Portfolio Website",
      progress: 70,
      tasks: 12,
      status: "Completed",
    },
    {
      id: 2,
      name: "Cloud Migration Tool",
      progress: 40,
      tasks: 8,
      status: "Ongoing",
    },
    {
      id: 3,
      name: "E-commerce Redesign",
      progress: 70,
      tasks: 12,
      status: "Completed",
    },
    {
      id: 4,
      name: "Brand Guidelines",
      progress: 40,
      tasks: 8,
      status: "Ongoing",
    },
    // {
    //   id: 3,
    //   name: "E-commerce Redesign",
    //   progress: 70,
    //   tasks: 12,
    //   status: "Completed",
    // },
    // {
    //   id: 4,
    //   name: "Brand Guidelines",
    //   progress: 40,
    //   tasks: 8,
    //   status: "Ongoing",
    // },
    // {
    //   id: 5,
    //   name: "E-commerce Redesign",
    //   progress: 70,
    //   tasks: 12,
    //   status: "Completed",
    // },
    // {
    //   id: 6,
    //   name: "Brand Guidelines",
    //   progress: 40,
    //   tasks: 8,
    //   status: "Ongoing",
    // },
  ];

  const data = [
    { label: "To Do", value: 4 },
    { label: "In Progress", value: 8 },
    { label: "Completed", value: 15 },
    { label: "In Review", value: 5 },
  ];

  const tags = [
    { name: "To Do", color: "bg-[#949494]" },
    { name: "In Progress", color: "bg-[#B8A35B]" },
    { name: "In Review", color: "bg-[#2C38A3]" },
    { name: "Completed", color: "bg-[#538C59]" },
  ];

  return (
    <div className="px-2 text-gray-600 h-full w-full">
      {/* Header */}
      <h2 className="text-2xl font-bold text-black pb-2">Welcome back</h2>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
        {quickStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white shadow rounded-xl p-4 flex flex-col gap-2 items-start "
          >
            <PaddedIcon Icon={stat.icon} color="black" bgColor={"lightGray"} />
            <p className="text-gray-500 text-lg font-semibold">{stat.label}</p>

            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between w-full">
        <div className="bg-white space-y-4 h-full shadow rounded-xl p-2  w-[40%]">
          <h2 className="text-lg font-semibold pl-2 mb-2">Projects</h2>
          <div className="flex flex-col  space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-3  rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                <p className="font-semibold">{proj.name}</p>
                <p className="text-sm text-gray-500">
                  Tasks: {proj.tasks} • Progress: {proj.progress}%
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-800 h-2 rounded-full"
                    style={{ width: `${proj.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Task Status Chart */}
        <div className="bg-white shadow rounded-xl p-4 w-[58%]">
          <h2 className="text-lg font-semibold mb-6">My Tasks Overview</h2>

          <div className="flex justify-center  items-center gap-6">
            <DonutChart data={data} width={300} />
            <div className="flex flex-col gap-4  justify-center items-start">
              {tags.map((tag) => (
                <div className="flex gap-2 justify-start items-center">
                  <p className={`h-3 w-3 rounded-full ${tag.color} `}></p>
                  <p className="ml-2 text-gray-700 font-semibold text-md">
                    {tag.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
