import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '404',
        loadComponent: () =>
            import('./not-found/not-found.component').then((m) => m.NotFoundComponent),
    },
    { path: '', component: DashboardComponent },
    {
        path: 'books',
        loadComponent: () => import('./Books/book-list/book-list.component').then(c => c.BookListComponent)
    },
    {
        path: 'books/:id',
        loadComponent: () => import('./Books/book-detail/book-detail.component').then(c => c.BookDetailComponent)
    },
    { path: '**', redirectTo: '/404' }, // Wildcard route to handle all unknown routes

];
