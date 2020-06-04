import 'typescript-rest';
import { Path, POST, GET, PathParam } from 'typescript-rest';
import { morpionService } from './morpionService';

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
    play(id: number, player: string, cell: number) {
        return morpionService.play(id, player, cell);
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