import "server-only"

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token, 
   // Set to false if need real time data. If we refresh a page, add a new post, no matter how many times we refresh, it will not appear before 60s have elapsed because useCdn = true fetches data from cache
  //when set to false, we still have to reload for new posts to show up
})
if(!writeClient.config().token) {
  throw new Error('Token is not set')
}