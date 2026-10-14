'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { driverSchema, DriverFormData } from "../schema";

export default function DriverPage(){
    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm<DriverFormData>({
        resolver: zodResolver(driverSchema),
    });

    function onSubmit(data: DriverFormData){
        console.log('Valid driver data', data);
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