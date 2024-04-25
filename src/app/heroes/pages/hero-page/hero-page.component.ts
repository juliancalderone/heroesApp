import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';
import { debounce, debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: `
    .cover {
      background-size: cover;
      background-position: top;
      height: 500px;
      width: 50%;
    }
  `,
})
export class HeroPageComponent {
  hero?: Hero;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  getHeroById() {
    this.activatedRoute.params
      .pipe(
        // delay the request by 1 second
        debounceTime(1000),
        switchMap(({ id }) => this.heroesService.getHeroById(id))
      )
      .subscribe((hero) => {
        if (!hero) this.router.navigateByUrl('/heroes/list');
        return (this.hero = hero);
      });
  }

  ngOnInit() {
    this.getHeroById();
  }
}
