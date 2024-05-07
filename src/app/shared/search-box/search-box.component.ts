import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, debounceTime, map, of, switchMap } from 'rxjs';
import { Hero } from '../../heroes/interfaces/hero.interface';
import { HeroesService } from '../../heroes/services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
})
export class SearchBoxComponent implements OnInit{
  @Output() heroesFiltered = new EventEmitter<Hero[] | Hero>();
  public heroes$: Observable<Hero[]> = of([]);
  public searchInput = new FormControl('');
  public selectedHero?: Hero;

  constructor(private heroesService: HeroesService, private router: Router) {}

  lookUpHero(value: string) {
    return this.heroesService.getSuggestions(value).pipe(
      map((heroes) => {
        const filteredHeroes = heroes.filter((hero) =>
          hero.superhero.toLowerCase().includes(value.toLowerCase())
        );
        this.heroesFiltered.emit(filteredHeroes);
        return filteredHeroes;
      })
    );
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }
    this.selectedHero = event.option.value;
    this.heroesFiltered.emit(this.selectedHero);
    const heroId = this.selectedHero?.id;
    if (heroId) {
      this.router.navigate(['/heroes', heroId]);
    }
  }

  ngOnInit() {
    this.heroes$ = this.searchInput.valueChanges.pipe(
      debounceTime(300),
      switchMap((value) => this.lookUpHero(value || '')),
    );
  }
}
