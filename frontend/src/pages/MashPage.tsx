import {useState, useEffect} from 'react';
import {parseData} from "../services/LegoDataParser.tsx";
import {Product} from "../models/Product.tsx";
import {Loading} from "../components/Loading.tsx";
import {ProductCard} from "../components/product/ProductCard.tsx";
import {ProductCardProps} from "../components/product/models/ProductCardProps.tsx";

export const MashPage = () => {

    const [products, setProducts] = useState<Product[] | null>(null);
    const [leftProduct, setLeftProduct] = useState<Product | null>(null)
    const [rightProduct, setRightProduct] = useState<Product | null>(null)

    useEffect((): void => {
        const result: Product[] = parseData();
        setProducts(result)
        const left: number = Math.floor(Math.random() * result.length);
        const right: number = Math.floor(Math.random() * result.length);
        setLeftProduct(result[left]);
        setRightProduct(result[right]);
    }, [])

    const leftProps: ProductCardProps = {product: leftProduct}
    const rightProps: ProductCardProps = {product: rightProduct}

    return products && leftProduct && rightProduct ? (
        <>
            <p>Mash page works!</p>
            <ProductCard {...leftProps}/>
            <ProductCard {...rightProps}/>
        </>
    ) : <Loading/>
}