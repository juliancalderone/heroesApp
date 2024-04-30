import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HeroesService } from './heroes.service';

import { Hero, Publisher } from '../interfaces/hero.interface';
import { of } from 'rxjs';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService],
    });
    service = TestBed.inject(HeroesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<Hero[]>', () => {
    const mockHeroes: Hero[] = [
      {
        id: '1',
        superhero: 'Batman',
        publisher: Publisher.DcComics,
        alter_ego: 'Bruce Wayne',
        first_appearance: 'Detective Comics #27',
        characters: 'Bruce Wayne',
      },
      {
        id: '2',
        superhero: 'Superman',
        publisher: Publisher.DcComics,
        alter_ego: 'Kal-El',
        first_appearance: 'Action Comics #1',
        characters: 'Kal-El',
      },
    ];

    service.getHeroes().subscribe((heroes) => {
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/heroes`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });

  it('should return an empty array if an error occurs', () => {
    service.getHeroes().subscribe((heroes) => {
      expect(heroes).toEqual([]);
    });

    const req = httpMock.expectOne(`${(service as any)['baseUrl']}/heroes`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Network error'));
  });

  it('should return a specific hero by id', () => {
    const mockHero: Hero = {
      id: '1',
      superhero: 'Batman',
      publisher: Publisher.DcComics,
      alter_ego: 'Bruce Wayne',
      first_appearance: 'Detective Comics #27',
      characters: 'Bruce Wayne',
    };

    service.getHeroById('1').subscribe((hero) => {
      expect(hero).toEqual(mockHero);
    });
  });

  it('should return undefined if the hero is not found', () => {
    service.getHeroById('1').subscribe((hero) => {
      expect(hero).toBeUndefined();
    });
  });

  it('should return an Observable<Hero[]> for getSuggestions', () => {
    const term = 'batman';
    const mockHeroes: Hero[] = [
      {
        id: '1',
        superhero: 'Batman',
        publisher: Publisher.DcComics,
        alter_ego: 'Bruce Wayne',
        first_appearance: 'Detective Comics #27',
        characters: 'Bruce Wayne',
      },
      {
        id: '2',
        superhero: 'Batgirl',
        publisher: Publisher.DcComics,
        alter_ego: 'Barbara Gordon',
        first_appearance: 'Detective Comics #359',
        characters: 'Barbara Gordon',
      },
    ];

    service.getSuggestions(term).subscribe((heroes) => {
      expect(heroes).toEqual(mockHeroes);
    });
  });

  it('should return an empty array if no suggestions are found', () => {
    const term = 'asdasdasd';
    service.getSuggestions(term).subscribe((heroes) => {
      expect(heroes).toEqual([]);
    });
  });

  it('should add a hero', () => {
    const mockHero: Hero = {
      id: '3',
      superhero: 'Spider-Man',
      publisher: Publisher.MarvelComics,
      alter_ego: 'Peter Parker',
      first_appearance: 'Amazing Fantasy #15',
      characters: 'Peter Parker',
    };

    service.addHero(mockHero).subscribe((hero) => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/heroes`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockHero);
    req.flush(mockHero);
  });

  it('should update a hero', () => {
    const mockHero: Hero = {
      id: '1',
      superhero: 'Batman',
      publisher: Publisher.DcComics,
      alter_ego: 'Bruce Wayne',
      first_appearance: 'Detective Comics #27',
      characters: 'Bruce Wayne',
    };
  
    service.updateHero(mockHero).subscribe((hero) => {
      expect(hero).toEqual(mockHero);
    });
  
    const req = httpMock.expectOne(`${service['baseUrl']}/heroes/${mockHero.id}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(mockHero);
    req.flush(mockHero);
  });

  type HeroWithoutId = Omit<Hero, 'id'>;

  it('should throw an error if hero ID is missing', () => {
    const mockHero: HeroWithoutId = {
      superhero: 'Batman',
      publisher: Publisher.DcComics,
      alter_ego: 'Bruce Wayne',
      first_appearance: 'Detective Comics #27',
      characters: 'Bruce Wayne',
    };
  
    expect(() => {
      service.updateHero(mockHero as Hero);
    }).toThrowError('Hero ID is required');
  });

  it('should delete a hero by id', () => {
    const id = '1';
  
    service.deleteHeroById(id).subscribe((result) => {
      expect(result).toBeTrue();
    });
  
    const req = httpMock.expectOne(`${service['baseUrl']}/heroes/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  
});
