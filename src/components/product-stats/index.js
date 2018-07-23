import React from 'react'
import style from 'styled-components'
import { Row, Cell } from 'components/grid'

const Shimmer = style.div`
    height: 15px;
    background-color: grey;
`

const ProductStats = function( { stats } ){
    return (
        <div>
            { ( ()=>{
                return Object.keys( stats ).map( key => {
                    return (
                        <Row key={ key }>
                            <Cell size="1-2">{ key }: </Cell>
                            <Cell size="1-2">{ stats[ key ]?stats[ key ]:( <Shimmer/> ) }</Cell>
                        </Row>
                    )
                } )
            } )()}
        </div>
    )
}

export default ProductStats