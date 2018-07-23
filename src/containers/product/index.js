import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import style from 'styled-components'
import { loadProductStats } from 'redux/actions/app'

import ProductStats from 'components/product-stats'
import { Cell } from 'components/grid'

const Container = style.div`
    border: 1px solid black;
    border-radius: 3px;
    padding: 10px 20px;
    margin: 5px;
`

export class ProductContainer extends React.Component{
    componentWillMount(){
        if ( !this.props.stats.open ){
            this.props.loadProductStats( this.props.id )
        }
    }

    renderStats(){
        return this.props.stats
            ?( <ProductStats stats={ this.props.stats }></ProductStats> )
            :( <div>Loading ...</div> )
    }

    render(){
        return (
            <Cell size="1-2">
                <Container>
                    <div>{this.props.display_name}</div>
                    { this.renderStats() }
                </Container>
            </Cell>
        )
    }
}

ProductContainer.defaultProps = {
    stats: {
        open: null,
        high: null,
        low: null,
        volume: null,
        last: null,
        volume_30day: null
    }
}

ProductContainer.propTypes = {
    id: PropTypes.string.isRequired,
    display_name: PropTypes.string.isRequired,
    stats: PropTypes.shape( {
        open: PropTypes.string,
        high: PropTypes.string,
        low: PropTypes.string,
        volume: PropTypes.string,
        last: PropTypes.string,
        volume_30day: PropTypes.string
    } )
}

export default connect( null, { loadProductStats } )( ProductContainer )