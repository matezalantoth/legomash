import React from 'react'
import {ProductCardProps} from "./models/ProductCardProps.tsx";
import {Loading} from "../Loading.tsx";
import {adjustElo, getWinnerNewElo} from "../../services/ProductService.tsx";


export const ProductCard: React.FC<ProductCardProps> = ({
                                                            product,
                                                            otherProduct,
                                                            results,
                                                            leftOrRight,
                                                            setLeftProduct,
                                                            setRightProduct,
                                                            getNewLegoSet
                                                        }: ProductCardProps) => {

    const handleClick = async () => {
        if (results && product && otherProduct) {
            results = results.filter(p => p.model_number != otherProduct.model_number)
            await adjustElo(product, otherProduct)
            const newElo = getWinnerNewElo(product, otherProduct);
            results.map(p => p.model_number == product.model_number ? {...p, elo: newElo} : p);
            product.elo = newElo;
            if (leftOrRight) {
                getNewLegoSet(product, results, setRightProduct)
                return;
            }
            getNewLegoSet(product, results, setLeftProduct)
        }
    }
    return product && otherProduct && results ? (
        <div
            className={"border-gray-300 h-half-screen relative " + (leftOrRight ? "" : "mt-8")}
            onClick={handleClick}
        >
            <div className="h-full">
                <img
                    src={product.img_link}
                    className="bg-white w-full h-full object-contain"
                    alt={`${product.model_number}: ${product.set_name}`}
                />
                <div className="text-center mt-1 text-xl">{product.model_number}: {product.set_name}</div>
            </div>
        </div>

    ) : <Loading/>
}