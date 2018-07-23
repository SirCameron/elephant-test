import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import style from 'styled-components'
import { Row } from 'components/grid'
import { loadProducts } from 'redux/actions/app'

import ProductContainer from 'containers/product'

const Container = style.div`
    width: 600px;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
`

const Loading = style.div`
    text-align: center;
    font-size: 30px;
`

export class AppContainer extends React.Component{
    componentWillMount(){
        this.props.loadProducts()
    }

    renderItems(){
        return this.props.products.map( ( product ) => {
            return ( <ProductContainer key={ product.id } { ... product } /> )
        } )
    }

    renderResponse(){
        switch ( this.props.loaded ){
            case null:
                return ( <Loading>Loading...</Loading> )
            case false:
                return ( <Loading>Error</Loading> )
            default:
                return ( <Row>{ this.renderItems() }</Row> )
        }
    }

    render(){
        return (
            <Container>
                <Helmet>
                    <title>Simple Coinbase Instrument Stats</title>
                </Helmet>
                { this.renderResponse() }
            </Container>
        )
    }
}

AppContainer.defaultProps = {
    products: [],
    loaded: null
}

AppContainer.propTypes = {
    products: PropTypes.array.isRequired,
    loaded: PropTypes.bool
}

function mapStateToProps( state ){
    return {
        products: state.app.products,
        loaded: state.app.loaded
    }
}

export default connect( mapStateToProps, { loadProducts } )( AppContainer )