import { defineQuery } from "next-sanity";

//this defines a query just like how we can run in sanity studio vision
export const STARTUPS_QUERY = 
    defineQuery(`*[_type == "startup" && defined(slug.current)] | order(createdAt desc) {
  _id,
    title,
    slug,
    createdAt,
    author->{
      _id, name, image, bio
    },
    views,
    description,
    category,
    image
}`);