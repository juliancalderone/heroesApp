import { Component, OnInit } from '@angular/core';
import { Hero } from '../../heroes/interfaces/hero.interface';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { FormControl } from '@angular/forms';
import { HeroesService } from '../../heroes/services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
})
export class SearchBoxComponent {
  public searchInput = new FormControl('');
  public heroes$: Observable<Hero[]> = of([]);
  public selectedHero?: Hero;

  constructor(private heroesService: HeroesService, private router: Router) {}

  lookUpHero(value: string) {
    return this.heroesService
      .getSuggestions(value)
      .pipe(
        map((heroes) =>
          heroes.filter((hero) =>
            hero.superhero.toLowerCase().includes(value.toLowerCase())
          ),
        )
      );
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }
    const hero: Hero = event.option.value;
  }
  

  ngOnInit() {
    this.heroes$ = this.searchInput.valueChanges.pipe(
      debounceTime(300),
      switchMap((value) => this.lookUpHero(value || '')),
    );
  }
}
