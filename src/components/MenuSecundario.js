import React from "react";
import useMenuSecundario from "../hooks/use-menu-secundario";
import { getFullUrl } from "../helpers/links-helpers";
import useSiteMetadata from "../hooks/use-site-metadata";

const MenuSecundario = ({slug=""}) => {

    const items= useMenuSecundario();
    const metadata = useSiteMetadata();

    return (
        <div className="w-full flex justify-center items-center">
            <div className="p-2 w-3/4 flex flex-row justify-center">
                {items.map((item,index)=>(
                    <div className={`font-medium text-sm pl-4 pr-4 ${item.Link.includes(slug) ? 'border-azul-dictuc border-b-2 text-azul-dictuc' : 'border-black border-b-1'}`} key={"menu"+index}>
                        <a href={getFullUrl(item.Link,metadata.siteUrl)}>{item.Titulo}</a>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default MenuSecundario; 