import LandingNav from "../components/landing/LandingNav"
import Hero from "../components/landing/Hero"
import About from "../components/landing/About"
import Features from "../components/landing/Features"
import Pricing from "../components/landing/Pricing"
import Contact from "../components/landing/Contact"
function LandingPage(){
    return(
        <>
            <LandingNav/>
            <Hero/>
            <About/>
            <Features/>
            <Pricing/>
            <Contact/>
        </>
    )
}

export default LandingPage
