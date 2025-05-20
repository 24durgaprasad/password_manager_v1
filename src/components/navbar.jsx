import React from 'react'

const navbar = () => {
  return (
    <div>
<div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-100 opacity-100 blur-[100px]"></div></div>

<nav className='flex justify-around items-center py-4 bg-[#0f172a] text-white  '>
  <div className="logo text-2xl text-green-400 font-bold  ">Mypa<span className='text-yellow-500 '>$$</span></div>
  <ul className='flex gap-4 items-center'> 
   <li className='hover:font-bold'>Home</li>
   <li className='hover:font-bold'>Contact</li>
   <li className='hover:font-bold'>Support</li>
   <div className="github text-2xl"><a href="/"><i className="ri-github-fill"></i></a></div>


  </ul>



</nav>




    </div>
  )
}

export default navbar