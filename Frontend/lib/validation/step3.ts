import { z } from 'zod';

export const Step3Schema = z.object({
  bankStatement: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Bank statement is required')
    .refine(
      (file) => {
        // Only PDF and CSV allowed for bank statements
        const fileName = file.name.toLowerCase();
        const fileType = file.type.toLowerCase();
        const isPdf = fileName.endsWith('.pdf') || fileType === 'application/pdf';
        const isCsv = fileName.endsWith('.csv') || fileType === 'text/csv' || fileType === 'application/vnd.ms-excel';
        return isPdf || isCsv;
      },
      'Only PDF or CSV files are accepted for bank statements. JPG/PNG images are not allowed.'
    )
    .refine((file) => file.size <= 10 * 1024 * 1024, 'File must be less than 10MB'),
});

export type Step3Data = z.infer<typeof Step3Schema>;
