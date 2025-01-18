import {Product} from "../models/Product.tsx";


export const getData: () => Promise<Product[]> = async (): Promise<Product[]> => {
    const res: Response = await fetch("/api/lego-sets")
    return await res.json();
}