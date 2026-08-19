import MenuSecundarioItem from "./MenuSecundarioItem";

const MenuSecundario = ({ menu, slug }) => {
    if (!menu?.Links || menu.Links.length === 0) return null;

    return (
        <div className="w-full flex justify-center items-center">
            <div className="p-2 w-full md:w-3/4 flex flex-wrap justify-center gap-y-2">
                {menu.Links.map((item, index) => (
                    <MenuSecundarioItem
                        key={item.url || item.Texto || index}
                        item={item}
                        isActive={item.url?.endsWith(`/${slug}`)}
                    />
                ))}
            </div>
        </div>
    );
}

export default MenuSecundario;
