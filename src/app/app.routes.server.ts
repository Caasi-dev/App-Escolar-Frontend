import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'login',
    renderMode: RenderMode.Prerender
  },
  // Las demás rutas dependen de la sesión guardada en cookies del navegador
  // (guards y roles), por eso se renderizan en el cliente
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];
