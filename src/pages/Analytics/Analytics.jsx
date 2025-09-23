import { useEffect, useState } from "react";
import { useWorkspace } from "../../hooks/useWorkspace";
import SelectMenu from "../../components/ui/Select";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import GroupIcon from "@mui/icons-material/Group";
import PaddedIcon from "../../components/ui/PaddedIcon";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import * as Plot from "@observablehq/plot";
import PlotFigure from "../../components/PlotFigure";
import TaskLogTable from "./components/TaskLogTable";

const allProjects = [
  {
    id: 1,
    workspaceId: "My Workspace",
    name: "Personal Portfolio Website",
    description: "A modern responsive portfolio built with React and Tailwind.",
    members: 2,
    status: "In Progress",
    tasks: 14,
  },
  {
    id: 2,
    workspaceId: "Wanclouds Inc.",
    name: "Cloud Migration Tool",
    description: "A tool for automating AWS → Azure migration.",
    members: 10,
    status: "Completed",
    tasks: 4,
  },
  {
    id: 3,
    workspaceId: "DesignHub Agency",
    name: "E-commerce Redesign",
    description: "UI/UX redesign for a fashion brand’s online store.",
    members: 6,
    status: "In Review",
    tasks: 9,
  },
  {
    id: 4,
    workspaceId: "My Workspace",
    name: "Brand Guidelines",
    description: "Design system + style guide for client.",
    members: 4,
    status: "Completed",
    tasks: 44,
  },
];

const aapl = [
  { date: "2025-09-03", task: "4" },
  { date: "2025-09-04", task: "3" },
  { date: "2025-09-05", task: "5" },
  { date: "2025-09-06", task: "6" },
  { date: "2025-09-07", task: "7" },
  { date: "2025-09-08", task: "6" },
  { date: "2025-09-09", task: "8" },
  { date: "2025-09-10", task: "9" },
].map((d) => ({
  date: new Date(d.date), // Parse the string into a Date object
  task: +d.task,
}));

// Quick Stats
const quickStats = [
  { label: "Total Tasks", value: 20, icon: AssignmentIcon },
  { label: "Completed", value: 8, icon: TaskAltIcon },
  {
    label: "Active Tasks",
    value: 12,
    icon: AssignmentIndIcon,
  },
  {
    label: "My Tasks",
    value: 2,
    icon: PlaylistAddCheckRoundedIcon,
  },
  { label: "Members", value: 9, icon: GroupIcon, color: "#475569" },
];

function Analytics() {
  const { workspace } = useWorkspace();

  const [selectedProject, setSelectedProject] = useState(null);

  const projectNames = allProjects
    .filter((p) => {
      return p.workspaceId === workspace;
    })
    .map((p) => ({ value: p.name }));

  useEffect(() => {
    const filteredProjects = allProjects.filter(
      (p) => p.workspaceId === workspace
    );

    const defaultProjectName = filteredProjects[0]?.name || null;
    setSelectedProject(defaultProjectName);
  }, [workspace]);

  return (
    <div className="w-full px-2 text-gray-800">
      <div className="flex justify-between pr-5 mb-2">
        <h2 className="text-2xl text-black font-bold ">Analytics </h2>
        <SelectMenu
          items={projectNames}
          value={selectedProject}
          color={"text-gray-800"}
          header={true}
          height={40}
          onChange={(e) => setSelectedProject(e.target.value)}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        {quickStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white shadow rounded-xl px-4 py-6 flex flex-col gap-2 items-start border-l-4 border-[#475569]"
          >
            <div className="flex justify-start gap-2">
              <PaddedIcon
                Icon={stat.icon}
                color="black"
                bgColor={"lightGray"}
              />
              <p className="text-gray-500 text-lg font-semibold">
                {stat.label}
              </p>
            </div>

            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center h-full gap-4">
        <div className=" bg-white w-1/2 p-4 rounded-2xl shadow">
          <div className="flex justify-between items-center mb-4 pr-6">
            <h3 className="font-semibold text-lg">Task Completion Trend</h3>
            <p className="text-xs ">last week</p>
          </div>

          <PlotFigure
            options={{
              y: { grid: true },
              marks: [
                Plot.areaY(aapl, {
                  x: "date",
                  y: "task",
                  fill: "#4C5E70",
                  fillOpacity: 0.1,
                }),
                Plot.line(aapl, { x: "date", y: "task", stroke: "steelBlue" }),
              ],
            }}
          />
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold text-lg mb-2">Tasks Activity Log</h3>
          <TaskLogTable />
        </div>
      </div>
    </div>
  );
}

export default Analytics;
