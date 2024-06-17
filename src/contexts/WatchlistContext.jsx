/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const WatchlistContext = createContext();
const WatchlistDispatchContext = createContext();

const watchlistReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_WATCHLIST":
      return { ...state, watchlist: action.payload, loading: false };
    case "REMOVE_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export function WatchlistProvider({ children }) {
  const [watchlist, dispatch] = useReducer(watchlistReducer, {
    watchlist: [],
    loading: true,
    error: null,
  });
  return (
    <WatchlistContext.Provider value={watchlist}>
      <WatchlistDispatchContext.Provider value={dispatch}>
        {children}
      </WatchlistDispatchContext.Provider>
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}

export function useWatchlistDispatch() {
  return useContext(WatchlistDispatchContext);
}
