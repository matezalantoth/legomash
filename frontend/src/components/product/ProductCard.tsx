import React from 'react'
import {ProductCardProps} from "./models/ProductCardProps.tsx";
import {Loading} from "../Loading.tsx";


export const ProductCard: React.FC<ProductCardProps> = ({product}: ProductCardProps) => {

    console.log(product)

    return product ? (
        <>
            <div>
                <img src={product.img_link}/>
            </div>
        </>) : <Loading/>
}