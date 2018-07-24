import { PRODUCTS_RECEIVED, PRODUCTSTATS_RECEIVED } from 'redux/actions/appActionTypes'

export const initialState = {
    products: [],
    loaded: null
}

export default function reducer( state=initialState, action ){
    switch ( action.type ){
        case PRODUCTS_RECEIVED:
            return { ...state, products: action.products, loaded: action.loaded }

        case PRODUCTSTATS_RECEIVED: {
            const products = state.products.map( product => {
                if ( product.id == action.id ){
                    return { ...product, stats: action.stats }
                }
                return product
            } )
            return { ...state, products: products }
        }
    }
    return state
}

