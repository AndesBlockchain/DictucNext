import React from "react";


const ScrollSpy=({datosBloques=[]})=>{

console.log("ScrollSpy datosBloques:", datosBloques)

    return (
        <div className="fixed 2xl:right-20 invisible xl:visible right-0 z-50">
            <div className="mb-2 max-w-[200px] text-sm underline underline-offset-4 font-semibold">En esta página</div>
            {datosBloques.map((bloque, index) => (
                <div key={index} className="mb-2 max-w-[200px] text-sm">
                    <a href={`#${bloque.id}`} className="hover:text-blue-700">
                        {bloque.Bloque?.Alias && bloque.Bloque.Alias.trim() !== '' 
                          ? bloque.Bloque.Alias 
                          : bloque.Bloque?.Titulo || `Bloque ${index + 1}`}
                    </a>
                </div>
            ))}
        </div>
   
    )

}

export default ScrollSpy