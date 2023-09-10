import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../../Provider/Authproviders";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const handleSignOut = () => {
    logOut()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <Link
            to="/"
            aria-label="APP"
            title="APP"
            className="inline-flex items-center"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full">
              <Square3Stack3DIcon className="h-6 w-6"></Square3Stack3DIcon>
            </div>
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 ">
              Sender
            </span>
          </Link>
          <ul className="items-center hidden space-x-8 lg:flex">
            <li>
              <NavLink
                to="/"
                aria-label="Home"
                title="Home"
                className={({ isActive }) => (isActive ? "active" : "default")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                aria-label="Shop"
                title="Shop"
                className={({ isActive }) => (isActive ? "active" : "default")}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                aria-label="About Us"
                title="About Us"
                className={({ isActive }) => (isActive ? "active" : "default")}
              >
                Political views
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                aria-label="About Us"
                title="About Us"
                className={({ isActive }) => (isActive ? "active" : "default")}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <div className="navbar-end ml-5">
                {user ? (
                  <div className="flex justify-center items-center">
                    <div className="avatar">
                      <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user?.photoURL} title={user?.displayName} />
                      </div>
                    </div>
                    <div className="ml-5">
                      <button onClick={handleSignOut} className="btn bg-cyan-200">
                        LogOut
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link to="/login" className="btn">
                    LogIn
                  </Link>
                )}
              </div>
            </li>
          </ul>
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute z-10 top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Link
                        to="/"
                        aria-label="HeroGadget"
                        title="HeroGadget"
                        className="inline-flex items-center"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full">
                          <Square3Stack3DIcon className="h-6 w-6"></Square3Stack3DIcon>
                        </div>
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                          Sender
                        </span>
                      </Link>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <li>
                        <Link
                          to="/"
                          aria-label="Shop"
                          title="Shop"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/about"
                          aria-label="About Us"
                          title="About Us"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          About
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/about"
                          aria-label="About Us"
                          title="About Us"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Political views
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard"
                          aria-label="About Us"
                          title="About Us"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <div className="navbar-end ml-5">
                          {user ? (
                            <div className="flex justify-center items-center">
                              <div className="avatar">
                                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                  <img
                                    src={user?.photoURL}
                                    title={user?.displayName}
                                  />
                                </div>
                              </div>
                              <div className="ml-5">
                                <button className="btn">LogOut</button>
                              </div>
                            </div>
                          ) : (
                            <Link to="/login" className="btn">
                              LogIn
                            </Link>
                          )}
                        </div>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
