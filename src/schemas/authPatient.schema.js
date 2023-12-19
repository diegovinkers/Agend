import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "invalid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characteres",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is not valid",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(4, {
      message: "Password must be at least 4 characters",
    }),
});

export const initialSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "invalid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characteres",
    }),
  name: z.string({
    required_error: "Name is required",
  }),
  specialty: z
    .string({
      required_error: "Speciality is required",
    }),
  schedule: z
    .string({
      required_error: "Schedule is required",
    }),
  clinics: z.array({
    items: z.object({
      name: z.string({ required_error: "Name is required" }),
      email: z.string({ required_error: "Email is required" }),
      address: z.string({ required_error: "Address is required" }),
    }),
    minItems: 1,
  }),
});
