import Link from "next/link";
import type { NextPage } from "next";
import { Counter } from "~/components/ui/Counter";
import { useGetPokemonByNameQuery } from "~/services/sample";
import Image from "next/image";

const About: NextPage = () => {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  if (error) {
    return <div>Oh no, there was an error</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Counter />
      <Link href="/">
        <a>to main page</a>
      </Link>
      {data && (
        <>
          <h3>{data.species.name}</h3>
          <Image
            src={data.sprites.front_shiny}
            alt={data.species.name}
            width={100}
            height={100}
          />
        </>
      )}
    </div>
  );
};
export default About;
