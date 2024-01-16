import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() text = '';
  @Input() bgColor = 'transparent';
  @Input() borderRadius = '0';
  @Input() fontSize = '';
  @Input() value = '';
  @Input() padding = '0.5rem 1rem';
  @Input() classBtn = '';
  constructor() {
   }

  ngOnInit() {
  }

}
