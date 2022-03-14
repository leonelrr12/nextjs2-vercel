import { Card, Grid, Row, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { SmallResult } from '../../interfaces'

interface Props {
    pokemon: SmallResult
}

export const PokemonCard:FC<Props> = ({ pokemon }) => {

    const { id, name, img } = pokemon 

    const router = useRouter()

    const onClick = () => {
        router.push(`/pokemon/${id}`)
    }

    return (
        <Grid xs={ 6 } sm={ 3 } md={ 2 } xl={ 1 }>
            <Card 
                hoverable 
                clickable
                onClick={onClick}
            >
                <Card.Body css={{ p: 1 }}>
                    <Card.Image 
                        src={ img }
                        width="100%"
                        height={ 140 }
                    />
                </Card.Body>
                <Card.Footer>
                    <Row justify='space-between'>
                        <Text transform='capitalize'>{name}</Text>
                        <Text>#{id}</Text>
                    </Row>
                </Card.Footer>
            </Card>
        </Grid>
    )
}
