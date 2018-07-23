import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppContainer from 'containers/app'
import { injectGlobal } from 'styled-components'
import store from 'redux/store'

injectGlobal`
    html {
        height: 100%;
    }
    body {
        padding: 0;
        margin: 0;
        height: 100%;
        background-color: white;
    }
`

ReactDOM.render( (
    <Provider store={ store }>
        <AppContainer></AppContainer>
    </Provider>
), document.getElementById( 'root' ) )
