import { useState } from "react"
import Header from "../components/pdfupload/Header"
import UploadComponent from "../components/pdfupload/UploadComponent"
import Viewer from "../components/pdfupload/Viewer"

function UploadPdf() {
    const [activePage, setActivePage] = useState("#upload")


    return (
        <main>         
        <Header 
            activePage={activePage}
            setActivePage={setActivePage}
        />
        {activePage === '#upload' && <UploadComponent />}
        {activePage === '#viewer' && <Viewer />}
        </main>

    )
}

export default UploadPdf