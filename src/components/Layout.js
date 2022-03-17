import React from 'react'
import TopoCentrasLogo from './Sponsors/PNGS/TC_EU_baltas@72x.png'
import ViperLogo from './Sponsors/PNGS/VIPER.png'
import ZyroLogo from './Sponsors/PNGS/Zyro Logo White.png'
import SurfsharkLogo from './Sponsors/PNGS/SurfsharkLogo.png'
import Tuta from './Sponsors/PNGS/TUTA.png'
import Wolt from './Sponsors/PNGS/WOLT.png'
import Razer from './Sponsors/PNGS/razer.png'
import CandyPop from './Sponsors/PNGS/CANDY POP.png'
const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col  justify-center items-center  ">
            <main className="flex-grow container mx-auto px-4 sm:px-6 justify-center flex">
                {/* <img src={TopoCentrasLogo} onClick={() => { window.open("https://www.topocentras.lt/", "_blank") }}  className="cursor-pointer m-auto mt-12" alt="topo centras" /> */}
                {children}
                {/* <div className="md:flex  mb-12">
                    <img src={ViperLogo} onClick={() => { window.open("https://viper.patriotmemory.com/", "_blank") }}  className="m-auto mt-12 max-h-10 cursor-pointer" alt="topo centras" />
                    <img src={SurfsharkLogo} onClick={() => { window.open("https://surfshark.deals/FILLQ", "_blank") }} className="m-auto mt-12 max-h-10 cursor-pointer" alt="topo centras" />
                    <img src={Tuta} onClick={() => { window.open("https://tuta.lt/", "_blank") }} className="m-auto mt-12 max-h-10 cursor-pointer" alt="topo centras" />
                    <img src={ZyroLogo} onClick={() => { window.open("https://zyro.com/lt/special/fillq")}} className="m-auto mt-12 max-h-10 cursor-pointer" alt="topo centras" />
                    <img src={Wolt} onClick={() => { window.open("https://wolt.com/lt/apply-as-courier?utm_source=Affiliate&utm_medium=banner&utm_campaign=LTU_Vilnius_Web_COURIER_LOCAL_VNO12&utm_content=FILLQ", "_blank") }} className="m-auto mt-12 max-h-10  cursor-pointer" alt="topo centras" />
                    <img src={Razer} onClick={() => { window.open("https://www.topocentras.lt/razer", "_blank") }}  className="m-auto mt-9 max-h-16 cursor-pointer" alt="topo centras" />
                    <img src={CandyPop} onClick={() => { window.open("https://www.candypop.lt", "_blank") }}  className="m-auto mt-12 max-h-14 cursor-pointer" alt="topo centras" />
                </div> */}
            </main>
        </div>
    )
}

export default Layout
