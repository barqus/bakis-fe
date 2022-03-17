import React from 'react'
import './style.css'

const Podium = () => {
    return (
        <div id="podium-box" className="row" style={{height: "100px"}}>
            <div className="col-md-4 step-container m-0 p-0">
                <div>
                    300€
                </div>
                <div id="second-step" className="bg-silver border-2 step centerBoth podium-number bg-gradient-to-r from-purple-800 to-green-500 ">
                    
                </div>
            </div>
            <div className="col-md-4 step-container m-0 p-0">
                <div>
                    500€
                </div>
                <div id="first-step" className="bg-gold step border-2 centerBoth podium-number bg-gradient-to-r from-purple-800 to-green-500 ">
                    
                </div>
            </div>
            <div className="col-md-4 step-container m-0 p-0">
                <div>
                    200€
                </div>
                <div id="third-step" className="bg-bronze step border-2 centerBoth podium-number bg-gradient-to-r from-purple-800 to-green-500 ">
                    
                </div>
            </div>
        </div>
    )
}

export default Podium
