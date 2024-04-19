import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  @Input() hero!: Hero;

  ngOnInit() {
    if (!this.hero) {
      throw new Error('Hero is required');
    }
  }

}
