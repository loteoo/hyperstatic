import SetPathStatus from '../actions/SetPathStatus';
import fx from '../utils/fx'


const loadStaticRunner = async (dispatch, { path, loader, action, error }) => {
  try {

    // @ts-ignore
    const cachedUrl = window?.HYPERSTATIC_DATA?.cache[path]

    const promise = cachedUrl
      ? fetch(cachedUrl).then(res => res.json())
      : loader()

    const data = await promise;

    // @ts-expect-error
    if (window.cacheData) {
      // @ts-expect-error
      window.cacheData(path, data)
    }

    dispatch((state: State) => action(SetPathStatus(state, { path, status: 'ready' }), data))
  } catch (err) {
    console.error(err)
    dispatch(error, err)
  }
}

loadStaticRunner.fxName = 'loadStatic';

const loadStatic = fx(loadStaticRunner)

export default loadStatic
