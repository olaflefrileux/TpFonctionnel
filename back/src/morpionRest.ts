import 'typescript-rest';
import { Path, POST, GET, PathParam } from 'typescript-rest';
import { morpionService } from './morpionService';

export interface Play {
    id: number, player: string, x: number, y: number
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
        return morpionService.play(body.id, body.player, body.x, body.y);
    }

    @Path('reset')
    @POST
    resetGame() {

    }

    @Path('grid/:id')
    @GET
    getGrid( @PathParam('id') id: number) {
        return morpionService.getGrid(id);
    }
}