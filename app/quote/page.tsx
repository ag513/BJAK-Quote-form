'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleSchema, VehicleFormData } from "./schema";
import { useRouter, useSearchParams  } from "next/navigation";
import { Suspense, useEffect } from "react";

function QuoteFormInner(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors},
    } = useForm<VehicleFormData>({
        resolver: zodResolver(vehicleSchema),
    });

    useEffect(()=>{
        setValue('utmSource', searchParams.get('utm_source') || '');
        setValue('utmMedium', searchParams.get('utm_medium') || '');
        setValue('utmCampaign', searchParams.get('utm_campaign') || '');
    }, [searchParams, setValue])

    function onSubmit(data: VehicleFormData){
        sessionStorage.setItem('quote-vehicle', JSON.stringify(data));
        router.push('/quote/driver');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register('utmSource')} />
            <input type="hidden" {...register('utmMedium')} />
            <input type="hidden" {...register('utmCampaign')} />

            <label htmlFor="vehicleReg">Vehicle registration</label>
            <input
                id="vehicleReg"
                {...register('vehicleReg')}
                aria-invalid={errors.vehicleReg ? 'true' : 'false'}
                aria-describedby={errors.vehicleReg ? 'vehicleReg-error' : undefined}
            />
                {errors.vehicleReg && (
                    <p id="vehicleReg-error" role="alert" style={{ color: 'red' }}>
                        {errors.vehicleReg.message}
                    </p>
                )}

            <button type="submit">Next</button>
        </form>
    );
}

export default function QuotePage(){
    return(
        <Suspense fallback={null}>
            <QuoteFormInner></QuoteFormInner>
        </Suspense>
    );
}