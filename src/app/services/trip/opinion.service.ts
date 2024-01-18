import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpinionInterface } from '../../models/OpinionInterface';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {

  private apiUrl = "http://localhost:3000/opinions";

  constructor(private http: HttpClient) {}

  getOpinionsForTrip(tripId: String) {

    const url = this.apiUrl + "/" + tripId;

    return this.http.get<OpinionInterface[]>(url);
  }

  createOpinionForTrip(opinion: OpinionInterface) {

    return this.http.post<OpinionInterface>(this.apiUrl, opinion);
  }
}
