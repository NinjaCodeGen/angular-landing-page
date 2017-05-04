export class Rating {
    constructor(
        public uid: string,
        public featureRequestKey: string,
        public value: number,
        //public timestamp: any = firebase.database.ServerValue.TIMESTAMP
    ) {

    }
}