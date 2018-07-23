import axios from 'axios'
import config from 'config'

function get( url ){
    return axios.get( url )
        .then( response=>{
            if ( response.data ){
                return response.data
            }
        } )
}

export function getProducts(){
    return get( `${ config.api.host }${ config.api.endpoints.getProducts }` )
        .then( result=>{ 
            return result
        } )
}

export function getProductStats( id ){
    return get( `${ config.api.host }${ config.api.endpoints.getProductStats.replace( ':id', id ) }` )
        .then( result=>{ 
            return result
        } )
}
