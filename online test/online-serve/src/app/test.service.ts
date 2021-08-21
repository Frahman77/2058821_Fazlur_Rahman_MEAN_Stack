import { Injectable } from '@angular/core';
import { Test } from './test';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(public http:HttpClient) { }
   
  
  git():Observable<Test[]> {
      return this.http.get<Test[]>("/assets/test.json");

    }
}
