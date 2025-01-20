import React, {useEffect, useState} from 'react'
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

    const [showCheckmark, setShowCheckmark] = useState<boolean>(false);
    const [jumpOut, setJumpOut] = useState<boolean>(false)
    const [clickable, setClickable] = useState<boolean>(true)
    const [animateIn, setAnimateIn] = useState<boolean>(false)


    const handleClick = async () => {
        if (results && product && otherProduct && clickable) {
            setShowCheckmark(true);
            setClickable(false)
            setTimeout(() => {
                setJumpOut(true)
            }, 800)
            setTimeout(() => {
                setShowCheckmark(false)
                setJumpOut(false)
                setClickable(true)
            }, 1000)

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

    useEffect(() => {
        setAnimateIn(true)
        setTimeout(() => {
            setAnimateIn(false)
        }, 400)
    }, [product])

    return product && otherProduct && results ? (
        <div
            className={"border-gray-300 h-half-screen max-w-full relative " + (leftOrRight ? "" : "mt-8") + (animateIn ? " animate-fade-in" : "")}
            onClick={handleClick}
        >
            {showCheckmark && (
                <div className="absolute inset-0 flex justify-center items-center z-10">
                    <div
                        className={"text-white bg-green-500 px-4 shadow-md py-2.5 rounded-3xl text-4xl" + (jumpOut ? " animate-jump-out" : " animate-jump-in")}>
                        <i className="fa-solid mt-1 fa-check"></i>
                    </div>
                </div>
            )}

            <div className="h-full">
                <img
                    src={product.img_link}
                    className="bg-white w-full h-full object-contain"
                />
                <div
                    className="text-center max-w-full text-nowrap truncate mt-1 text-xl">{product.model_number}: {product.set_name}</div>
            </div>
        </div>

    ) : <Loading/>
}