import PaddedIcon from "../../components/ui/PaddedIcon";
import { useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import GroupsIcon from "@mui/icons-material/Groups";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import SpokeOutlinedIcon from "@mui/icons-material/SpokeOutlined";
import EqualizerRoundedIcon from "@mui/icons-material/EqualizerRounded";
import CategoryIcon from "@mui/icons-material/Category";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DonutChart from "../../components/DonutChart";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDashboard } from "../../hooks/useDashboard";

const DashboardView = () => {
  const { getDashboardData, dashboardData, isDashboardDataLoading } =
    useDashboard();

  useEffect(() => {
    getDashboardData();
  }, []);

  const {
    quick_stats = {},
    recent_projects = [],
    my_tasks = [],
  } = dashboardData || {};

  const taskStatusSummary = my_tasks.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    },
    { todo: 0, in_progress: 0, completed: 0, in_review: 0 }
  );

  const quickStats = [
    {
      label: "Workspaces",
      value: quick_stats.total_workspaces,
      icon: CategoryIcon,
    },
    {
      label: "Projects",
      value: quick_stats.total_projects,
      icon: SpokeOutlinedIcon,
    },
    {
      label: "My Tasks",
      value: quick_stats.total_tasks_assigned,
      icon: AssignmentIcon,
    },
    {
      label: "Completed Tasks",
      value: quick_stats.completed_tasks,
      icon: PlaylistAddCheckRoundedIcon,
    },
  ];

  function getProjectProgress(task_count, completed_tasks) {
    if (!task_count || task_count === 0) return 0;
    const progress = (completed_tasks / task_count) * 100;
    return Math.round(progress);
  }

  const data = [
    { label: "To Do", value: taskStatusSummary.todo },
    { label: "In Progress", value: taskStatusSummary.in_progress },
    { label: "Completed", value: taskStatusSummary.completed },
    { label: "In Review", value: taskStatusSummary.in_review },
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

      {isDashboardDataLoading ? (
        <div className="w-full flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
            {quickStats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white shadow rounded-xl p-4 flex flex-col gap-2 items-start "
              >
                <PaddedIcon
                  Icon={stat.icon}
                  color="black"
                  bgColor={"lightGray"}
                />
                <p className="text-gray-500 text-lg font-semibold">
                  {stat.label}
                </p>

                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between w-full">
            {/* Projects */}
            <div className="bg-white space-y-4 h-full shadow rounded-xl p-2 w-[40%]">
              <h2 className="text-lg font-semibold pl-2 mb-2">
                Recent Projects
              </h2>
              <div className="flex flex-col space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {recent_projects.length > 0 ? (
                  recent_projects.map((proj) => {
                    const progress = getProjectProgress(
                      proj.task_count,
                      proj.completed_tasks
                    );
                    return (
                      <div
                        key={proj.id}
                        className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
                      >
                        <p className="font-semibold">{proj.name}</p>
                        <p className="text-sm text-gray-500">
                          Tasks: {proj.task_count} • Progress: {progress}%
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-blue-800 h-2 rounded-full"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-400 text-sm text-center">
                    No recent projects
                  </p>
                )}
              </div>
            </div>

            {/* Task Status Chart */}
            <div className="bg-white shadow rounded-xl p-4 w-[58%]">
              <h2 className="text-lg font-semibold mb-6">My Tasks Overview</h2>
              <div className="flex justify-center items-center gap-6">
                <DonutChart data={data} width={300} />
                <div className="flex flex-col gap-4 justify-center items-start">
                  {tags.map((tag, i) => (
                    <div
                      key={i}
                      className="flex gap-2 justify-start items-center"
                    >
                      <p className={`h-3 w-3 rounded-full ${tag.color}`}></p>
                      <p className="ml-2 text-gray-700 font-semibold text-md">
                        {tag.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardView;
