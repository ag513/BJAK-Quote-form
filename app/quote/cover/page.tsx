'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { coverSchema, CoverFormData } from '../schema';
import { useRouter } from 'next/navigation';

export default function coverPage(){
    const router = useRouter();
    const {
            register,
            handleSubmit,
            formState : {errors}
        } = useForm<CoverFormData>({
            resolver: zodResolver(coverSchema),
        });


        function onSubmit(data: CoverFormData){
            const vehicle = JSON.parse(sessionStorage.getItem('quote-vehicle') || '{}');
            const driver = JSON.parse(sessionStorage.getItem('quote-driver') || '{}');
            const fullQuote = {...vehicle, ...driver, ...data};

            console.log('FUll quote with tracking submitted', fullQuote);
            sessionStorage.setItem('full-quote', JSON.stringify(fullQuote))
            sessionStorage.removeItem('quote-vehicle');
            sessionStorage.removeItem('quote-driver');

            router.push('/quote/results');
        }

        return(
              <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="coverType">Cover type</label>
                    <select id="coverType"
                        {...register('coverType')}
                        defaultValue=""
                        aria-invalid={errors.coverType ? 'true' : 'false'}
                        aria-describedby={errors.coverType ? 'coverType-error' : undefined}
                    >
                        <option value="" disabled>Select cover type</option>
                        <option value="third-party">Third Party</option>
                        <option value="comprehensive">Comprehensive</option>
                    </select>
                     {errors.coverType && (
                        <p id="coverType-error" role="alert" style={{ color: 'red' }}>
                        {errors.coverType.message}
                        </p>
                    )}
                    <button type="submit">Submit</button>
                </form>
        );
}