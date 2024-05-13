import { LayoutPageComponent } from './layout-page.component';

describe('LayoutPageComponent', () => {
  let component: LayoutPageComponent;

  beforeEach(() => {
    component = new LayoutPageComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct sidebar items', () => {
    const expectedSidebarItems = [
      { label: 'List', icon: 'list', url: './list' },
      { label: 'Add hero', icon: 'add', url: './new-hero' },
    ];
    expect(component.sidebarItems).toEqual(expectedSidebarItems);
  });
});