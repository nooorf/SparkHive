//startup/[id] : this is a dynamic page for startups
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/query';
import React from 'react'
import { client } from '@/sanity/lib/client';

const page = async ({params}: {params: Promise<{id: string}>}) => {
    const id = (await params).id;

    const post = await client.fetch(STARTUP_BY_ID_QUERY, {id});

    console.log(post);

    if (!post) {
        return {
            notFound: true, //from next navigation
        }
    }

  return (
    <div>
      <h1 className='text-3xl'>{post.title}</h1>
    </div>
  )
}

export default page
