import React from 'react'
import TCLogo from './PNGS/TC_EU_baltas@72x.png'
import ViperLogo from './PNGS/VIPER.png'
import ZyroLogo from './PNGS/Zyro Logo White.png'
import SurfsharkLogo from './PNGS/SurfsharkLogo.png'
import Tuta from './PNGS/TUTA.png'
import Wolt from './PNGS/WOLT.png'
import Razer from './PNGS/razer.png'
const SponsorsComponent = () => {
    return (
        <div className=" inline-grid justify-center mb-12  break-normal text-white text-xl font-bold font-sans">
            <div className="bg-gray-900 mt-6 pr-4 pl-4 rounded-xl w-auto border-4 border-purple-400">
                <div className="lg:grid lg:grid-rows-2 p-6 lg:grid-cols-3 gap-12 grid-flow-cols text-left mt-6">
                    <div className="flex justify-center items-center mb-6 ">
                        <img src={TCLogo} alt="logo" className="cursor-pointer" onClick={() => { window.open("https://www.topocentras.lt/", "_blank") }} />
                    </div>
                    <div className="col-span-2 text-justify mb-12">
                        Nori atsinaujinti savo įrangą ir pakelti savo lygį? Topo Centre rasi viską ko tau reikia. Nuo pilnai sukomplektuoto kompiuterio, iki naujos mechaninės klaviatūros.
                    </div>
                    <div className="flex justify-center items-center mb-6">
                        <img src={ViperLogo} alt="logo" className="cursor-pointer" onClick={() => { window.open("https://viper.patriotmemory.com/", "_blank") }} />
                    </div>
                    <div className="col-span-2  text-justify mb-12">
                        Lyderiaujantys SSD, RAM ir periferijos gamintojai. Įsikūrę 1985 metais Amerikoje. Žaidėjams suteikiantys geriausią galios ir kainos santykį rinkoje.
                    </div>

                    <div className="flex justify-center items-center mb-6 ">
                        <img src={Wolt} alt="logo" className="cursor-pointer w-40" onClick={() => { window.open("https://wolt.com/lt/apply-as-courier?utm_source=Affiliate&utm_medium=banner&utm_campaign=LTU_Vilnius_Web_COURIER_LOCAL_VNO12&utm_content=FILLQ", "_blank") }} />
                    </div>
                    {/* https://wolt.com/lt/apply-as-courier?utm_source=Affiliate&utm_medium=banner&utm_campaign=LTU_Vilnius_Web_COURIER_LOCAL_VNO12&utm_content=FILLQ */}
                    <div className="col-span-2  text-justify mb-12">
                        Su Wolt neįtikėtinai lengvai atrasi ir gausi tai, ko nori. Puikių restoranų meniu, maisto prekės ir viskas, ko tau gali prireikti bus pristatyta - greitai, patikimai ir už prieinamą kainą.
                    </div>
                    <div className="flex justify-center items-center mb-6">
                        <img src={ZyroLogo} alt="logo" className="cursor-pointer" onClick={() => { window.open("https://zyro.com/lt/special/fillq", "_blank") }} />
                    </div>
                    <div className="col-span-2 text-justify mb-12">
                        Susikurk svetainę ar el. parduotuvę su Zyro lengvai ir greitai! Gauk iki 72% nuolaidą, 3 nemokamus mėnesius ir domeną dovanų su kodu <p onClick={() => { window.open("https://zyro.com/lt/special/fillq", "_blank") }} className="underline cursor-pointer text-purple-400 inline-block">FILLQ</p>.
                    </div>

                    <div className="flex justify-center items-center mb-6">
                        <img src={SurfsharkLogo} alt="logo" className="cursor-pointer" onClick={() => { window.open("https://surfshark.deals/FILLQ", "_blank") }} />
                    </div>
                    <div className="col-span-2 text-justify mb-12">
                        Po visų duomenų nesaugumo skandalų būtų nuodėmė naršyti internete be VPN. Gera žinia ta, kad Surfshark paruošė jums labai gerą deal‘ą. Naudok kodą <p onClick={() => { window.open("https://surfshark.deals/FILLQ", "_blank") }} className="underline cursor-pointer text-purple-400 inline-block">FILLQ</p> ir gauk 83% nuolaidą bei keturis papildomus mėnesius nemokamai.
                    </div>
                    <div className="flex justify-center items-center mb-6">
                        <img src={Tuta} alt="logo" className="cursor-pointer" onClick={() => { window.open("https://tuta.lt/", "_blank") }} />
                    </div>
                    <div className="col-span-2 text-justify mb-12">
                        Nori kartu su komanda ar kolektyvu pasidaryti išskirtinius marškinėlius?
                        Susisiek su Tūta, jie profesionaliai patars ir padės visais klausimais.
                        Iron Wolves komanda naudoja išskirtinai tik Tūtos esports marškinėlius!
                    </div>

                    <div className="flex justify-center items-center mb-6">
                        <img src={Razer} alt="logo" className="cursor-pointer" onClick={() => { window.open("https://www.topocentras.lt/razer", "_blank") }} />
                    </div>
                    <div className="col-span-2 text-justify mb-12">
                        Visiems girdėtas ir pasaulyje lyderiaujantis kompiuterinės technikos prekinis ženklas padedantis geimeriams pasiekti aukščiausią lygį.
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SponsorsComponent
