import React from "react";

const MenuSecundario = ({ items, slug }) => {

    return (
        <div className="w-full flex justify-center items-center">
            <div className="p-2 w-3/4 flex flex-row justify-center">
                {items && items.map((item, index) => (
                    <div className={`font-medium text-sm pl-4 pr-4 ${item.Link && item.Link.includes(slug) ? 'border-azul-dictuc border-b-2 text-azul-dictuc' : 'border-black border-b-1'}`} key={"menu" + index}>
                        <a href={item.Link}>{item.Titulo}</a>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default MenuSecundario; 