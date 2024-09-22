import React from "react";
import { useState } from "react";
import pic from "../../public/photo.avif";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-scroll";

function Navbar() {
  const [menu, setMenu] = useState(false);
  const navItem = [
    {
      id: 1,
      text: "Home",
    },
    {
      id: 2,
      text: "About",
    },
    {
      id: 3,
      text: "Portfolio",
    },
    {
      id: 4,
      text: "Experience",
    },
    {
      id: 5,
      text: "Contacts",
    },
  ];
  return (
    <div>
      <div className="max-w-screen-2xl container mx-auto px- md:px-20 h-16 shadow-md fixed top-0 left-0 right-0 bg-gray-700">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-2">
            <img src={pic} className="h-12 w-12 rounded-full" alt="logo" />
            <h1 className="font-semibold text-xl cursor-pointer">
              Anjit
              <p className="text-xm">Web Developer</p>
            </h1>
          </div>
          <div>
            <ul className="hidden  md:flex space-x-8">
              {navItem.map(({ id, text }) => (
                <li
                  className="hover:scale-105 duration-200 cursor-pointer"
                  key={id}
                >
                  <Link
                    to={text}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    activeClass="active"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
            <div onClick={() => setMenu(!menu)} className="md:hidden">
              {menu ? (
                <IoMdClose size={24} className="cursor-pointer" />
              ) : (
                <FiMenu size={24} className="cursor-pointer" />
              )}
            </div>
          </div>
        </div>
        {/*mobile navbar*/}
        {menu && (
          <div>
            <ul className=" md:hidden flex flex-col items-center justify-center space-y-3 text-lg bg-white">
              {navItem.map(({ id, text }) => (
                <li
                  className="hover:scale-105 duration-200 font-semibold cursor-pointer"
                  key={id}
                >
                  <Link
                    onClick={() => setMenu(!menu)}
                    to={text}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    activeClass="active"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
