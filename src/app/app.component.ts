import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { map, mergeMap, Observable, tap } from 'rxjs';
import { SearchResponse, Name } from './models/search-response';
import { PatientSearchService } from './services/patient-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],  
})
export class AppComponent {
  title = 'NHS Patient Demo App';
  patientData$?: Observable<SearchResponse>;
  searching: boolean = false;
  searchForm: FormGroup = new FormGroup({
    identifierFormControl: new FormControl(''),
    familyFormControl: new FormControl(''),
    givenFormControl: new FormControl(''),
    birthDateFormControl: new FormControl('')
  }, {    
    validators: [
      atLeastOneFieldProvidedValidator
    ]
  });
  searchResponse$?: Observable<string[]>;

  constructor(private patientSearchService: PatientSearchService) {}    

  search = () => {
    this.searching = true;
    this.searchResponse$ = this.patientSearchService.searchPatient$({
      identifier: this.searchForm.get('identifierFormControl')?.value,
      family: this.searchForm.get('familyFormControl')?.value,
      given: this.searchForm.get('givenFormControl')?.value,
      birthdate: this.searchForm.get('birthDateFormControl')?.value
    }).pipe(tap(() => {
      this.searching = false;
    }));
  }
}

function atLeastOneFieldProvidedValidator(searchForm: AbstractControl): ValidationErrors | null {
  let invalid: boolean = true;  
  if (searchForm && (searchForm as FormGroup).controls) {
    for (let i = 0; i < Object.keys((searchForm as FormGroup).controls).length; i++) {
      let thisControl = (searchForm as FormGroup).controls[Object.keys((searchForm as FormGroup).controls)[i]];
      invalid = !thisControl.value;
      if (!invalid) {
        return null;
      }
    }
  }

  return { allFieldsEmpty: true };
}