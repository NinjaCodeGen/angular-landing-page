import { Rating } from './rating';

export class FeatureRequest {
    constructor(
        public name: string,
        public desc: string,
        public numberOfRatings: number,
        public avgRating: number,
        public creatorUid: string,
        public ratings: any
    ) {

    }
}