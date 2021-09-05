import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Trip } from "../data/models/Trip";

@Injectable({ providedIn: 'root' })
export class RecommendedService {

    private static baseURL: string = 'https://localhost:5001/api/trips/';

    constructor(private http: HttpClient) { }

    public GetRecommendedTrips(): Observable<Trip[]> {
        return this.http.get<Trip[]>(
            RecommendedService.baseURL,
            {
            responseType: 'json'
        });
    }
}