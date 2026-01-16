import { z } from 'zod';

export const Step2Schema = z.object({
  aadhaar: z
    .string()
    .min(1, 'Aadhaar number is required')
    .refine(
      (val) => /^\d{12}$/.test(val.replace(/\s/g, '')),
      'Aadhaar must be exactly 12 digits'
    )
    .transform((val) => val.replace(/\s/g, '')),

  panCard: z
    .string()
    .min(1, 'PAN card number is required')
    .refine(
      (val) => /^[A-Z]{5}\d{4}[A-Z]{1}$/.test(val.toUpperCase().trim()),
      'PAN format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)'
    )
    .transform((val) => val.toUpperCase().trim().replace(/\s/g, '')),
});

export type Step2FormData = z.infer<typeof Step2Schema>;
export type Step2Data = Step2FormData;
