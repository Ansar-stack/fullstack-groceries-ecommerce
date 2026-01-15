import React from 'react'

const Button = ({text, onClick=()=>{}, type="button", classes="rounded-full"}) => {
  return (
    <button
    className={`cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white text-sm font-semibold ${classes}`}
    onClick={onClick}
    type='button'
    >{text}</button>
  )
}

export default Button