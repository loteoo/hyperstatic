


const fetchFx = (dispatch, props) =>
  fetch(props.url)
    .then(response => response.json())
    .then(data => dispatch(props.action, data))
    .catch(err => dispatch(props.error, err))

export const Http = {
  get: (props) => [fetchFx, props]
}
