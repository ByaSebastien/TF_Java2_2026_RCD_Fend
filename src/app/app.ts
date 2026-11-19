import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './layout/header/footer/footer';
import { Header } from './layout/header/header/header';
import { Nav } from './layout/header/nav/nav';

@Component({
  imports: [RouterOutlet, Footer, Header, Nav],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('TF_Java_2026_RCD_Fend');
}
