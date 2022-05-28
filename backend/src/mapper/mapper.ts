export class Mapper{
    public static mapper<T, U>(from: T, to: new () => U) : U {

        let uInstance = new to();

        for(const prop in uInstance){            
            uInstance[prop.toString()] = from[prop.toString()];
        }

        return uInstance;
    }

    public static mapperList<T, U>(from: Array<T>, to: new () => U) : U[]{
        let toList: U[] = [];

        from.forEach(x => {
            toList.push(this.mapper<T, U>(x , to));
        })
        
        return toList;
    }
}