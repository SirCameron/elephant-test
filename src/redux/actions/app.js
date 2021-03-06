import { PRODUCTS_RECEIVED, PRODUCTSTATS_RECEIVED } from './appActionTypes'
import { getProducts, getProductStats } from 'util/api'

export function productsReceived( products, status ){
    return {
        type: PRODUCTS_RECEIVED,
        products: products,
        loaded: status
    }
}

export function productStatsReceived( id, productStats ){
    return {
        type: PRODUCTSTATS_RECEIVED,
        id: id,
        stats: productStats
    }
}

export function loadProductStats( id ){
    return dispatch => {
        return getProductStats( id )
            .then( 
                stats => { 
                    dispatch( productStatsReceived( id, stats ) ) 
                },
                () => { 
                    loadProductStats( id )( dispatch ) 
                }
            )
    }
}

export function loadProducts(){
    return dispatch => {
        return getProducts()
            .then( 
                products => { 
                    dispatch( productsReceived( products, true ) ) 
                },
                () => { 
                    dispatch( productsReceived( [], false ) ) 
                }
            )
    }
}