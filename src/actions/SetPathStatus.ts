interface SetPathStatusArgs {
  path: string
  status: PathStatus;
}

const SetPathStatus = (state: State, { path, status }: SetPathStatusArgs): State => ({
  ...state,
  paths: {
    ...state.paths,
    [path]: status
  }
})

export default SetPathStatus
