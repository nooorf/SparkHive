import React from 'react'
import Ping from './Ping'
import {client} from '@/sanity/lib/client';
import {STARTUP_VIEWS_QUERY} from '@/sanity/lib/query';

const View = async ({id}:{id : string}) => {
  function formatNumber(number : number) {
    return number > 1 ? `${number} views` : `${number} view`;
  }
  //Update number of views whenever somebody sees this page
  const {views : totalViews} = await client.withConfig({useCdn: false}).fetch(STARTUP_VIEWS_QUERY, {id});
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
