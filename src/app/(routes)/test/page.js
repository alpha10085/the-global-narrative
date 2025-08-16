import StringEditor from '@/components/Shared/StringEditor/StringEditor'
import React from 'react'

const page = () => {
  return (
   <div style={{
    height:"100vh",
    width:"100%",
    marginTop:"150px"

   }}
   className='flex '
   >
    <StringEditor />
   </div>
  )
}

export default page