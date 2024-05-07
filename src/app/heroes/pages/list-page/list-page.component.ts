import { Component, ViewChild } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription, catchError } from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``,
})
export class ListPageComponent {
  heroes: Hero[] = [];
  totalHeroes = 50;
  pageSize = 5;
  currentPage = 0;
  heroesSubscription: Subscription | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private heroesService: HeroesService) {}

  getHeroes() {
    this.heroesSubscription = this.heroesService
      .getPaginatedHeroes(this.currentPage, this.pageSize)
      .pipe(
        catchError((error) => {
          console.error('Error loading heroes', error);
          return [];
        })
      )
      .subscribe((heroes) => {
        this.heroes = heroes;
      });
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getHeroes();
  }

  updateHeroList(heroes: Hero | Hero[]): void {
    this.heroes = Array.isArray(heroes) ? heroes : [heroes];
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  ngOnDestroy(): void {
    if (this.heroesSubscription) {
      this.heroesSubscription.unsubscribe();
    }
  }
}
