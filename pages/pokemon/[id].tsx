import { useState, useEffect } from 'react';

import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import confetti from 'canvas-confetti'

import { Layout } from "../../components/layouts"
import { Pokemon } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";


interface Props {
    pokemon: Pokemon;
}


const PokemonPage: NextPage<Props> = ({ pokemon }) => {

    const [inFavorites, setInFavorites] = useState<Boolean>(false)

    const onToggleFavorites = () => {
        localFavorites.toggleFavorites(pokemon.id)
        setInFavorites(!inFavorites)

        if(!inFavorites) return

        confetti({
            zIndex: 999,
            particleCount: 200,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0,
            }
        })
    }

    useEffect(() => {
        const favorites = JSON.parse( localStorage.getItem('favorites') || '[]' )
        setInFavorites(favorites.includes( pokemon.id ))
    }, [])
    

    return (
        <Layout title={ pokemon.name }>
            <Grid.Container css={{ marginTop: '5px' }}>
                <Grid xs={ 12 } sm={ 4 }>
                    <Card hoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image 
                                src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                                alt={ pokemon.name }
                                width="100%"
                                height={ 200 }
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={ 12 } sm={ 8 }>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform="capitalize">{ pokemon.name }</Text>

                            <Button
                                color="gradient"
                                ghost={ !inFavorites }
                                onClick={onToggleFavorites}
                            >
                                { inFavorites ? 'Quitar de favoritos':  'Guardar en favoritos' }                            </Button>
                        </Card.Header>

                        <Card.Body>
                            <Text h2>Sprits:</Text>

                            <Container direction="row" display="flex" gap={ 0 }>
                                <Image 
                                    src={ pokemon.sprites.front_default }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                                <Image 
                                    src={ pokemon.sprites.back_default }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                                <Image 
                                    src={ pokemon.sprites.front_shiny }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                                <Image 
                                    src={ pokemon.sprites.back_shiny }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                            </Container>
                        </Card.Body>         
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const pokemons151 = [...Array(151)].map( (value, index) => `${ index + 1 }`)

    return {
        paths: pokemons151.map( id => ({
            params: { id }
        })),
        // fallback: false
        fallback: 'blocking'
    }
}

// export const getStaticProps: GetStaticProps = async (ctx) => {
export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { id } = params as { id: string }
    const pokemon = await getPokemonInfo(id)

    if(!pokemon) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }


    return {
        props: {
            pokemon
        },
        revalidate: 86400,  // en segundos.  Para un dia 60 * 60 * 24 = 86400
    }
  }


export default PokemonPage