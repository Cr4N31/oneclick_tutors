import { useState } from "react"
import Header from "../upload/components/pdfupload/Header"
import UploadComponent from "../upload/components/pdfupload/UploadComponent"
import Viewer from "../upload/components/pdfupload/Viewer"

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