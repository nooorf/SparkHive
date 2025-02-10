import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/query'
import React from 'react'
import {client} from "@/sanity/lib/client"
import StartupCard from './StartupCard'
import { StartupCardType } from './StartupCard'

const UserStartups = async ({id} : {id : string}) => {
    const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, {id})
  return (
    <>
    {startups.length > 0 ? startups.map((startup: StartupCardType) => <StartupCard key={startup._id} post={startup}/>) : <p className='no-result'>No posts created yet</p>}
    </>
  )
}

export default UserStartups
