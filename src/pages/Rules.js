import React from 'react'
import Podium from '../components/Podium/Podium.js'

const Rules = () => {
    return (
        <div className="grid justify-center mb-12  mt-12 text-center text-white text-3xl font-bold font-sans">
            FILLQ INFORMACIJA
            <div className="bg-gradient-to-r from-purple-800 to-green-500 border-2 border-purple-400 mt-6 pr-4 pl-4 rounded-xl pb-7 w-auto"style={{
                        background:
                            "linear-gradient(120deg,#722f818a 40%, rgba(3, 71, 57, 0.8) 100%)",
                    }}>

                <div className=" colspan-2 text-xl text-left mt-4 m-2 rounded-lg">
                    <p className="text-3xl text-center mb-2">TAISYKLĖS</p>
                    <ul>
                        <li> 1. Visi žaidimai transliuojami </li>
                        <li> 2. Žaidžiama tik FILL </li>
                        <li> 3. Negalima prašyti kitos rolės </li>
                        <li> 4. Žaidžiama tik solo </li>
                        <li> 5. Žaidžiama tik su viena paskyra </li>
                    </ul>
                    <hr className=" my-6" />
                    <p className="text-3xl text-center ">PRIZAI</p>
                    <Podium />
                    {/* <div className="grid grid-rows-2 grid-cols-4 grid-flow-row text-left mt-6">
                        <div>
                            4. 100€
                        </div>
                        <div>
                            5. 75€
                        </div>
                        <div>
                            6. 65€
                        </div>
                        <div>
                            7. 55€
                        </div>
                        <div>
                            8. 45€
                        </div>
                        <div>
                            9. 35€
                        </div>
                        <div>
                            10. 25€
                        </div>
                    </div> */}
                </div>
                {/* <br />
                <p className="text-lg">
                    Taip pat Razer įsteigti prizai laimėtojams: <br />
                    1. BlackWidow V3 (green) <br />Barracuda X <br />Viper and Strider XXL<br />
                    2. Barracuda X + Viper<br />
                    3. Barracuda X<br />
                    <br />
                    Vienas dalyvis gaus 100€ bonus
                </p> */}

            </div >
        </div >
    )
}

export default Rules