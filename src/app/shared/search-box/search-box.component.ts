import { Component, OnInit } from '@angular/core';
import { Hero } from '../../heroes/interfaces/hero.interface';
import { Observable, filter, map, of, startWith, switchMap } from 'rxjs';
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
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(private heroesService: HeroesService, private router: Router) {}

  searchHero() {
    const value: string = this.searchInput.value || '';
    this.heroesService
      .getSuggestions(value)
      .subscribe((heroes) => (this.heroes = heroes));
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }
    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
    this.router.navigate(['/heroes', hero.id]);
  }
}
