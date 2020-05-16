type eq<T> = {$eq: T}
type gt = {$gt: number}
type lt = {$lt: number}
type and<T> = {$and: {[key in keyof T]?: gt | lt}[] };
type or<T> = {$or: {[key in keyof T]?: gt | lt}[] };
type text = {$text: string};
type inFilter<T> = { [key in keyof T]?: {$in: T[key][]} };
 
type Query<T> = {
    [key in keyof T]?: eq<T[key]> | gt | lt;
} | and<T>
  | or<T>
  | text
  | inFilter<T>;


const readline = require('readline');
const fs = require('fs');

export class Database<T> {
    protected filename: string;
    protected fullTextSearchFieldNames: unknown[];
    
    constructor(filename: string, fullTextSearchFieldNames: string[]) {
        this.filename = filename;
        this.fullTextSearchFieldNames = fullTextSearchFieldNames;
    }
    

    async find(query: Query<T>): Promise<T[]> {
        const elements: T[] = [];

        return new Promise( (resolve, reject) =>{
            let rl = readline.createInterface({
                input: fs.createReadStream(this.filename)
            });
            
            let line_no = 0;
            
            rl.on('line', function(line: string) {
                const firstLetter = line.slice(0,1);
                if (firstLetter === 'E') {
                    const toParse = line.slice(1);
                    const element = JSON.parse(toParse);
                    elements.push(element);
                } 
                line_no++;
            });
            
            rl.on('close', function(line: string) {
                // console.log('elements', elements)
                resolve(elements);
            });
        })
        
    }
} 
