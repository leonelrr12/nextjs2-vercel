
const toggleFavorites = (id: number) => {

    let favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' )

    if( favorites.includes(id)) {
        favorites = favorites.filter( item => item !== id )
    } else {
        favorites.push(id)
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
}

// const existFavorite = (id: number): Boolean => {

//     console.log('BBBBB', id)
//     if(typeof window) return false
    
//     const favorites = JSON.parse( localStorage.getItem('favorites') || '[]' )

//     console.log('AAAAAA', favorites, id)
//     return favorites.includes( id )
// }

const favorites = () => {
    return JSON.parse( localStorage.getItem('favorites') || '[]' )
}


export default {
    toggleFavorites,
    favorites
}