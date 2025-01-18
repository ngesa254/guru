"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useMemo } from "react";
import { BsGem } from "react-icons/bs";
import { TfiHelpAlt } from "react-icons/tfi";
import { GiBackwardTime } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { ImLab } from "react-icons/im";
import { IoLibrarySharp } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { IoMicOutline } from "react-icons/io5"
import { FaBrain } from "react-icons/fa";
import { signOut } from "next-auth/react";

const menuItems = [
  { id: 1, label: "AI Search", icon: IoSearchOutline, link: "/application" },
  { id: 2, label: "AgentVerse", icon: BsGem, link: "/application/guru" },
  { id: 6, label: "Guru Live", icon: IoMicOutline, link: "/application/guruLive" },
  { id: 7, label: "Brain", icon: FaBrain, link: "/application/brain" },
  { id: 8, label: "Lab", icon: ImLab, link: "/application/lab" },
  { id: 9, label: "PromptLibrary", icon: IoLibrarySharp, link: "/application/promptLibrary"},
  { id: 3, label: "Guru Live Gemini", icon: TfiHelpAlt, link: "/application/guruLiveGemini" },
  // { id: 4, label: "Activity", icon: GiBackwardTime, link: "/application/activities" },
  { id: 5, label: "Settings", icon: IoSettingsOutline, link: "/application/settings" },
];

type MenuItem = {
  id: number;
  label: string;
  icon: React.ComponentType;
  link: string;
};

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(true);
  const [isCollapsible, setIsCollapsible] = useState(false);

  // access current path
  const pathname = usePathname();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === pathname),
    [pathname]
  );

  const wrapperClasses = classNames(
    "h-screen  p-4 bg-slate-100 flex justify-between flex-col relative",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu: MenuItem) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-sky-200"]: activeMenu?.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col space-y-28 ">
        <div className="flex flex-col items-start space-y-10 relative ">
          <button className={collapseIconClasses} onClick={handleSidebarToggle}>
            <FaArrowLeft />
          </button>

          <Link href="/application/guru">
            <div className="flex py-4 px-3 items-center w-full h-full bg-slate-300 rounded-full">
              <div style={{ width: "2.5rem" }}>
                <FaPlus />
              </div>
              {!toggleCollapse && (
                <span
                  className={classNames("text-md font-medium text-text-light")}
                >
                  New chat
                </span>
              )}
            </div>
          </Link>
        </div>

        <div className="flex flex-col items-start ">
          {menuItems.map((menu) => {
            const classes = getNavItemClasses(menu);
            const Icon = menu.icon;
            return (
              <div className={classes} key={menu.id}>
                <Link href={menu.link}>
                  <div className="flex py-4 px-3 items-center w-full h-full">
                    <div style={{ width: "2.5rem" }}>
                      <Icon />
                    </div>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          "text-md font-medium text-text-light"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}

      <div 
        className="flex px-3 items-center cursor-pointer"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        <div style={{ width: "2.5rem" }}>
          <GrLogout />
        </div>
        {!toggleCollapse && (
          <span className={classNames("text-lg font-bold text-text-light")}>
            Logout
          </span>
        )}
      </div>
        </div>
      </div>
    </div>
  );
};


export default Sidebar;
