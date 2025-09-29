import { z } from 'zod';

const createEmployeeSchema = z.object({
    first_name: z
        .string()
        .min(3, 'Le prénom doit contenir au moins 3 caractères')
        .trim(),
    last_name: z
        .string()
        .min(3, 'Le nom doit contenir au moins 3 caractères')
        .trim(),
    role: z.enum(['EMPLOYEE']),
});

const createAdminSchema = z
    .object({
        first_name: z
            .string()
            .min(3, 'Le prénom doit contenir au moins 3 caractères')
            .trim(),
        last_name: z
            .string()
            .min(3, 'Le nom doit contenir au moins 3 caractères')
            .trim(),
        password: z
            .string()
            .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
                {
                    message:
                        'Ton mot de passe doit contenir au moins 8 caractères, un caractère majuscule, un caractère minuscule, un chiffre et un caractère spécial(#?!@$%^&*-)',
                }
            ),
        confirm_password: z
            .string()
            .min(8, {
                message: 'Le mot de passe doit contenir au moins 8 caractères',
            })
            .max(20, {
                message:
                    'Le mot de passe doit contenir au maximum 20 caractères',
            })
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
                {
                    message:
                        'Ton mot de passe doit contenir au moins 8 caractères, un caractère majuscule, un caractère minuscule, un chiffre et un caractère spécial(#?!@$%^&*-)',
                }
            ),

        role: z.enum(['ADMIN']),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: 'Les mots de passe ne correspondent pas',
        path: ['confirm_password'],
    });

export const userResponseSchema = z.object({
    id: z.nanoid(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.email(),
    role: z.enum(['ADMIN', 'EMPLOYEE']),
    temporary_password: z.boolean(),
});

const loginSchema = z.object({
    email: z.email().trim().toLowerCase(),
    password: z
        .string({
            error: 'Le mot de passe est requis',
        })
        .trim()
        .min(8, {
            message: 'Le mot de passe doit contenir au moins 8 caractères',
        })
        .max(20, {
            message: 'Le mot de passe doit contenir au maximum 20 caractères',
        }),
});

const updatePasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, {
                message: 'Le mot de passe doit contenir au moins 8 caractères',
            })
            .max(20, {
                message:
                    'Le mot de passe doit contenir au maximum 20 caractères',
            })
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
                {
                    message:
                        'Ton mot de passe doit contenir au moins 8 caractères, un caractère majuscule, un caractère minuscule, un chiffre et un caractère spécial(#?!@$%^&*-)',
                }
            ),

        confirm_password: z
            .string()
            .min(8, {
                message: 'Le mot de passe doit contenir au moins 8 caractères',
            })
            .max(20, {
                message:
                    'Le mot de passe doit contenir au maximum 20 caractères',
            })
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
                {
                    message:
                        'Ton mot de passe doit contenir au moins 8 caractères, un caractère majuscule, un caractère minuscule, un chiffre et un caractère spécial(#?!@$%^&*-)',
                }
            ),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: 'Les mots de passe ne correspondent pas',
        path: ['confirm_password'],
    });

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
export type CreateAdminInput = z.infer<typeof createAdminSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
