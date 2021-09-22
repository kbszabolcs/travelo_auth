import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TripCreateDTO } from "../data/models/TripCreateDTO";
import { Trip } from "../data/models/Trip";

@Injectable({ providedIn: 'root' })
export class TripService {

    private static baseURL: string = 'https://localhost:5001/api/trips/';
    public static base64Prefix: string = "data:image/png;base64,";

    constructor(private http: HttpClient) { }

    public GetRecommendedTrips(): Observable<Trip[]> {
        return this.http.get<Trip[]>(
            TripService.baseURL,
            {
            responseType: 'json'
        });
    }

    public GetTripById(id: string): Observable<Trip> {
        return this.http.get<Trip>(
            TripService.baseURL + id
        );
    }

    public PostTrip(trip: TripCreateDTO): Observable<TripCreateDTO>{
        return this.http.post<TripCreateDTO>(
            TripService.baseURL,
            trip
        )
    }

    public UpdateTrip(id: string, tripUpdateDTO: TripCreateDTO) {
        return this.http.put<TripCreateDTO>(
            TripService.baseURL + id,
            tripUpdateDTO
        );
    }

    public DeleteTrip(guid: string) {
        console.log(TripService.baseURL + guid);
        
        return this.http.delete(TripService.baseURL + guid);
    }
}