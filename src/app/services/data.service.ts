import { HttpClient } from '@angular/common/http';
import { apiUrl } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getAllProducts = () => this.http.get(`${apiUrl}/product`);

  getSingleProduct = (id: string) => this.http.get(`${apiUrl}/product/${id}`);

  placeBid = (id: any , currentBid:Object) => this.http.put(`${apiUrl}/autobid/direct/${id}`, {currentBid});

  placeAutoBid = (id: any, user:Object) => this.http.put(`${apiUrl}/autobid/product/${id}`, user);

  setupAutoBid = (user:Object) => this.http.post(`${apiUrl}/autobid`, user);  

  getAllUserNotifications = (user: string) => this.http.get(`${apiUrl}/notify?user=${user}`);

  changeProductStatus = (id: string) => this.http.put(`${apiUrl}/product/${id}`, {});

  getBidsWon = (user: string) => this.http.get(`${apiUrl}/autobid/won?user=${user}`);

}
