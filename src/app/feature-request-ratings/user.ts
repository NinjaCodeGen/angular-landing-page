import { Rating } from './rating';

export class User {
    constructor(
        public name: string,
        public ratings: Rating[]
    ) {

    }
}