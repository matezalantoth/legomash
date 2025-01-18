import {Product} from "../models/Product.tsx";


export const getData: () => Promise<Product[]> = async (): Promise<Product[]> => {
    const res: Response = await fetch("/api/lego-sets")
    return await res.json();
}

export const adjustElo = async (winner: Product, loser: Product) => {
    await fetch("/api/adjust-elo", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            winner: {model_number: winner.model_number, elo: winner.elo},
            loser: {model_number: loser.model_number, elo: loser.elo}
        })
    })
}

export const getClosestMatch = (sets: Product[], target: Product): Product[] => {
    const filtered = sets.filter(s => s.model_number != target.model_number)
    return filtered.sort((a, b) => {
        const diffA = Math.abs(calculateCloseness(a.elo, target.elo) - 0.5);
        const diffB = Math.abs(calculateCloseness(b.elo, target.elo) - 0.5);

        return diffA - diffB;
    })
}

export const getWinnerNewElo = (winner: Product, loser: Product): number => {
    return calcNewElo(winner.elo, 1, calculateCloseness(loser.elo, winner.elo))
}

const calculateCloseness = (ratingA: number, ratingB: number): number => {
    return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400))
}

const calcNewElo = (rating: number, actualScore: number, expectedScore: number) => {
    const k = 20;
    return rating + k * (actualScore - expectedScore)
}



