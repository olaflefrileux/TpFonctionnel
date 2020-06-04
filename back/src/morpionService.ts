import { morpionHandler } from "./morpionHandler";

class MorpionService {
    constructor() {
        console.log('MorpionService instantiated');
    }

    public createGame(): number {
        return morpionHandler.createGame();
    }

    public play(gameId: number, player: string, x: number, y: number) {
        return morpionHandler.play(gameId, player, (y * 3 + x));
    }

    public getGrid(id: number) {
        return morpionHandler.getGrid(id);
    }
}

export const morpionService = new MorpionService();