import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ApiService } from './service/api.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rxjs_debounce';
  searchForm: FormGroup;
  stdDataRes:any;

  constructor(private apiService:ApiService) {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl(''),
    });
  }

  ngOnInit() {

    this.searchForm.get('searchTerm')?.valueChanges
      .pipe(
        debounceTime(3000),
        distinctUntilChanged(),
        switchMap((query) => {

          return this.apiService.searchStdData(query);

        })
      )
      .subscribe(value => {
        console.log('Searching for:', value);
        this.stdDataRes=value

      });
      
  }
}
