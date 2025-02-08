import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if need real time data. If we refresh a page, add a new post, no matter how many times we refresh, it will not appear before 60s have elapsed because useCdn = true fetches data from cache
  //when set to false, we still have to reload for new posts to show up
})
