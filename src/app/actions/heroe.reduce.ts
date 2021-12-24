import { Heroe } from '../models/heroe';
import { ADD_CHARACTER, REMOVE_CHARACTER } from '../actions/heroe.actions';

const initialState: Array<Heroe> = JSON.parse(localStorage.getItem('equipo') || '[]');

export function heroeReducer(state: Array<Heroe> = initialState, action: any){
    switch (action.type) {
        case ADD_CHARACTER:
            console.log(action.type);
            return [...state, action.payload];
        case REMOVE_CHARACTER:
            console.log(action.type);
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}