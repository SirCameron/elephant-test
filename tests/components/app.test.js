import React from 'react'
import { shallow , configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { expect } from 'chai'
import sinon from 'sinon'
configure( { adapter: new Adapter() } )

import { AppContainer } from '../../src/containers/app/index.js'
import { ProductContainer } from '../../src/containers/product/index.js'
import ProductStats from '../../src/components/product-stats/index.js'


it( 'App renders initial', () => {
    const loadProducts = sinon.fake()
    const component = shallow( <AppContainer loadProducts={ loadProducts }/> )
    expect( component.exists() ).to.equal( true )

    expect( component.html().indexOf( 'Loading...' ) ).to.be.above( 0 )
    expect( loadProducts.calledOnce ).to.equal( true )
} )


it( 'Product renders with no stats', () => {
    const loadProductStats = sinon.fake()
    
    const component = shallow( <ProductContainer loadProductStats={ loadProductStats } id={ 'BTC' } display_name={ 'BTC/EUR' }/> )
    expect( component.exists() ).to.equal( true )

    expect( loadProductStats.calledOnce ).to.equal( true ) 
    expect( component.html().indexOf( 'BTC/EUR' ) ).to.be.above( 0 )
} )


it( 'Product renders with stats', () => {
    const loadProductStats = sinon.fake()
    const stats = {
        open: '234',
        high: '23324',
        low: '234234',
        volume: '453',
        last: '3424',
        volume_30day: 'some volume'
    }

    const component = shallow( <ProductContainer loadProductStats={ loadProductStats } id={ 'BTC' } display_name={ 'BTC/EUR' } stats={ stats }/> )
    expect( component.exists() ).to.equal( true )

    expect( loadProductStats.called ).to.equal( false ) 
    expect( component.html().indexOf( 'BTC/EUR' ) ).to.be.above( 0 )
    expect( component.html().indexOf( 'some volume' ) ).to.be.above( 0 )
} )


it( 'Stats renders', () => {
    const stats = {
        open: '234',
        high: '23324',
        low: '234234',
        volume: '453',
        last: '3424',
        volume_30day: 'some volume'
    }

    const component = shallow( <ProductStats stats={ stats }/> )
    expect( component.exists() ).to.equal( true )
    expect( component.children() ).to.have.length( 6 )
} )