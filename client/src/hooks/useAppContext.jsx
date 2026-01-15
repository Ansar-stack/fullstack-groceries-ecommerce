import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
// Function to use AppContext
export const useAppContext = () => {
  return (
    useContext(AppContext)
  )
}

