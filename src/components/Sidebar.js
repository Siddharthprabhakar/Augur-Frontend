import {
  HomeIcon,
  ChartBarIcon,
  UserIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline"; // Import valid logout icon

const navigation = [
  { name: "Dashboard", icon: HomeIcon, href: "#" },
  { name: "Analytics", icon: ChartBarIcon, href: "#" },
  { name: "Profile", icon: UserIcon, href: "#" },
  { name: "Settings", icon: CogIcon, href: "#" },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-base-200 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:flex-shrink-0`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 bg-primary text-primary-content">
          <span className="text-xl font-bold">Mock Dashboard</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center p-3 space-x-3 rounded-lg hover:bg-primary hover:text-primary-content"
            >
              <item.icon className="w-6 h-6" />
              <span className="font-medium">{item.name}</span>
            </a>
          ))}
        </nav>
        <div className="px-4 py-6">
          <button className="w-full btn btn-error btn-outline">
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" /> {/* Use valid logout icon */}
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
