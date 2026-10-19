import { useState } from 'react';

import { useDispatch } from 'react-redux';

/**
 * A hook that creates an enhanced version of dispatch that can track the loading state.
 *
 * This hook will return a boolean that tracks the current loading state, and a function
 * that can be used an an alternative to dispatch for dispatching thunks. If dispatch
 * is called with a thunk it's loading state will be reflected in the boolean.
 *
 * If you need to track multiple requests, or multiple types of requests, use multiple
 * instances of this hook. e.g. one for loading and one for saving.
 *
 * The function returns what the thunk returns (Robbo: the editors get a failed save from it).
 *
 * @return {(boolean|(function(*=): Promise<*>)|*)[]}
 */
export default function useDispatchWithState() {
  const dispatch = useDispatch();
  const [isDispatching, setDispatching] = useState(false);

  const dispatchWithState = async (thunk) => {
    setDispatching(true);
    const result = await dispatch(thunk);
    setDispatching(false);
    return result;
  };

  return [
    isDispatching,
    dispatchWithState,
  ];
}
