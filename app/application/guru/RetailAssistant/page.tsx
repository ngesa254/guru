import React from 'react'
import ChatUI from '@/components/Chat'
 const page = () => {
   return (
          <div >
           <ChatUI endpoint="/api/v1/retail-product-recommendation-service"/> 
           {/* "/api/v1/Enterpise-AI-Search" */}
           {/* "/api/v1/retail-product-recommendation-service" */}
           {/* https://kf0bl71x31.execute-api.eu-west-1.amazonaws.com/UAT/api/v1/retail-product-recommendation-service */}
         
     </div>
   )
 }

export default page

