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
    return this._http.get<Hero[]>(`${this.baseUrl}/heroes?q=${term}&_limit=5`)
    .pipe(
      catchError(() => of([]))
    );
  }

  /**
   * Adds a hero to the server.
   * @param hero - The hero object to be added.
   * @returns An Observable that emits the added hero.
   */
  addHero(hero: Hero): Observable<Hero> {
    return this._http.post<Hero>(`${this.baseUrl}/heroes`, hero)
  }

  /**
   * Updates an existing hero on the server.
   * @param hero - The hero object to be updated.
   * @returns An Observable that emits the updated hero.
   */
  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw new Error('Hero ID is required');
    return this._http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  /**
   * Deletes a hero from the server.
   * @param id - The ID of the hero to delete.
   * @returns An Observable that emits true if the hero was deleted, or false if the hero was not found.
   */
  deleteHeroById(id: string): Observable<Boolean> {
    return this._http.delete<Hero>(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      catchError(() => of(false)),
      map(() => true)
    );
  }
}
