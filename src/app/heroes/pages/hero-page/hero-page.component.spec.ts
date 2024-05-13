import { of } from 'rxjs';
import { HeroPageComponent } from './hero-page.component';
import { ActivatedRoute, Router } from '@angular/router';

describe('HeroPageComponent', () => {
  let component: HeroPageComponent;
  let heroesServiceMock: any;
  let activatedRouteMock: any;
  let routerMock: any;

  beforeEach(() => {
    heroesServiceMock = jasmine.createSpyObj('HeroesService', ['getHeroById']);
    heroesServiceMock.getHeroById.and.returnValue(of({ id: 'dc-superman', name: 'Superman' }));
    activatedRouteMock = {
      params: of({ id: 'dc-superman' })
    };
    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);
    component = new HeroPageComponent(heroesServiceMock, activatedRouteMock, routerMock);
  });

  it('should call heroesService.getHeroById with the correct id', () => {
    component.ngOnInit();
    expect(heroesServiceMock.getHeroById).toHaveBeenCalledWith('dc-superman');
  });

  it('should navigate to /heroes/list if no hero is found', () => {
    heroesServiceMock.getHeroById.and.returnValue(of(null));
    component.ngOnInit();
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/heroes/list');
  });

});