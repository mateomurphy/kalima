import { connect } from 'kalima'
import { branch } from 'baobab-react/higher-order'
import TodoList from '../components/TodoList'

const VisibleTodoList = branch({ todos: ['visibleTodos'] }, connect(TodoList))

export default VisibleTodoList
