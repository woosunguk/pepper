import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-1 h-full bg-white">{children}</div>
}

export default Layout
