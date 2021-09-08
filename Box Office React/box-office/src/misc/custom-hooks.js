import { useReducer, useEffect } from 'react';

function showReducer(prevState, action) {
  switch (action.type) {
    case 'ADD': {
      return [...prevState, action.showId];
    }
    case 'Remove': {
      return prevState.filter(showId => showId !== action.showId);
    }
    default:
      return prevState;
  }
}

function usePersistedReducer(reducer, initialstate, key) {
  const [state, dispatch] = useReducer(reducer, initialstate, initial => {
    const persisted = localStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);
  return [state, dispatch];
}

export function useShows(key = 'shows') {
  return usePersistedReducer(showReducer, [], key);
}
