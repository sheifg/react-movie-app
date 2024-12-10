import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Switch from "./Switch";
import avatar from "../assets/avatar.png";

const Navbar = () => {
  const { currentUserTracking, logOut } = useAuth();
  // console.log(currentUserTracking.photoURL);
  // currentUserTracking: false even if there is a user logged in

  // label and visible are attributes
  const links = [
    { to: "/login", label: "Login", visible: !currentUserTracking },
    {
      to: "/register",
      label: "Register",
      visible: !currentUserTracking,
    },
    { to: "/", label: "Logout", visible: currentUserTracking, onClick: logOut },
  ];
  console.log(links);
  return (
    <>
      <nav className="bg-neutral-100 dark:bg-gray-900 py-3 dark:text-white w-full ">
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
          <div className=" flex items-center justify-between">
            <Link className="text-2xl pr-2 font-semibold" to="/">
              React Movie App
            </Link>
            {/* The inset CSS property is a shorthand that corresponds to the top , right , bottom , and/or left properties. It has the same multi-value syntax of the margin shorthand. This inset property has no effect on non-positioned elements */}
            <div className=" inset-y-0 right-9 flex items-center">
              {currentUserTracking && (
                <h5 className="mr-2 capitalize">
                  {currentUserTracking?.displayName}{" "}
                </h5>
              )}
              <Switch />
              {/* Profile dropdown from headless ui
              https://headlessui.com/react/menu#:~:text=%40headlessui/react-,Basic%20example,-Menus%20are%20built
              */}
              <Menu as="div" className="relative ml-3">
                <MenuButton className="relative rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  {/* sr-only: screen reader only means will be not displyed just for disabled person that can not see the page, with screen reader they can listen Open user menu */}
                  <span className="sr-only"> Open User menu</span>
                  {/* It can be used this img or svg */}
                  <img
                    className="h-8 w-8 rounded-full"
                    // photoURL come by default for the firebase
                    src={currentUserTracking?.photoURL || avatar}
                    alt="avatar"
                  />
                </MenuButton>

                <MenuItems
                  // anchor="bottom end"
                  // anchor="bottom start" it is not possible here because it would start from the start part of the avatar and it overlap the screen
                  // anchor="left" the dropdown menu would appear in the left side
                  // gap is the distance between the avatar and the menu
                  anchor={{ to: "bottom end", gap: "2px" }}
                  transition
                  className="absolute right-0 mt-2 origin-top-right transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 top-20 w-32  bg-white shadow-lg focus:outline-none "
                >
                  {/* For item not visibility it can be done in advance, before the mapping, filtering just to show just the item visible */}
                  {links
                    .filter((item) => item.visible)
                    .map((item, index) => (
                      <MenuItem key={index}>
                        {/* focus is a rendering prop
                             The Link is wrapped with a function with focus as props in that function, and inside the className in Link it be added something for the focus
                            https://headlessui.com/react/menu#:~:text=Fragment%7D%3E-,%7B(%7B%20focus%20%7D)%20%3D,-%3E%20( */}
                        {({ focus }) => (
                          <Link
                            onClick={item?.onClick}
                            // Accesing to the "to" property of the object
                            to={item.to}
                            className={`block px-2 py-2 text-sm text-gray-700 ${
                              focus ? "bg-gray-200" : ""
                            }`}
                          >
                            {item.label}
                          </Link>
                        )}
                      </MenuItem>
                    ))}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-[55px]"> </div>
    </>
  );
};

export default Navbar;

{
  /* 
  Avatar with dropdown menu in flowbit, but we will use the syntax or strycrure from headless ui
  <button data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
<span class="sr-only">Open main menu</span>
<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
</svg>
</button> */
}
