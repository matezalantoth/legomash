import {useEffect, useState} from "react";
import {getData} from "../services/ProductService.tsx";
import {Product} from "../models/Product.tsx";

export const LeaderboardPage = () => {
    const [products, setProducts] = useState<Product[] | null>(null)

    useEffect(() => {
        getData().then((results) => {
            results.sort((a, b) => b.elo - a.elo)
            setProducts(results)
        })
    })

    return products ?
        <div className="ml-4 mt-2">
            <ul>{products.map((p, i) => {
                return (<li key={i} className="text-xl">{i + 1}. {p.set_name}</li>);
            })}</ul>
        </div>
        : (<>
            <p>Leaderboard page works!</p>
        </>)
}