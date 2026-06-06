import LandingNav from "../landing/LandingNav"
import Hero from "../landing/Hero"
import About from "../landing/About"
import Features from "../landing/Features"
import Pricing from "../landing/Pricing"
import Contact from "../landing/Contact"
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
