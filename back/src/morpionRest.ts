import 'typescript-rest';
import { Path, POST, GET } from 'typescript-rest';
import { morpionService } from './morpionService';

@Path('morpion')
export class MorpionRest {
    @Path('list')
    @GET
    getList() {
        console.log(':/list')
        return morpionService.getGameList();
    }

    @Path('create')
    @POST
    createGame() {
        console.log(':/create')
        return morpionService.createGame();
    }

    @Path('join')
    @POST
    joinGame() {
        console.log(':/join')
      //  return morpionService.joinGame();
    }

    @Path('play')
    @POST
    play(cell: number) {
        return morpionService.play(0, cell);
    }

    @Path('reset')
    @POST
    resetGame() {

    }
}