'use client';

import { useEffect, useState } from "react";

type QuoteOption = {
    id: string;
    provider: string;
    price: number;
}

const sampleQuotes: QuoteOption[] = [
    { id: '1', provider: 'Admiral', price: 320 },
    { id: '2', provider: 'Aviva', price: 290 },
    { id: '3', provider: 'Direct Line', price: 345 },
]

export default function ResultsPage(){
    const [quotes,setQuotes] = useState<QuoteOption[] | null>(null);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setQuotes(sampleQuotes);
        }, 1000)
        return () => clearTimeout(timer);
    }, [])

    if(quotes === null){
        return <p aria-live="polite">Loading quotes...</p>;
    }

    if(quotes.length === 0){
        return <p>No quotes available, change your details</p>;
    }

    const sorted = [...quotes].sort((a,b)=>a.price - b.price)
    console.log(quotes, sorted);
    return (
        <div>
            <p><em>Quote details.</em></p>
            <table>
                 <caption>Quotes sorted by price, lowest first</caption>
                <thead>
                    <tr>
                        <th scope="col">Provider</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sorted.map(quote=>(
                            <tr key={quote.id}>
                                <td>{quote.provider}</td>
                                <td>{quote.price}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}