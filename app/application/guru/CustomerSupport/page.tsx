import React from 'react'
import ChatUI from '@/components/Chat'
const page = () => {
  return (
         <div >
          <ChatUI endpoint="/api/v1/Enterpise-AI-Search" /> 
          
    </div>
  )
}

export default page