import React from 'react'

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col  justify-center items-center  ">
            <main className="flex-grow container mx-auto px-4 sm:px-6 justify-center flex">
                {children}
            </main>
        </div>
    )
}

export default Layout
