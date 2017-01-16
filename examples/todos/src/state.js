import Baobab, { monkey } from 'baobab'

const visibleTodos = monkey(
  ['todos'],
  ['filter'],
  (todos, filter) => {
    switch (filter) {
      case 'SHOW_ALL':
        return todos
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed)
      default:
        throw new Error('Unknown filter: ' + filter)
    }
  }
)

const state = new Baobab({
  todos: [],
  filter: 'SHOW_ALL',
  visibleTodos
}, {
  asynchronous: false
})

export default state
