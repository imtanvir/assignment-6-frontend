import { z } from "zod";

const contactValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email!"),
  message: z
    .string()
    .trim()
    .max(500, "Message must be less than 500 characters"),
});

export default contactValidationSchema;
