export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: RateCount
}


interface RateCount {
    rate:number;
    count:number;
}