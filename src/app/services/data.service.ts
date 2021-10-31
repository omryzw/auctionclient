import { HttpClient } from '@angular/common/http';
import { apiUrl } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getAllProducts = () => this.http.get(`${apiUrl}/product`);
}
