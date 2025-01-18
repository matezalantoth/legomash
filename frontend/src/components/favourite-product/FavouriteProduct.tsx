import {FavouriteCardProps} from "./models/FavouriteCardProps.tsx";
import {Loading} from "../Loading.tsx";

export const FavouriteProduct = ({product, init}: FavouriteCardProps) => {

    return product ?
        <div className="flex flex-col items-center justify-center min-h-screen">
            <span className="mb-2 text-xl">Your favourite set is</span>
            <span className="mb-2 text-xl">{product.model_number}: {product.set_name} </span>
            <img src={product.img_link} alt="Product"/>
            <div className="my-4">
                <a href={product.link}>
                    <button className="bg-blue-500 text-white rounded-md px-3 py-2">
                        Take a closer look!
                    </button>
                </a>
            </div>
            <button
                onClick={init}
                className="bg-green-500 text-white rounded-md px-3 py-2">
                Play again
            </button>
        </div> : <Loading/>
}
