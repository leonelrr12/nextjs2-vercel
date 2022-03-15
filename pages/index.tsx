import type { NextPage, GetStaticProps } from 'next'
import { Grid } from '@nextui-org/react'
import { pokeApi } from '../api'
import { Layout } from '../components/layouts'
import { PokemonListStruct, SmallResult } from '../interfaces'
import { PokemonCard } from '../components/pokemon'


interface Props {
  pokemons: SmallResult[]
}

const Home: NextPage<Props> = ({ pokemons }) => {

  return (
    <Layout title={'Listado de Pokemons'}>
      <Grid.Container gap={ 2 } justify='flex-start'>
        {
          pokemons.map( pokemon => (
            <PokemonCard 
              key={ pokemon.id }
              pokemon={ pokemon }
            />
          ))
        }
      </Grid.Container>
    </Layout>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {

  const imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/'
  const { data } = await pokeApi.get<PokemonListStruct>('/pokemon/?limit=151')
  const pokemons: SmallResult[] = data.results.map( p => ({
      id: p.url.split('/')[6],
      name: p.name,
      img: imgUrl+p.url.split('/')[6]+'.svg',
      url: p.url
    })
  )

  return {
    props: {
      pokemons
    }
  }
}


export default Home