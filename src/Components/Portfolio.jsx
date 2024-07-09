import React from 'react'
import mongoDB from '../../public/mongodb.jpg'
import reactjs from '../../public/reactjs.png'
import express from '../../public/express.png'
import nodejs from '../../public/node.png'

function Portfolio() {
    const cardItem=[
        {
            id:1,
            logo:mongoDB,
            name:"MongoDB"
        },
        {
            id:2,
            logo:reactjs,
            name:"React js"
        },
        {
            id:3,
            logo:express,
            name:"Express js"
        },
        {
            id:4,
            logo:nodejs,
            name:"Node js"
        }
    ]
  return (
    <div name="Portfolio" className='max-w-screen-2xl container mx-auto px-4 md:px-20 my-20'>
        <div>
            <h1 className='text-3xl font-bold mb-5'>Portfolio</h1>
            <span className='underline font-semibold '>Featured Projects</span>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-3 my-5'>
                { cardItem.map(({id,logo,name}) => (
                    <div className=' md:w-[270px] md:h-[350px] border-[2px] rounded-lg shadow-lg p-1 cursor-pointer hover:scale-105 'key={id}>
                        <div className='flex justify-center items-center'>
                        <img src={logo} alt="" className='w-[120px] h-[120px] p-1 rounded-full border-[2px] ' />
                        </div>
                        
                            
                            
                        
                        <div className='flex flex-col justify-center items-center'>
                            <div className="font-semibold">{name}</div>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                        <br/>
                        <div className='flex justify-between '>
                            <button className='border-[2px] py-1 px-2 bg-blue-500 hover:bg-blue-700 text-white  rounded-[5px]'>Video</button>
                            <button className='border-[2px] py-1 px-2 bg-green-500 hover:bg-green-700 text-white  rounded-[5px]'>Source code</button>
                        </div>
                        
                        </div>
                    ))
                }
                
            </div>
        </div>
    </div>
  )
}

export default Portfolio