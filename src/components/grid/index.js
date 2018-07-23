import style from 'styled-components'

export const Row = style.div`
    ${ ( props )=>{
        return props.width
            ? `width: ${ props.width }px; margin: 0 auto;`
            : 'width 100%;'
    } }
    &:after {
        content: "";
        display: table;
        clear: both;
    }
`

export const Cell = style.div`
    ${ ( props )=>{
        let size = '100%'
        if ( props.size ){
            props.size = props.size.split( '-' )
            size = 100/parseFloat( props.size[ 1 ] ) * parseFloat( props.size[ 0 ] )
            size = `${ size.toString() }%`
        }
        if ( size ){
            return `width: ${ size };`
        }
    } }
    text-align: ${ ( props )=>{
        if ( props.right ){
            return 'right'
        }
        else if ( props.center ){
            return 'center'
        }
        else{
            return 'left'
        }
    } };
    float: left;
    min-height: 1px;
    box-sizing: border-box;
`

