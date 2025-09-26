import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `<h1>Test Component Works!</h1>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent {}
