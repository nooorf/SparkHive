//startup/[id] : this is a dynamic page for startups
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/query';
import React, { Suspense } from 'react'
import { client } from '@/sanity/lib/client';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import {Skeleton} from '@/components/ui/skeleton';
import  View  from '@/components/View';
import StartupCard, { StartupCardType } from '@/components/StartupCard';


const page = async ({params}: {params: Promise<{id: string}>}) => {
    const id = (await params).id;

    const post = await client.fetch(STARTUP_BY_ID_QUERY, {id});

    const {select: editorPosts} = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug: 'editor-picks'}) /*check this*/
    console.log(editorPosts.length)
    if (!post) {
        return {
            notFound: true, //from next navigation
        }
    }

  return (
    <>
      <section className='pink_container !min-h-[230px]'>
        <p className='tag'>{formatDate(post?.createdAt) || formatDate(new Date)}</p>
        <h1 className='heading'>{post.title}</h1>
        <p className='sub-heading !max-w-5xl'>{post.description}</p>
      </section>
      <section className='section_container'>
        <img src={post.image} alt={post.title} className='w-full h-auto rounded-xl' />
      <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
        <div className='flex-between gap-5'>
          <Link href={`/user${post.author?._id}`} className='flex gap-2 items-center mb-3'>
            <Image src={post.author?.image} alt="avatar" width={64} height={64} className='rounded-full drop-shadow-lg' />
            <div>
              <p className='text-20-medium'>
                {post.author.name}
              </p>
              <p className='text-16-medium !text-black-300'>
                @{post.author.username}
              </p>
            </div>
          </Link>
          <p className='category-tag'>
            {post.category}
          </p>
        </div>
        <h3 className='text-30-bold'>Pitch Details</h3>
        <article className='prose max-w-4xl font-work-sans break-all'>{post.Pitch}</article>
      </div>
      <hr className='divider'/>

      {editorPosts?.length > 0 && (
        <div className='max-w-4xl mx-auto'>
          <p className='text-30-semibold'>Editor Picks</p>

          <ul className='mt-7 card_grid-sm'>
            {editorPosts.map((post: StartupCardType, i: number) => (
              <StartupCard key={i} post={post}/>
            ))}
          </ul>
        </div>
      )}

      <Suspense fallback={<Skeleton className='view_skeleton'/>}> {/*from nextjs for dynamically rendered content; everything above this is static*/}
          <View id={id}/>
      </Suspense>
      </section>
    </>
  )
}

export default page
