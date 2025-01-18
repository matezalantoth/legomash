import {SetStateAction, useEffect, useState} from 'react';
import {getClosestMatch, getData} from "../services/ProductService.tsx";
import {Product} from "../models/Product.tsx";
import {Loading} from "../components/Loading.tsx";
import {ProductCard} from "../components/product/ProductCard.tsx";
import {ProductCardProps} from "../components/product/models/ProductCardProps.tsx";
import {FavouriteProduct} from "../components/favourite-product/FavouriteProduct.tsx";
import {FavouriteCardProps} from "../components/favourite-product/models/FavouriteCardProps.tsx";

export const MashPage = () => {

    const [products, setProducts] = useState<Product[] | null>(null);
    const [leftProduct, setLeftProduct] = useState<Product | null>(null)
    const [rightProduct, setRightProduct] = useState<Product | null>(null)

    useEffect(() => {
        init()
    }, []);

    const init = () => {
        getData().then((results) => {
            results.sort((a, b) => a.elo - b.elo)
            setLeftProduct(results[0]);
            getNewLegoSet(results[0], results, setRightProduct)
        });
    }


    const getNewLegoSet = (target: Product, results: Product[], setProduct: {
        (value: SetStateAction<Product | null>): void;
        (arg0: Product): void;
    }) => {
        results = getClosestMatch(results, target)
        setProducts(results)
        setProduct(results[0]);
    }

    const favouriteProps: FavouriteCardProps = {
        product: leftProduct ? leftProduct : rightProduct,
        init: init
    }

    const leftProps: ProductCardProps = {
        product: leftProduct,
        otherProduct: rightProduct,
        results: products,
        leftOrRight: true,
        setLeftProduct: setLeftProduct,
        setRightProduct: setRightProduct,
        getNewLegoSet: getNewLegoSet
    }
    const rightProps: ProductCardProps = {
        product: rightProduct,
        otherProduct: leftProduct,
        results: products,
        leftOrRight: false,
        setLeftProduct: setLeftProduct,
        setRightProduct: setRightProduct,
        getNewLegoSet: getNewLegoSet
    }

    return products ? products?.length != 0 ? (
            <>
                <ProductCard {...leftProps}/>
                <ProductCard {...rightProps}/>
            </>
        ) :
        <>
            <FavouriteProduct {...favouriteProps}/>
        </> : <Loading/>
}