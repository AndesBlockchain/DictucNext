import React from "react";
import MenuSecundarioItem from "./MenuSecundarioItem";

const MenuSecundario = ({ items, slug }) => {
    if (!items || items.length === 0) return null;

    return (
        <div className="w-full flex justify-center items-center">
            <div className="p-2 w-3/4 flex flex-row justify-center overflow-x-visible">
                {items.map((item) => (
                    <MenuSecundarioItem
                        key={item.Link || item.Titulo}
                        item={item}
                        isActive={item.Link?.endsWith(`/${slug}`)}
                    />
                ))}
            </div>
        </div>
    );
}

export default MenuSecundario;
