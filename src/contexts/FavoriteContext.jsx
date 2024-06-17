/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const FavoriteContext = createContext();
const FavoriteDispatchContext = createContext();

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FAVORITE":
      return { ...state, favorite: action.payload, loading: false };
    case "REMOVE_FROM_FAVORITE":
      return {
        ...state,
        favorite: state.favorite.filter(
          (movie) => movie.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export function FavoriteProvider({ children }) {
  const [favorite, dispatch] = useReducer(favoriteReducer, {
    favorite: [],
    loading: true,
    error: null
  });
  return (
    <FavoriteContext.Provider value={favorite}>
      <FavoriteDispatchContext.Provider value={dispatch}>
        {children}
      </FavoriteDispatchContext.Provider>
    </FavoriteContext.Provider>
  )
}

export function useFavorite() {
  return useContext(FavoriteContext);
}

export function useFavoriteDispatch() {
  return useContext(FavoriteDispatchContext);
}
