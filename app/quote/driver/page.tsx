'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { driverSchema, DriverFormData } from "../schema";
import { useRouter } from "next/navigation";

export default function DriverPage(){
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm<DriverFormData>({
        resolver: zodResolver(driverSchema),
    });

    function onSubmit(data: DriverFormData){
        sessionStorage.setItem('quote-driver', JSON.stringify(data));
        router.push('/quote/cover');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('driverName')} placeholder="Driver name"/>
            {errors.driverName && <p style={{color:'red'}}>{errors.driverName.message}</p>}

            <input {...register('driverAge')} placeholder="Driver age"/>
            {errors.driverAge && <p style={{color:'red'}}>{errors.driverAge.message}</p>}

            <button type="submit">Next</button>
        </form>
    )
    
}