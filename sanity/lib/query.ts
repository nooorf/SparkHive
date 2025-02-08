import { defineQuery } from "next-sanity";

//this defines a query just like how we can run in sanity studio vision
export const STARTUPS_QUERY = 
    defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || category match $search || author -> name match $search || title match $search] | order(createdAt desc) {
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

export const STARTUP_BY_ID_QUERY =
      defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id,
    title,
    slug,
    createdAt,
    author -> {
      _id, name, username, image, bio
    },
    views,
    description,
    category,
    image,
    Pitch
}`)