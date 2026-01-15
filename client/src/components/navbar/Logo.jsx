import React from 'react'
import {LuHexagon} from 'react-icons/lu'
const Logo = () => {
  return (
    <a href="/" className="flex  items-center gap-1">
        <div className=" flex justify-center items-center">
          <LuHexagon className="" size={40} />
          <span className="font-mono absolute font-semibold">KC</span>
        </div>
        <span className="font-bold text-xl sm:text-[24px]">khanCart</span>
      </a>
  )
}

export default Logo