
// Import icon components
import { Close, Circle, CheckedCircle, Plus, Check } from '../../components/icons'

// Import actions
import { InitAction, SetInput, AddItem, UpdateItem, ToggleItem, DeleteItem, ToggleItemEditing, ClearCheckedItems } from './actions'

export const Init = InitAction

const targetValue = event => event.target.value

export default (state) => (
  <div>
    <h2>Todo list</h2>
    <p>A little more complex than a counter</p>
    <div class="todo-list">
      <form class="new-item-form" onsubmit={AddItem} method="post">
        <input type="text" placeholder="Type something here..." value={state.todoInput} oninput={[SetInput, targetValue]} required />
        <button type="submit"><Plus /></button>
      </form>
      <h4>{state.todos.length} items</h4>
      <ul class="list">
        {state.todos.map(item => <Item {...item} />)}
      </ul>
    </div>
    <div class="info">
      <span>Click to edit.</span>
      <a onclick={[ClearCheckedItems]}>Clear checked items</a>
    </div>
  </div>
)
// Item component
const Item = ({id, value, done, editing}) => (
  <li class="item" key={id}>
    {
      editing
        ? ( // If the item if currently being edited
          <form class="inner" method="post" onsubmit={[ToggleItemEditing, id]}>
            <input type="text" value={value} onCreate={el => el.focus()} oninput={[UpdateItem, id]} required />
            <button class="confirm">{<Check />}</button>
          </form>
        )
        : ( // If the item is NOT being edited (default)
          <div class={'inner' + (done ? ' done' : '')}>
            <button class="check" onclick={[ToggleItem, id]}>{done ? <CheckedCircle /> : <Circle />}</button>
            <div class="name" onclick={[ToggleItemEditing, id]}>
              {
                done
                  ? <strike>{value}</strike>
                  : <span>{value}</span>
              }
            </div>
            <button class="delete" onclick={[DeleteItem, id]}><Close /></button>
          </div>
        )
    }
  </li>
)
