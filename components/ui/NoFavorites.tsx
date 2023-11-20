import { Container,Text,Image } from '@nextui-org/react'
import React from 'react'

export const NoFavorites = () => {
  return (
    <Container css={{
        display:'flex',
        flexDirection:'column',
        height:'calc(100vh - 100px',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        border:'10px solid',
        borderColor:'#fff'
    }}>
        <Text h1>
            No hay favoritoss
        </Text>
        <Image
        css={{
            opacity:'0.2'
        }}
        src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg'
        width={400}
        height={300}
        />
    </Container>
  )
}
