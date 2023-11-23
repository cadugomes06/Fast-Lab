import { useEffect, useState } from 'react';

const LoadingCup = () => {
    const [typeNavigator, setTypeNavigator] = useState('')

        //Identificar o navegador
        useEffect(() => {
            if (navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.indexOf('Safari') > -1) {
              setTypeNavigator('chrome')
            } else if (navigator.userAgent.indexOf('Safari') > -1) {
              setTypeNavigator('safari')
            }
        }, [])
//bg-black/80
    return (
        <section className={`supports-flex:flex  ${typeNavigator == 'safari' ? 'absolute' : 'fixed'} top-0 w-full h-full sm:h-[100vh] z-50 bg-black/80  justify-center items-center`}>

            <div className="cup"></div>

        </section>
    )
}


export default LoadingCup;