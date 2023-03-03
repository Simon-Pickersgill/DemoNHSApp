export interface PatientSearchParams {
    identifier: string,
    family: string,
    given: string,
    birthdate: Date,
    [index:string]: string | Date
}
