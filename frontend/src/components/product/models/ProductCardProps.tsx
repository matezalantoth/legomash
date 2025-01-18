import {Product} from "../../../models/Product.tsx";
import {SetStateAction} from "react";

export interface ProductCardProps {
    product: Product | null
    otherProduct: Product | null
    results: Product[] | null
    leftOrRight: boolean
    setLeftProduct: {
        (value: SetStateAction<Product | null>): void;
        (arg0: Product): void;
    }
    setRightProduct: {
        (value: SetStateAction<Product | null>): void;
        (arg0: Product): void;
    }
    getNewLegoSet: any
}