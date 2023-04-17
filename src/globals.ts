export enum FilterByAge  {
    ALL = 'All',
    FROM_18_TO_30 = '18-30',
    FROM_31_TO_45 ='31-45',
    ABOVE_45 = ">45"
}

export enum FilterByGender  {
    ALL ='All',
    MALE ='Male',
    FEMALE ='Female'
}

export enum SortByOrder {
    NONE ="None",
    ASCENDING ="Ascending",
    DESCENDING ="Descending"
}

export enum Filters {
    AGE ='Age',
    GENDER = 'Gender',
    SORTING = 'Sorting'
}

// export const FilterByAge: { [x: string]: {value:string;selected:boolean;} } = {
//     ALL :{value: 'All',selected:false},
//     FROM_18_TO_30 :{value: '18-30',selected:false},
//     FROM_31_TO_45 :{value:'31-45',selected:false},
//     ABOVE_45 :{value: '>45',selected:false}
// }

// export const FilterByGender:{ [x: string]: {value:string;selected:boolean;}} = {
//     ALL : {value:'All', selected:false},
//     MALE : {value:'Male', selected:false},
//     FEMALE : {value:'Female', selected:false}
// }

// export const SortByOrder:{[x: string]: {value:string;selected:boolean;}} = {
//     None :{value: 'None', selected:false},
//     Ascending :{value: 'Ascending', selected:false},
//     Descending :{ value:'Descending', selected:false}
// }