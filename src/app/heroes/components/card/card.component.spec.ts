
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { HeroImagePipe } from '../../pipes/hero-image.pipe';
import { MaterialModule } from '../../../material/material.module';
import { Publisher } from '../../interfaces/hero.interface';
import { RouterTestingModule } from '@angular/router/testing';


describe('CardComponent', () => {
  let fixture: ComponentFixture<CardComponent>;
  let component: CardComponent;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CardComponent,
        HeroImagePipe,
      ],
      imports: [
        MaterialModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;

    component.hero = {
      id: '1',
      superhero: 'Test Hero',
      publisher: Publisher.DcComics,
      alter_ego: 'Test Alter Ego',
      first_appearance: 'Test First Appearance',
      characters: 'Test Characters'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the hero name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-card-title').textContent).toContain('Test Hero');
  });

  it('should show the hero alter ego', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-card-subtitle').textContent).toContain('Test Alter Ego');
  });

});