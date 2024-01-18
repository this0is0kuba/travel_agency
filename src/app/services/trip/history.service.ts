import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HistoryInterface } from '../../models/HistoryInterface';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private apiUrl = "http://localhost:3000/history";

  constructor(private http: HttpClient) {}

  getHistryForUser(tripId: String) {

    const url = this.apiUrl + "/" + tripId;

    return this.http.get<HistoryInterface[]>(url);
  }

  createHistoryForUser(history: HistoryInterface) {

    return this.http.post<HistoryInterface>(this.apiUrl, history);
  }
}
