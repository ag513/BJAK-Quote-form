import { z } from 'zod';

export const vehicleSchema = z.object({
    vehicleReg: z.string().min(1, 'Vehicle Reg is Required'),
})

export const driverSchema = z.object({
    driverName: z.string().min(1, 'driver name is required'),
    driverAge: z.coerce.number({ error: "Age must be a number"}).min(17, 'Driver must be 17 or ilder'),
})

export const coverSchema = z.object({
    coverType: z.string().min(1, 'Please select a cover type'),
});

export type CoverFormData = z.infer<typeof coverSchema>;
export type DriverFormData = z.input<typeof driverSchema>;
export type VehicleFormData =  z.infer<typeof vehicleSchema>;