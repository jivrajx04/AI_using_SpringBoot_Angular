import { Routes } from '@angular/router';
import { Chat } from './pages/chat/chat';
import { Image } from './pages/image/image';
import { Cricket } from './pages/cricket/cricket';

export const routes: Routes = [
    {path: '', component: Chat, pathMatch: 'full' }, // Default route
    {path: 'chat', component: Chat },
    {path: 'image', component: Image },
    {path: 'cricket', component: Cricket },
];
