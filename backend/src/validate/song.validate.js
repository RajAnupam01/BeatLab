import { z } from "zod"

export const createSongSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    singer: z.string().min(1),
    album: z.string().min(1),
})