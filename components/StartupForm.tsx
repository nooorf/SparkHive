"use client";

import React, {useState, useActionState} from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import { formSchema } from '@/lib/validation'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { createPitch } from '@/lib/actions'

//useActionState is a hook that updates the state as result of a form submit action
const StartupForm = () => {
    const [error, setError] = useState<Record<string, string>>({})
    const {toast} = useToast();
    const router = useRouter();
    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try{
            const formValues ={
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                Pitch: formData.get("Pitch") as string
            }
            await formSchema.parseAsync(formValues);

            const result = await createPitch(prevState, formData)

            if(result.status === "SUCCESS"){
                toast({
                    title: "Success",
                    description: "Your form has been submitted successfully",
                });
                router.push(`/startup/${result._id}`);
            }
            return result;
        }catch(error){
            if(error instanceof z.ZodError){
                const fieldErrors = error.flatten().fieldErrors;
                setError(fieldErrors as unknown as Record<string, string>);
                toast({
                    title: "Validation Error",
                    description: "Please check your inputs and try again",
                    variant: "destructive"
                });
                return {...prevState, error: "Validation unsuccessful", status: "ERROR"};
            }
            toast({
                title: "An unexpected error occurred",
                description: "Please check your inputs and try again",
                variant: "destructive"
            });
            return {...prevState, error: "An unexpected error occurred", status: "ERROR"};
        }
    };
    const [state, formAction, isPending] = useActionState(handleFormSubmit,{error: "" , status: "Initial"});

  return (
    <form action={formAction} className='startup-form'>
        <div>
            <label htmlFor='title' className='startup-form_label'>Title</label>
            <Input id='title' name='title' className='startup-form_input' required placeholder='Startup Title' />
            {error.title && <p className='startup-form_error'>{error.title}</p>}
        </div>

        <div>
            <label htmlFor='description' className='startup-form_label'>Description</label>
            <Textarea id='description' name='description' className='startup-form_textarea' required placeholder='Startup Category' />
            {error.description && <p className='startup-form_error'>{error.description}</p>}
        </div>

        <div>
            <label htmlFor='category' className='startup-form_label'>Category</label>
            <Input id='category' name='category' className='startup-form_input' required placeholder='Startup Category (Tech, Robotics, Web..)' />
            {error.category && <p className='startup-form_error'>{error.category}</p>}
        </div>

        <div>
            <label htmlFor='link' className='startup-form_label'>Image URL</label>
            <Input id='link' name='link' className='startup-form_input' required placeholder='Startup Image URL' />
            {error.link && <p className='startup-form_error'>{error.link}</p>}
        </div>

        <div>
            <label htmlFor='Pitch' className='startup-form_label'>Startup Pitch</label>
            <Textarea id='Pitch' name='Pitch' className='startup-form_textarea' required placeholder='Startup Pitch' />
            {error.Pitch && <p className='startup-form_error'>{error.Pitch}</p>}
        </div>

       <Button type="submit" className='startup-form_btn text-white' disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit Your Pitch'}
            <Send className='size-6 ml-2' />
       </Button>
    </form>
  )
}

export default StartupForm

