import React from 'react';
import html from "../../public/html.png";
import css from "../../public/css.jpg";
import javascript from "../../public/javascript.png";
import mongodb from "../../public/mongodb.jpg";
import reactjs from "../../public/reactjs.png";
import express from "../../public/express.png";
import nodejs from"../../public/node.png"


function Experience() {
    const cardItem=[
        {
            id:1,
            logo:html,
            name:"HTML"
        },
        {
            id:2,
            logo:css,
            name:"CSS"
        },
        {
            id:3,
            logo:reactjs,
            name:"React js"
        },
        {
            id:4,
            logo:nodejs,
            name:"Node js"
        },
        {
            id:5,
            logo:express,
            name:"Express js"
        },
        {
            id:6,
            logo:mongodb,
            name:"MongoDB"
        },
        {
            id:7,
            logo:javascript,
            name:"Javascript",
        }
    ]

  return (
    <div name="Experience" className='max-w-screen-2xl container mx-auto px-4 md:px-20 my-20'>
        <div>
            <h1 className='text-3xl font-bold mb-5'>Experience</h1>
            <p className=''>I have build projects in below technologies.</p>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-7 my-3'>
                { cardItem.map(({id,logo,name}) => (
                    <div className='flex flex-col items-center justify-center h-[200px] w-[200px] border-[1px] rounded-full shadow-sm  cursor-pointer hover:scale-105 'key={id}>
                        <div className='flex justify-center items-center'>
                        <img src={logo} alt="" className='w-[120px] h-[120px] rounded-full  ' />
                        </div>
                        <div className=''>
                            <div className="font-semibold">{name}</div>
                        
                        </div>
                        </div>
                    ))
                }
                
            </div>
        </div>
    </div>
  )
}

export default Experience