import { z } from 'zod';

export const Step4Schema = z.object({
  utilityBills: z
    .array(z.instanceof(File))
    .min(3, 'At least 3 utility bills are required (minimum requirement)')
    .max(6, 'Maximum 6 utility bills allowed')
    .refine(
      (files) => files.every((f) => {
        // Only PDF allowed for utility bills
        const fileName = f.name.toLowerCase();
        const fileType = f.type.toLowerCase();
        return fileName.endsWith('.pdf') || fileType === 'application/pdf';
      }),
      'Only PDF files are accepted for utility bills. JPG/PNG images are not allowed.'
    )
    .refine(
      (files) => files.every((f) => f.size <= 5 * 1024 * 1024),
      'Each file must be less than 5MB'
    ),

  billTypes: z
    .array(z.enum(['electricity', 'water', 'gas', 'mobile', 'dth', 'broadband']))
    .min(3, 'Select at least 3 bill types (minimum requirement)'),
});

export type Step4Data = z.infer<typeof Step4Schema>;

