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
            <label htmlFor="driverName">Driver name</label>
            <input id="driverName" 
                {...register('driverName')} 
                placeholder="Driver name"
                aria-invalid={errors.driverName ? 'true' : 'false' }
                aria-describedby={errors.driverName ? 'driverName-error' : undefined} 
            />
            {errors.driverName && <p id="driverName-error" role="alert" style={{color:'red'}}>{errors.driverName.message}</p>}

             <label htmlFor="driverAge">Driver name</label>
            <input 
                id="driverAge" 
                {...register('driverAge')} 
                placeholder="Driver age"
                aria-invalid={errors.driverAge ? 'true': 'false'}
                aria-describedby={errors.driverAge ? 'driverAge-error': undefined}
            />
            {errors.driverAge && <p role="alert" id="driverAge-error" style={{color:'red'}}>{errors.driverAge.message}</p>}

            <button type="submit">Next</button>
        </form>
    )
    
}