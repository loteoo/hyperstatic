const uuid = () => Math.random().toString(36).substring(7)

export const InitAction = (state) => ({
  ...state,
  todoInput: '',
  todos: []
})

export const SetInput = (state, value) => ({
  ...state,
  todoInput: value
})


export const AddItem = (state, ev) => {
  ev.preventDefault()
  return {
    ...state,
    todoInput: '',
    todos: state.todos.concat({
      id: uuid(),
      value: state.todoInput,
      done: false,
      editing: false
    })
  }
}

export const UpdateItem = (state, id, ev) => ({
  ...state,
  todos: state.todos.map(item =>
    id === item.id
      ? ({...item, value: ev.target.value})
      : item
  )
})

export const ToggleItem = (state, id) => ({
  ...state,
  todos: state.todos.map(item =>
    id === item.id
      ? ({...item, done: !item.done})
      : item
  )
})

export const ToggleItemEditing = (state, id, ev) => {
  ev.preventDefault()
  return {
    ...state,
    todos: state.todos.map(item =>
      id === item.id
        ? ({...item, editing: !item.editing})
        : ({...item, editing: false})
    )
  }
}

export const DeleteItem = (state, id) => ({
  ...state,
  todos: state.todos.filter(item => id !== item.id)
})

export const ClearCheckedItems = (state) => ({
  ...state,
  todos: state.todos.filter(item => !item.done)
})

