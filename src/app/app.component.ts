import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavigationComponent } from './components/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavigationComponent],
  template: `
    @if (showNavigation()) {
      <app-navigation></app-navigation>
    }
    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private router = inject(Router);

  showNavigation() {
    return !this.router.url.includes('login') && !this.router.url.includes('register');
  }
}
