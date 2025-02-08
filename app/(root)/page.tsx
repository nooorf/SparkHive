
import SearchForm from "@/components/SearchForm";
import StartupCard, {StartupCardType} from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/query";


export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {
  const query = (await searchParams).query;
  const params = {search : query || null};
  const posts = await client.fetch<StartupCardType[]>(STARTUPS_QUERY, params); 

  //! mark in className to override other styles previously provided to an element
  return (
    <>
    <section className="pink_container">
      <h1 className="heading">Pitch Your Startup, <br/> Connect With Tech Fellows</h1>
      
      <p className="sub-heading !max-w-3xl">Submit Ideas, Get noticed!</p>
      <SearchForm query={query}/>
    </section>
    <section className="section_container">
      <p>
      {query ? `Search results for ${query}` : 'All Startups'}
      </p>
      <ul className="mt-7 card_grid">
        {posts?.length > 0 ? posts.map((post: StartupCardType) => (
          <StartupCard key={post?._id} post={post}/>
        )):(
          <p className="no-results">No startups found</p>
        )}
      </ul>
    </section>
    </>
  );
}
