import React from "react";
import mongoDB from "../../public/mongodb.jpg";
import reactjs from "../../public/reactjs.png";
import express from "../../public/express.png";
import nodejs from "../../public/node.png";
import html from "../../public/html.png"

function Portfolio() {
  const cardItem = [
    {
      id: 1,
      logo: reactjs,
      name: "Real Estate system",
      about:"Developed a Real Estate System using the MERN stack to facilitate property listings, user authentication, and search functionality.",
      live:"https://mern-estate-system.onrender.com/",
      link:"https://github.com/Anjitkumaryadav/mern-estate-main",
    },
    {
      id: 2,
      logo: reactjs,
      name: "Act of kindness",
      about:"Created using the MERN stack where users can post and share kindness act. Integrated user authentication to promote positivity and inspire community engagement.",
      live:"https://act-of-kindness.onrender.com",
      link:"https://github.com/Anjitkumaryadav/act-of-kindness",
    },
    {
      id: 3,
      logo: html,
      name: "Landing page",
      about:"Designed and developed a responsive landing page using HTML and CSS, focusing on clean layout, accessibility, and user experience in this page.",
      live: "https://anjitkumaryadav.github.io/Landing-page/",
      link:"https://github.com/Anjitkumaryadav/Landing-page",
    },
    {
      id: 4,
      logo: html,
      name: "Sundown clone",
      about:"Built an animated Sundown clone using HTML, CSS, and JavaScript, incorporating smooth transitions and interactive elements to enhance the user experience.",
      live:"https://anjitkumaryadav.github.io/Sundown-clone/",
      link:"https://github.com/Anjitkumaryadav/Sundown-clone",
    },
  ];
  return (
    <div
      name="Portfolio"
      className="max-w-screen-2xl container mx-auto px-4 md:px-20 my-20"
    >
      <div>
        <h1 className="text-3xl font-bold mb-5">Portfolio</h1>
        <span className="underline font-semibold ">Featured Projects</span>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-5">
          {cardItem.map(({ id, logo, name,about,live, link }) => (
            <div
              className=" md:w-[270px] md:h-[350px] border-[2px] rounded-lg shadow-lg p-1 cursor-pointer hover:scale-105 "
              key={id}
            >
              <div className="flex justify-center items-center">
                <img
                  src={logo}
                  alt=""
                  className="w-[120px] h-[120px] p-1 rounded-full border-[2px] "
                />
              </div>

              <div className="flex flex-col justify-center items-center">
                <div className="font-semibold mb-2">{name}</div>
                <p className="text-sm text-center font-thin">{about}</p>
              </div>
              <br />
              <div className="flex justify-between ">
                <button className="border-[2px] py-1 px-2 bg-blue-500 hover:bg-blue-700 text-white  rounded-[5px]">
                  <a href={live} target="_blank">
                    live
                  </a>
                </button>
                <button className="border-[2px] py-1 px-2 bg-green-500 hover:bg-green-700 text-white  rounded-[5px]">
                  <a href={link} target="_blank">Source code</a> 
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
