import { Injectable } from '@angular/core';
import { BracketsManager, ValueToArray, DataTypes } from 'brackets-manager';
import { InMemoryDatabase } from '../_utils/memory';
import { ViewerData } from 'brackets-viewer';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BracketsManagerService {
    private db = new InMemoryDatabase();
    private manager = new BracketsManager(this.db);

    onUpdate: Subject<ViewerData> = new Subject<ViewerData>();

    constructor() {}

    private getNearestPowerOfTwo(input: number): number { return Math.pow(2, Math.ceil(Math.log2(input))); }

    async createTournament(tournamentId: number, dataset: any): Promise<ViewerData> {
        this.db.setData({
            participant: dataset.roster.map((player: any) => ({
              ...player,
              tournament_id: tournamentId,
            })),
            stage: [],
            group: [],
            round: [],
            match: [],
            match_game: [],
        });

        await this.manager.create.stage({
            name: dataset.title,
            tournamentId,
            type: dataset.type,
            seeding: dataset.roster.map((player: any) => player.name),
            settings: {
                seedOrdering: [
                    'natural'//'inner_outer'
                ],
                size: this.getNearestPowerOfTwo(dataset.roster.length),
            },
        });

        const data: ValueToArray<DataTypes> = await this.manager.get.stageData(0);
        
        const viewerData = {
            stages: data.stage,
            matches: data.match,
            matchGames: data.match_game,
            participants: data.participant,
        };

        this.onUpdate.next(viewerData);

        return viewerData;
    }

}