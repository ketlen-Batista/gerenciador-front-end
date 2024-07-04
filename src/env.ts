import { z } from 'zod';

const envSquema = z.object({
  VITE_API_URL: z.string().url(),
});

export const env = envSquema.parse(import.meta.env);
