import {Product} from "../../../models/Product.tsx";

export interface FavouriteCardProps {
    product: Product | null,
    init: () => void

}