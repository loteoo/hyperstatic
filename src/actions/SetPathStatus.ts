interface SetPathStatusArgs {
  path: string
  status: PathStatus;
}

/**
 * Set path status for a page
 */
const SetPathStatus = (state: State, { path, status }: SetPathStatusArgs): State => ({
  ...state,
  paths: {
    ...state.paths,
    [path]: status
  }
})

export default SetPathStatus
