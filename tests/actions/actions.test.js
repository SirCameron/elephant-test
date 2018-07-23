import { expect } from 'chai'

import appReducuer from '../../src/redux/reducers/app.js'
import { productsReceived, productStatsReceived } from '../../src/redux/actions/app.js'

it( 'productsReceived state is good', () => {
    const products = [
        {
            id: '1',
            'display_name': 'BTC/EUR'
        }
    ]

    const state = appReducuer( {}, productsReceived( products, true ) )
    expect( state.loaded ).to.equal( true )
    expect( state.products ).to.have.length( 1 )
} )

it( 'productStatsReceived state is good', () => {
    const products = [
        {
            id: '1',
            'display_name': 'BTC/EUR'
        },
        {
            id: '400',
            'display_name': 'BTC/USD'
        }
    ]

    const productStats = {
        bid: '100',
        'volume': '20'
    }

    let state = appReducuer( {}, productsReceived( products, true ) )
    state = appReducuer( state, productStatsReceived( '400', productStats ) )
    expect( state.loaded ).to.equal( true )
    expect( state.products ).to.have.length( 2 )
    expect( typeof state.products[ 1 ].stats ).to.equal( 'object' )
    expect( state.products[ 1 ].stats.bid ).to.equal( '100' )
    expect( state.products[ 1 ].stats.volume ).to.equal( '20' )
} )
