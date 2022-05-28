import { QueryFilter, QueryFilters } from "./filters/query-filter";
import DataBaseContext from "../database/database-context";


export class BaseRepository{

    protected instaceDataBaseContext: DataBaseContext;

    constructor(){
        this.instaceDataBaseContext = DataBaseContext.getInstace();
    }

    protected async insertAsync(entity: any, table: string){
        await this.instaceDataBaseContext.knexContext(table)
        .insert(entity);
    }

    public buildFilter(filter: QueryFilters){
        let filterQuery : string = '';

        filterQuery += this.operationsBuild(filter.filters);
        filterQuery += this.addPagination(filter);

        return filterQuery;
    }

    private operationsBuild(filters: Array<QueryFilter>) : string{
        let operationQuery:  string = '';

        if(!filters.length)
            return operationQuery;

        filters.forEach(filter => {
            if(operationQuery){

                operationQuery += ` AND ${filter.property} ${filter.operator} ${filter.comparison}`;

            }else{

                operationQuery += `WHERE ${filter.property} ${filter.operator} ${filter.comparison}`;
                
            }            
        });

        return operationQuery;
    }

    private addPagination(filter: QueryFilters) : string{
        return ` OFFSET ${filter.pageQuantity} ROWS FETCH NEXT ${filter.limit} ROWS ONLY`;
    }
}