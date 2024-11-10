import { z } from "zod";

const registerSchema = z.object({
  email: z.string().trim().email("Please enter a valid email!"),
  password: z.string().trim().min(6, "Password must be at least 6 character"),
  address: z.string().trim(),
  name: z.string().trim(),
  phone: z.string().trim(),
});

export default registerSchema;
