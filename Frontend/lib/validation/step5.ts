import { z } from 'zod';

export const Step5Schema = z.object({
  gigScreenshots: z
    .object({
      dashboard: z.instanceof(File).optional(),
      rating: z.instanceof(File).optional(),
      salary: z.instanceof(File).optional(),
      profile: z.instanceof(File).optional(),
    })
    .refine(
      (obj) => Object.values(obj).some((val) => !!val),
      'At least one gig platform screenshot is required'
    ),

  companyName: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional()
    .or(z.literal('')),

  workingDuration: z
    .enum(['0-3-months', '3-6-months', '6-12-months', '1-2-years', '2-plus-years'])
    .optional()
    .or(z.literal('')),

  vehicleOwnership: z
    .enum(['owned', 'financed', 'rented', 'not-applicable'])
    .optional()
    .or(z.literal('')),

  employmentType: z
    .enum(['full-time', 'part-time', 'occasional'])
    .optional()
    .or(z.literal('')),
});

export type Step5Data = z.infer<typeof Step5Schema>;

