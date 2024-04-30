import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatAutocompleteModule } from '@angular/material/autocomplete'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SearchBoxComponent } from './search-box.component';
import { HeroesService } from '../../heroes/services/heroes.service';


describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let service: HeroesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchBoxComponent,
      ],
      imports: [
        MatFormFieldModule, 
        MatInputModule,
        ReactiveFormsModule, 
        MatAutocompleteModule, 
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [HeroesService],
    })
    .compileComponents();
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
});