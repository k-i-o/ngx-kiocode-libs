import { Dataset } from "../_models/Dataset";

export class Datasets {
    static dataset2Members: Dataset = {
        title: 'Competition of 2',
        type: 'single_elimination',
        roster: [
            { id: 7, name: 'Seed 1' },
            { id: 155, name: 'Seed 2' },
        ],
    };
      
    static dataset4Members: Dataset = {
        title: 'Competition of 4 ish',
        type: 'single_elimination',
        roster: [
            { id: 7, name: 'Seed 1' },
            { id: 155, name: 'Seed 2' },
            { id: 353, name: 'Seed 3' },
            { id: 352, name: 'Seed 4' },
        ],
    };
      
    static dataset8Members: Dataset = {
        title: '8 competitor tournament',
        type: 'single_elimination',
        roster: [
            { id: 7, name: 'Seed 1' },
            { id: 55, name: 'Seed 2' },
            { id: 53, name: 'Seed 3' },
            { id: 523, name: 'Seed 4' },
            { id: 123, name: 'Seed 5' },
            { id: 353, name: 'Seed 6' },
            { id: 354, name: 'Seed 7' },
            { id: 355, name: 'Seed 8' },
        ],
    };
      
    static dataset16Members: Dataset = {
        title: 'Test Tournament',
        type: 'single_elimination', //'double_elimination'
        roster: [
            { id: 7, name: 'Seed 1' },
            { id: 55, name: 'Seed 2' },
            { id: 53, name: 'Seed 3' },
            { id: 523, name: 'Seed 4' },
            { id: 123, name: 'Seed 5' },
            { id: 353, name: 'Seed 6' },
            { id: 354, name: 'Seed 7' },
            { id: 355, name: 'Seed 8' },
            { id: 79, name: 'Seed 9' },
            { id: 559, name: 'Seed 10' },
            { id: 539, name: 'Seed 11' },
            { id: 5293, name: 'Seed 12' },
            { id: 1239, name: 'Seed 13' },
            { id: 3953, name: 'Seed 14' },
            { id: 3594, name: 'Seed 15' },
            { id: 3595, name: 'Seed 16' },
        ],
    };
      
    static dataset32Members: Dataset = {
        title: '32 competitor tournament',
        type: 'double_elimination',
        roster: [
            { id: 7, name: 'Seed 1' },
            { id: 55, name: 'Seed 2' },
            { id: 53, name: 'Seed 3' },
            { id: 523, name: 'Seed 4' },
            { id: 123, name: 'Seed 5' },
            { id: 353, name: 'Seed 6' },
            { id: 17, name: 'Seed 7' },
            { id: 155, name: 'Seed 8' },
            { id: 153, name: 'Seed 9' },
            { id: 1523, name: 'Seed 10' },
            { id: 1123, name: 'Seed 11' },
            { id: 1353, name: 'Seed 12' },
            { id: 1354, name: 'Seed 13' },
            { id: 1355, name: 'Seed 14' },
            { id: 1356, name: 'Seed 15' },
            { id: 1357, name: 'Seed 16' },
            { id: 1358, name: 'Seed 17' },
            { id: 1359, name: 'Seed 18' },
            { id: 1360, name: 'Seed 19' },
            { id: 1361, name: 'Seed 20' },
            { id: 1362, name: 'Seed 21' },
            { id: 1363, name: 'Seed 22' },
            { id: 1364, name: 'Seed 23' },
            { id: 1365, name: 'Seed 24' },
            { id: 13466, name: 'Seed 25' },
            { id: 13366, name: 'Seed 26' },
            { id: 13566, name: 'Seed 27' },
            { id: 13676, name: 'Seed 28' },
            { id: 1366, name: 'Seed 29' },
            { id: 1376, name: 'Seed 30' },
            { id: 13546, name: 'Seed 31' },
            { id: 13686, name: 'Seed 32' },
        ],
    };
      
}