import 'typescript-rest';
import { Path, POST, GET, PathParam } from 'typescript-rest';
import { morpionService } from './morpionService';

export interface Play {
    id: string, playerTurn: string, x: number, y: number
}

@Path('morpion')
export class MorpionRest {
    @Path('create')
    @POST
    createGame() {
        console.log(':/create')
        return morpionService.createGame();
    }

    @Path('play')
    @POST
    play(body: Play) {
        console.log(':/play')
        return morpionService.play(Number(body.id), body.playerTurn, body.x, body.y);
    }

    @Path('reset')
    @POST
    resetGame() {

    }

    @Path('grid/:id')
    @GET
    getGrid( @PathParam('id') id: number) {
        console.log(':/grid')
        return morpionService.getGrid(id);
    }
}