export class Sale{
    
    constructor(
        public idSeller?: string,
        public idClient?:string,
        public id?:string,
        public date?: string,
        public amount?: string,
        public paymentMethod?: string,
        public products?: Map<string, number>,
    ){

    }
}