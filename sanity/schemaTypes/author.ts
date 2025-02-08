import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const author = defineType({
    name: "author",
    title: "Author",
    type: "document",   
    icon: UserIcon,
    fields: [
        defineField({
            name: "id",
            type: "number",
            validation: (Rule) => Rule.required().error("ID is required"),
        }),
        defineField({
            name: "name",
            type: "string",
            validation: (Rule) => Rule.required().error("Name is required"),
        }),
        defineField({
            name: "username",
            type: "string",
            validation: (Rule) => Rule.required().error("Username is required"),
        }),
        defineField({
            name: "email",
            type: "string",
            validation: (Rule) => Rule.required().error("Email is required"),
        }),
        defineField({
            name: "image",
            type: "url",
            validation: (Rule) => Rule.required().error("Image is required"),
        }),
        defineField({
            name: "bio",
            type: "text",
            validation: (Rule) => Rule.required().error("Bio is required"),
        }),
       
    ],
    preview: {
        select: {
            title: "name" //allows to select author by name for preview
        },
    },
})

