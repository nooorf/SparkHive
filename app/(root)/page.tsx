import SearchForm from "@/components/SearchForm";

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {
  const query = (await searchParams).query;
  //! mark in className to override other styles previously provided to an element
  return (
    <>
    <section className="pink_container">
      <h1 className="heading">Pitch Your Startup, <br/> Connect With Tech Fellows</h1>
      
      <p className="sub-heading !max-w-3xl">Submit Ideas, Get noticed!</p>
      <SearchForm query={query}/>
    </section>
   
    </>
  );
}
