import assets from '../assets/lego-assets.json'
import {Product} from "../models/Product.tsx";


export const parseData: () => Product[] = (): Product[] => {
    return assets
}