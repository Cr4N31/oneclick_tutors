import { useEffect } from "react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import LandingPage from "./pages/LandingPage"
function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <>
      <LandingPage/>
    </>
  )
}

export default App
