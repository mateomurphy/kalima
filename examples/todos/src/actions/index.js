let nextId = 1

export const addTodo = ({state}, text) => {
  state.push('todos', {
    id: nextId,
    text: text,
    completed: false
  })

  nextId += 1
}

export const setVisibilityFilter = ({state}, filter) => {
  state.set('filter', filter)
}

export const toggleTodo = ({state}, id) => {
  let toggle = (val) => { return !val }

  state.apply(['todos', { id: id }, 'completed'], toggle)
}
