'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleSchema, VehicleFormData } from "./schema";
import { useRouter } from "next/navigation";

export default function QuotePage(){
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm<VehicleFormData>({
        resolver: zodResolver(vehicleSchema),
    });


    function onSubmit(data: VehicleFormData){
        sessionStorage.setItem('quote-vehicle', JSON.stringify(data));
        router.push('/quote/driver');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('vehicleReg')} placeholder="Vehicle Registration"/>
            {errors.vehicleReg && <p style={{color:'red'}}>{errors.vehicleReg.message}</p>}

            <button type="submit">Next</button>
        </form>
    );
}