import { z } from 'zod';

export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  is_done: z.boolean(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export type Task = z.infer<typeof taskSchema>;

export const taskCreateSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください').max(255, '255文字以内で入力してください'),
});

export type TaskCreateInput = z.infer<typeof taskCreateSchema>;

export const taskUpdateSchema = z.object({
  title: z
    .string()
    .min(1, 'タイトルを入力してください')
    .max(255, '255文字以内で入力してください')
    .optional(),
  is_done: z.boolean().optional(),
});

export type TaskUpdateInput = z.infer<typeof taskUpdateSchema>;
