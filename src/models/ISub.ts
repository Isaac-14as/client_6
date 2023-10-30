export interface IOpportunity {
    id: number;
    subscription_type_id: number;
    name: string;
}

export interface ISub {
    id: number;
    name: string;
    price: number;
    subscription_type_infos: IOpportunity[]
}
