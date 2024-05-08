import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { SearchBoxComponent } from './search-box.component';
import { HeroesService } from '../../heroes/services/heroes.service';
import { Hero, Publisher } from '../../heroes/interfaces/hero.interface';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let service: HeroesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBoxComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [HeroesService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(HeroesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should call lookUpHero method', () => {
    const hero: Hero = {
      id: '1',
      superhero: 'Superman',
      publisher: Publisher.DcComics,
      alter_ego: 'Clark Kent',
      first_appearance: 'Action Comics #1',
      characters: 'Kal-El',
    };
    const heroes: Hero[] = [hero];
    const spy = spyOn(service, 'getSuggestions').and.returnValue(of(heroes));
    component.lookUpHero('Superman').subscribe
  });

  it('should call onSelectedOption method', () => {
    const hero: Hero = {
      id: '1',
      superhero: 'Superman',
      publisher: Publisher.DcComics,
      alter_ego: 'Clark Kent',
      first_appearance: 'Action Comics #1',
      characters: 'Kal-El',
    };
    const event = { option: { value: hero } };
    const spy = spyOn(component.heroesFiltered, 'emit');
    component.onSelectedOption(event as any);
    expect(spy).toHaveBeenCalledWith(hero);
  });

  it('should call onSelectedOption method with no value', () => {
    const event = { option: { value: null } };
    const spy = spyOn(component.heroesFiltered, 'emit');
    component.onSelectedOption(event as any);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call onSelectedOption method with no hero', () => {
    const event = { option: {} };
    const spy = spyOn(component.heroesFiltered, 'emit');
    component.onSelectedOption(event as any);
    expect(spy).not.toHaveBeenCalled();
  });

});
