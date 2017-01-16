import React from 'react'
import { connect } from 'kalima'
import { branch } from 'baobab-react/higher-order'
import Link from '../components/Link'

let FilterLink = ({children, filter, activeFilter, setVisibilityFilter}) => {
  return(
    <Link active={filter === activeFilter}
          onClick={() => setVisibilityFilter(filter)} >
      {children}
    </Link>
  )
}

FilterLink = branch({ activeFilter: ['filter'] }, connect(FilterLink))

export default FilterLink
