import { Heroe } from '../models/heroe';

export interface appState {
    readonly heroes: Array<Heroe>;
}