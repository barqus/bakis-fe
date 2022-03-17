import React from 'react'

const Spinner = () => {
    return (
        <div style={{ minHeight: "100vh" }} className=" flex justify-center items-center">
            <div style={{ borderTopColor: "transparent" }}
            className="w-32 h-32 border-4 border-purple-400 border-solid rounded-full animate-spin">
            </div>
        </div>

    )
}

export default Spinner
