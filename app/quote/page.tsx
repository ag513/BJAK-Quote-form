'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleSchema, VehicleFormData } from "./schema";

export default function QuotePage(){
    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm<VehicleFormData>({
        resolver: zodResolver(vehicleSchema),
    });


    function onSubmit(data: VehicleFormData){
        console.log('valid data', data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('vehicleReg')} placeholder="Vehicle Registration"/>
            {errors.vehicleReg && <p style={{color:'red'}}>{errors.vehicleReg.message}</p>}

            <button type="submit">Next</button>
        </form>
    );
}