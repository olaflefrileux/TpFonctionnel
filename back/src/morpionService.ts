import { morpionHandler } from "./morpionHandler";

class MorpionService {
    constructor() {
        console.log('MorpionService instantiated');
    }

    public createGame(): number {
        return morpionHandler.createGame();
    }

    public play(gameId: number, player: string, cell: number) {
        return morpionHandler.play(gameId, player, cell);
    }

    public getGrid(id: number) {
        return morpionHandler.getGrid(id);
    }
}

export const morpionService = new MorpionService();