import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HeroesService {

  private baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) { }

  /**
   * Retrieves the list of heroes from the server.
   * @returns An Observable that emits an array of Hero objects.
   */
  getHeroes(): Observable<Hero[]> {
    return this._http.get<Hero[]>(`${this.baseUrl}/heroes`)
    .pipe(
      catchError(() => of([]))
    );
  }
  
  /**
   * Retrieves a hero by ID.
   * @param id - The ID of the hero to retrieve.
   * @returns An Observable that emits the hero with the specified ID, or undefined if the hero is not found.
   */
  getHeroById(id: string): Observable<Hero | undefined> {
    return this._http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      catchError(() => of(undefined))
    );
  }

  /**
   * Retrieves a list of heroes whose name matches the specified term.
   * @param term - The search term to use.
   * @returns An Observable that emits an array of Hero objects that match the search term.
   */
  getSuggestions(term: string): Observable<Hero[]> {
    return this._http.get<Hero[]>(`${this.baseUrl}/heroes?q=${term}`)
    .pipe(
      catchError(() => of([]))
    );
  }
}
