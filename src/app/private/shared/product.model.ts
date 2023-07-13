export class Product{
    
    constructor(
        public idSeller?: string,
        public id?:string,
        public name?: string,
        public category?: string,
        public value?:string,
        public description?: string

    ){

    }
}

export class Cart{
    constructor(
        public id?:string,
        public idClient?:string,
        public amount?:number,
        public Products?:Map<string, number>
    ){

    }
}