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
        loadComponent: () => 
            import('./Books/book-list/book-list.component').then((c) => c.BookListComponent),
    },
    {
        path: 'books/add',
        loadComponent: () => 
            import('./Books/book-form/book-form.component').then((c) => c.BookFormComponent),
    },
    {
        path: 'books/edit/:id',
        loadComponent: () => 
            import('./Books/book-form/book-form.component').then((c) => c.BookFormComponent),
    },
    {
        path: 'books/:id',
        loadComponent: () => 
            import('./Books/book-detail/book-detail.component').then((c) => c.BookDetailComponent),
    },
    {
        path: 'to-dos',
        loadComponent: () =>
            import('./ToDo/to-do-index/to-do-index.component').then((x) => x.ToDoIndexComponent)
    },
    {
        path:'to-dos/:id',
        loadComponent:() =>
            import('./ToDo/to-do-detail/to-do-detail.component').then((x) => x.ToDoDetailComponent)
    },
    // Wildcard route to handle all unknown routes
    { path: '**', redirectTo: '/404' }, 
];