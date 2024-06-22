import { Contender } from "./Contender";

export interface Dataset {
    title: string;
    type: TournamentTypes;
    roster: Contender[];
}

type TournamentTypes = 'single_elimination' | 'double_elimination';
