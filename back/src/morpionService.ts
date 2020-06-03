import { morpionHandler } from "./morpionHandler";

class MorpionService {
    constructor() {
        console.log('MorpionService instantiated');
    }

    public getGameList() {
        return morpionHandler.getGamesList();
    }

    public createGame() {
        return morpionHandler.createGame();
    }

    public joinGame(gameId: number) {
        return morpionHandler.joinGame(gameId);
    }

    public play(gameId: number, cell: number) {
        return morpionHandler.play(gameId, cell);
    }
}

export const morpionService = new MorpionService();