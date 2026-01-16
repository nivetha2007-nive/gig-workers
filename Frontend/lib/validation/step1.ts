import { z } from 'zod';

export const Step1Schema = z.object({
  fullName: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
    .optional()
    .or(z.literal('')),

  phoneNumber: z
    .string()
    .optional()
    .transform((val) => val ? val.replace(/\s|-/g, '') : '') // Remove spaces and dashes
    .refine((val) => !val || /^[6-9]\d{9}$/.test(val), 'Invalid Indian phone number (must start with 6-9 and be 10 digits)'),

  dateOfBirth: z
    .string()
    .optional()
    .refine((date) => {
      if (!date) return true; // Optional field
      const birthDate = new Date(date);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18;
    }, 'You must be at least 18 years old'),

  currentAddress: z
    .string()
    .optional(),

  permanentAddress: z
    .string()
    .optional(),

  workerType: z.enum(['gig_worker', 'self_employed', 'freelancer', 'micro_entrepreneur']).optional(),
});

export type Step1FormData = z.infer<typeof Step1Schema>;
export type Step1Data = Step1FormData;
