import React from 'react'
import { render } from 'react-dom'

import {Dispatcher, provide} from 'kalima'
import {root} from 'baobab-react/higher-order'

import * as actions from './actions/index'
import App from './components/App'

import state from './state'

const dispatcher = new Dispatcher({state})

dispatcher.route(actions)

const Root = provide(dispatcher, root(state, App))

render(
  <Root />,
  document.getElementById('root')
)
