import * as React from "react"
import Image from "next/image"

const MaintenancePage = async () => {
    return (
        <main className="w-full flex justify-center items-center min-h-screen bg-white">
            <Image
                src="/images/mantencion.png"
                alt="Sitio en mantención"
                width={800}
                height={600}
                className="max-w-full h-auto"
            />
        </main>
    )
}

export default MaintenancePage;