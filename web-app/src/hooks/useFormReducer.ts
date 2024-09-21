import { useReducer } from 'react';

interface FormState {
  price: string;
  area: string;
  rooms: string;
  level: string;
}

type ActionType =
  | { type: 'SET_PRICE'; payload: string }
  | { type: 'SET_AREA'; payload: string }
  | { type: 'SET_ROOMS'; payload: string }
  | { type: 'SET_LEVEL'; payload: string };

const initialState: FormState = {
  price: '',
  area: '',
  rooms: '',
  level: '',
};

const formReducer = (state: FormState, action: ActionType): FormState => {
  switch (action.type) {
    case 'SET_PRICE':
      return { ...state, price: action.payload };
    case 'SET_AREA':
      return { ...state, area: action.payload };
    case 'SET_ROOMS':
      return { ...state, rooms: action.payload };
    case 'SET_LEVEL':
      return { ...state, level: action.payload };
    default:
      return state;
  }
};

export const useFormReducer = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const setPrice = (value: string) =>
    dispatch({ type: 'SET_PRICE', payload: value });
  const setCapacity = (value: string) =>
    dispatch({ type: 'SET_AREA', payload: value });
  const setRooms = (value: string) =>
    dispatch({ type: 'SET_ROOMS', payload: value });
  const setLevel = (value: string) =>
    dispatch({ type: 'SET_LEVEL', payload: value });

  return {
    state,
    setPrice,
    setCapacity,
    setRooms,
    setLevel,
  };
};
