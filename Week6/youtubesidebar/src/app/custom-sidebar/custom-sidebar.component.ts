import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

export type menuItem={
  icon:string,
  label:string,
  route:string
}
@Component({
  selector: 'app-custom-sidebar',
  standalone: true,
  imports: [MatListModule,MatIconModule,CommonModule,RouterLink],
  templateUrl: './custom-sidebar.component.html',
  styleUrl: './custom-sidebar.component.css'
})

export class CustomSidebarComponent {
menuitems=signal<menuItem[]>([
  {
    icon:'dashboard',
    label:'Dashboard',
    route:'dashboard'
  },
  {
    icon:'video_library',
    label:'Content',
    route:'content'
  },
  {
    icon:'analytics',
    label:'Analytics',
    route:'analytics'
  },
  {
    icon:'comment',
    label:'Comments',
    route:'comments'
  }
])
}
