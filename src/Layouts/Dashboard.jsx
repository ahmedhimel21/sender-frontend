import { NavLink, Outlet } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";
import NavigationBar from "../Components/Shared/Navbar";
import {
  FaHome,
  FaRegCheckCircle,
  FaUserPlus,
  FaFacebookMessenger,
  FaHistory,
} from "react-icons/fa";
import { useConsumer } from "../Hooks/useConsumer";

const Dashboard = () => {
  const [isConsumer] = useConsumer();
  const [isAdmin] = useAdmin();
  return (
    <>
      <NavigationBar></NavigationBar>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center ">
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side rounded-lg">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-purple-500 text-xl text-white">
            <div>
              <h1 className="text-center pb-10 text-3xl font-bold">Sender</h1>
            </div>
            {isAdmin ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard/manageUsers"
                    className={({ isActive }) => (isActive ? "text-white" : "")}
                  >
                    <FaUserPlus></FaUserPlus> Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/sendAMessage"
                    className={({ isActive }) => (isActive ? "text-white" : "")}
                  >
                    <FaFacebookMessenger></FaFacebookMessenger> Send A Message
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/messageHistory"
                    className={({ isActive }) => (isActive ? "text-white" : "")}
                  >
                    <FaHistory></FaHistory> Message History
                  </NavLink>
                </li>
              </>
            ) : isConsumer ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard/sendConsumerMessage"
                    className={({ isActive }) => (isActive ? "text-white" : "")}
                  >
                    <FaFacebookMessenger></FaFacebookMessenger> Send Message
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/dashboard/mySelectedClasses"
                    className={({ isActive }) => (isActive ? "text-white" : "")}
                  >
                    <FaRegCheckCircle></FaRegCheckCircle> Content coming...
                  </NavLink>
                </li>
              </>
            )}
            <div className="divider bg-white"></div>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "text-white" : "")}
              >
                <FaHome></FaHome> Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
