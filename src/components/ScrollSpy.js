import React from "react";


const ScrollSpy=({datosBloques=[]})=>{

    return (
        <div className="fixed 2xl:right-10 invisible 2xl:visible right-0 z-50">
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