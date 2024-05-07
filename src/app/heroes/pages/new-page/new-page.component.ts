import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { EMPTY, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: `
    .new-hero {
      padding: 1rem;
      .back {
        display: flex;
        justify-content: space-between;
      }
    }
    .form-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 100%;
    }
    .buttons-wrapper {
      display: flex;
      justify-content: space-between;
    }
    .cover {
      width: 300px;
      height: 500px;
      object-fit: cover;
      @media (max-width: 768px) {
        width: 100%;
      }
    }
  `,
})
export class NewPageComponent {
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DcComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publisher = [
    {
      id: 'DC Comics',
      desc: 'DC Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel Comics',
    },
  ];

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) {
          return this.router.navigateByUrl('/');
        }

        this.heroForm.reset(hero);
        return;
      });
  }

  get currentHero() {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Done', {
      duration: 2500,
    });
  }

  onBack() {
    this.router.navigate(['/heroes']);
  }

  onDeleteHero() {
    const dialog = this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: this.currentHero,
    });

    dialog.afterClosed().pipe(
      switchMap((result) => {
        if (!result) return EMPTY;
        return this.heroesService.deleteHeroById(this.currentHero.id!);
      })
    ).subscribe((heroeDeleted) => {
      if (heroeDeleted) {
        this.showSnackBar(`${this.currentHero.superhero} deleted!`);
        this.router.navigate(['/heroes']);  
      }
    });
  }

  onSubmit():void {

    if ( this.heroForm.invalid ) return;

    if ( this.currentHero.id ) {
      this.heroesService.updateHero( this.currentHero )
        .subscribe( hero => {
          this.showSnackBar(`${ hero.superhero } updated!`);
          this.router.navigate(['/heroes']);
        });

      return;
    }

    this.heroesService.addHero( this.currentHero )
      .subscribe( hero => {
        this.router.navigate(['/heroes/edit', hero.id ]);
        this.showSnackBar(`${ hero.superhero } created!`);
      });
  }
  
}
