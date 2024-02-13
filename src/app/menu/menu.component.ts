import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Input() isOpen: boolean = false;
  @Output() menuToggled: EventEmitter<void> = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.menuToggled.emit();
  }
  enviarReferencia() {
    this.isOpen = false;
    this.menuToggled.emit();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInsideMenu = this.elementRef.nativeElement.contains(event.target as Node);
    const clickedOnMenuIcon = (event.target as HTMLElement).closest('.menu-icon');
    if (!clickedInsideMenu && !clickedOnMenuIcon && this.isOpen) {
      this.isOpen = false;
      this.menuToggled.emit();
    }
  }
}
