import React from 'react'
import Ping from './Ping'
import {client} from '@/sanity/lib/client';
import {STARTUP_VIEWS_QUERY} from '@/sanity/lib/query';
import { writeClient } from '@/sanity/lib/write-client';
import {after} from 'next/server';

const View = async ({id}:{id : string}) => {
  function formatNumber(number : number) {
    return number > 1 ? `${number} views` : `${number} view`;
  }
  
  const {views : totalViews} = await client.withConfig({useCdn: false}).fetch(STARTUP_VIEWS_QUERY, {id});

  //we need to run the update view on the background so we can see the rest of the page immediately and not just the skeleton
  //use unstable_after functionality
  after(async () => await writeClient
  .patch(id) //patch is used for updates
  .set({views : totalViews + 1})
  .commit());

  
  return (
    <div className='view-container'>
      <div className='absolute -top-2 -right-2'>
        <Ping/>
      </div>
      <p className='view-text'>
        <span className='font-black'>{formatNumber(totalViews)}</span>
      </p>
    </div>
  )
}

export default View
