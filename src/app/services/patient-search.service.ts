import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Globals } from 'src/globals';
import { PatientSearchParams } from '../models/patient-search-params';
import { SearchResponse } from '../models/search-response';

@Injectable({
  providedIn: 'root'
})
export class PatientSearchService {

  constructor(private httpClient: HttpClient) { }

  searchPatient$ = (searchParams: PatientSearchParams): Observable<string[]> => {
    let parameters: {[index: string]: string} = this.buildHttpParams(searchParams);
    let response$ = this.httpClient.get<SearchResponse>(Globals.apiBaseUrl + Globals.apiEndpoint, {
      params: parameters
    });

    let output$ = response$.pipe(map(
      (response) => {
        return response.entry.flatMap((entry) => {
          let responseOutput: string = 'Name: ';
          
          entry.resource.name.forEach((name) => responseOutput += `${name.given} `);
          entry.resource.name.forEach((name) => responseOutput += `${name.family} `);
          responseOutput += '; NHS Number: '
          entry.resource.identifier.forEach((id) => responseOutput += `${id.value} `)
          responseOutput += `; DOB: ${entry.resource.birthDate}`;          
          return responseOutput;
        })
      }
    ), tap(details => console.log(details)));

    return output$;    
  };

  private buildHttpParams = (searchParams: PatientSearchParams): {[index: string]: string}  => {
    let propertiesPopulated = Object.getOwnPropertyNames(searchParams);
    let httpParams: {[index:string]: string} = {};
    
    propertiesPopulated.forEach(prop => {
      if (typeof searchParams[prop] == 'string' && searchParams[prop]) {
        httpParams[prop]= searchParams[prop] as string;  
        return;
      }
      
      if(searchParams[prop]){
        let date = (searchParams[prop] as Date);
        let year = date.getFullYear();
        let month: string | number = date.getMonth()+1;
        let dt : string | number = date.getDate();
        
        if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
              
        httpParams[prop]= `${year}-${month}-${dt}`
      }      
    });
    
    return httpParams;
  }
}
