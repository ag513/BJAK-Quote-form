'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { coverSchema, CoverFormData } from '../schema';

export default function coverPage(){
    const {
            register,
            handleSubmit,
            formState : {errors}
        } = useForm<CoverFormData>({
            resolver: zodResolver(coverSchema),
        });


        function onSubmit(data: CoverFormData){
            const vehicle = JSON.parse(sessionStorage.getItem('quote-vehicle') || '{}');
            const driver = JSON.parse(sessionStorage.getItem('quote-driverr') || '{}');
            const fullQuote = {...vehicle, ...driver, ...data};

            console.log('FUll quote submitted', fullQuote);

            sessionStorage.removeItem('quote-vehicle');
            sessionStorage.removeItem('quote-driver');
        }

        return(
              <form onSubmit={handleSubmit(onSubmit)}>
                    <select {...register('coverType')} defaultValue="">
                        <option value="" disabled>Select cover type</option>
                        <option value="third-party">Third Party</option>
                        <option value="comprehensive">Comprehensive</option>
                    </select>
                    {errors.coverType && <p style={{ color: 'red' }}>{errors.coverType.message}</p>}
                    <button type="submit">Submit</button>
                </form>
        );
}