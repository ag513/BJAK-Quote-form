import { z } from 'zod';

export const vehicleSchema = z.object({
    vehicleReg: z.string().min(1, 'Vehicle Reg is Required'),
})

export type VehicleFormData =  z.infer<typeof vehicleSchema>;