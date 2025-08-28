import { useLocation, Link } from "react-router-dom";

function SidebarItem({ tabIcon: TabIcon, label, link }) {
  const location = useLocation();
  const isActive = location.pathname === link;
  return (
    <Link
      to={link}
      className="flex items-center gap-3 px-3 py-2 my-2 hover:bg-[#2C2C2C] cursor-pointer rounded-md w-full"
      style={{ backgroundColor: isActive ? "#2C2C2C" : "transparent" }}
    >
      {TabIcon && <TabIcon className="text-white" />}

      <h2 className="text-white font-semibold">{label}</h2>
    </Link>
  );
}

export default SidebarItem;
