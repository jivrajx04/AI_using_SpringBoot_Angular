import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CricketResponse } from '../models/cricketResponse';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private http: HttpClient){}
    
    baseUrl = 'http:/localhost:8080/api/chat'

  getRandomResponse(prompt:string):Observable<string>{
    return this.http.get('${this.baseUrl}/chat?inputText=${prompt}',{
      responseType: 'text' ,
    });
  }

  getCricketResponse(cricketPrompt:string) : Observable<CricketResponse>{
    return this.http.get<CricketResponse>('${this.baseUrl}/chat/cricket?inputText=${cricketPrompt}')

  }

  getImageResponse(imageDesc:string): Observable<string[]> {
    return this.http.get<string[]>('${this.baseUrl}/chat/images?imageDescription=${imageDesc}')
  }
}
