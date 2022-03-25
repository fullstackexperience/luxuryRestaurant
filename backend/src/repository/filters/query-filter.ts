export interface QueryFilters{
    filters: Array<QueryFilter>;
    pageQuantity: number;
    limit: number 
}

export interface QueryFilter{
    property: string;
    operator: string;
    comparison: string;
}