import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <div className="w-full h-screen overflow-y-auto bg-slate-200">
      <div className="w-full flex flex-col items-center justify-center py-12" style={{height: '100%'}}>
        <div className="bg-indigo-200 w-auto h-auto py-12 pr-12 pl-4 flex justify-around items-center rounded-3xl shadow-lg">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout