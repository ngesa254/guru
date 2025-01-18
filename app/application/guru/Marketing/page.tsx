import React from 'react'
import ChatUI from '@/components/Chat';
const page = () => {

  const endpoint = "/api/v1/Enterpise-AI-Search" ;

  return (
   
         <div >
          <ChatUI endpoint={endpoint} /> 
    </div>
  )
}

export default page