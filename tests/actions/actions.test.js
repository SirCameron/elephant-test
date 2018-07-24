import { expect } from 'chai'
import sinon from 'sinon'
import axios from 'axios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import appReducuer, { initialState } from '../../src/redux/reducers/app.js'
import { loadProducts, loadProductStats, productsReceived, productStatsReceived } from '../../src/redux/actions/app.js'
import { PRODUCTS_RECEIVED, PRODUCTSTATS_RECEIVED } from '../../src/redux/actions/appActionTypes.js'

const mockStore = configureMockStore( [thunk] )

describe( 'test action dispatch, state, reducers', ()=>{
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
} )


describe( 'test async actions', ()=>{

    let sandbox
    let server
    let store
    const testProductId = 'BTC-EUR'
    const testProducts = [{ id: testProductId }]
    const testProductStats = [{ volume: '100', bid: '1000' }]

    beforeEach( () => {
        sandbox = sinon.createSandbox()
        server = sandbox.useFakeServer()
        store = mockStore( initialState )
    } )

    afterEach( () => {
        server.restore()
        sandbox.restore()
    } )

    it( 'should load products and fire correct action', () => {
        const resolved = new Promise( ( r ) => r( { data: testProducts } ) )
        sandbox.stub( axios, 'get' ).returns( resolved )

        loadProducts()( store.dispatch )
            .then( ()=>{
                expect( store.getActions()[ 0 ].type ).to.equal( PRODUCTS_RECEIVED )
                expect( store.getActions()[ 0 ].loaded ).to.equal( true )
                expect( store.getActions()[ 0 ].products ).to.deep.equal( testProducts )
            } )
    } )

    it( 'should load product stats into correct product', () => {
        const resolved = new Promise( ( r ) => r( { data: testProductStats } ) )
        sandbox.stub( axios, 'get' ).returns( resolved )

        loadProductStats( testProductId )( store.dispatch )
            .then( ()=>{
                expect( store.getActions()[ 0 ].type ).to.equal( PRODUCTSTATS_RECEIVED )
                expect( store.getActions()[ 0 ].id ).to.equal( testProductId )
                expect( store.getActions()[ 0 ].stats ).to.deep.equal( testProductStats )
            } )
    } )
} )