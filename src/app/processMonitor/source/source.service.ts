import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SourceService {
  public token: string;

  constructor(private http: Http) { }

  public getJSON(): Observable<any> {
    return this.http.get('assets/source.json')
      .map((res: any) => res.json());
  }
}
