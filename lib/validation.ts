import { link } from "fs";
import {z} from "zod";
/*export const formSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters long" }).max(100, { message: "Title must be at most 100 characters long" }),
    description: z.string().min(10, { message: "Description must be at least 10 characters long" }).max(1000, { message: "Description must be at most 1000 characters long" }),
    category: z.string().min(3, { message: "Category must be at least 3 characters long" }).max(20, { message: "Category must be at most 20 characters long" }),
    link: z.string().url({ message: "Invalid URL" }).refine(async (url)=>{
        try{
            const res = await fetch(url, {method: "HEAD"});
            const contentType = res.headers.get("content-type");
            return contentType?.startsWith("image/")
        }
        catch{
            return false;
        }
    }),
    Pitch: z.string().min(10, { message: "Pitch must be at least 10 characters long" })
})*/
export const formSchema = z.object({
    title: z.string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(100, { message: "Title must be at most 100 characters long" }),
    
    description: z.string()
        .min(10, { message: "Description must be at least 10 characters long" })
        .max(1000, { message: "Description must be at most 1000 characters long" }),
    
    category: z.string()
        .min(3, { message: "Category must be at least 3 characters long" })
        .max(20, { message: "Category must be at most 20 characters long" }),
    
    link: z.string()
        .url({ message: "Invalid URL" })
        .refine(url => /\.(jpeg|jpg|png|gif|webp)$/i.test(url), { 
            message: "URL must point to an image file (jpg, png, gif, webp)"
        }),
    
    Pitch: z.string()
        .min(10, { message: "Pitch must be at least 10 characters long" })
});