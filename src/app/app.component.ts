import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
// Importamos Angular Material para la barra, botones e íconos
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  // 🔥 Declaramos que este componente es standalone
  standalone: true,
   // 🧩 Módulos que este componente necesita para funcionar (como si fueran imports de un módulo normal)
  imports: [
    RouterModule,
    RouterOutlet,       // Nos permite mostrar las rutas (esencial)
    MatToolbarModule, // <-- Módulo de la barra de navegación
    MatButtonModule,   // <-- Para botones de Material
    MatIconModule      // <-- Para íconos
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gestor de Tareas';
}
