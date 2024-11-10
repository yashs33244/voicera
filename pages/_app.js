import Preloader from "@/components/elements/Preloader"
import { useEffect, useState } from "react"

import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import "/public/assets/css/animate.min.css"
import "/public/assets/css/bootstrap.min.css"
import "/public/assets/css/fontawesome-all.min.css"
import "/public/assets/css/magnific-popup.css"
import "/public/assets/css/odometer.css"
import "/public/assets/css/animatedheadline.css"
import "/public/assets/css/default.css"
import "/public/assets/css/select2.min.css"
import "/public/assets/css/style.css"
import "/public/assets/css/responsive.css"
import { SessionProvider } from "next-auth/react"


function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])
    return (<>
        {!loading ? (
             <SessionProvider session={session}>
                 <Component {...pageProps} />
             </SessionProvider>
        ) : (
            <Preloader />
        )}
    </>)
}

export default MyApp
