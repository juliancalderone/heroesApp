import { Component, ViewChild } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private heroesService: HeroesService) {}

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.heroesService
      .getPaginatedHeroes(this.currentPage, this.pageSize)
      .subscribe((heroes) => {
        this.heroes = heroes;
      });
  }

  ngOnInit(): void {
    this.heroesService
      .getPaginatedHeroes(this.currentPage, this.pageSize)
      .subscribe((heroes) => {
        this.heroes = heroes;
        console.log(this.heroes);
      });
  }
}
