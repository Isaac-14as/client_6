export interface IOpportunityTrainer {
    id: number;
    trainer_id: number;
    name: string;
}


export interface ITrainer {
    id: number;
    name: string;
    price: number;
    img_path: string;
    age: number;
    trainer_infos: IOpportunityTrainer[]
}
