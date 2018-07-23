import { PRODUCTS_RECEIVED, PRODUCTSTATS_RECEIVED } from './appActionTypes'
import { getProducts, getProductStats } from 'util/api'

function productsReceived( products, status ){
    return {
        type: PRODUCTS_RECEIVED,
        products: products,
        loaded: status
    }
}

function productStatsReceived( id, productStats ){
    return {
        type: PRODUCTSTATS_RECEIVED,
        id: id,
        stats: productStats
    }
}

export function loadProductStats( id ){
    return dispatch => {
        getProductStats( id )
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
        getProducts()
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