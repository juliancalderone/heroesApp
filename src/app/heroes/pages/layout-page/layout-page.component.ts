import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
  sidebarItems = [
    { label: 'List', icon: 'list', url: './list' },	
    { label: 'Add hero', icon: 'add', url: './new-hero' },	
  ];
}
