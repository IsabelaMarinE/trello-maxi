import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Output() clickButton: EventEmitter<any> = new EventEmitter();

  @Input() title = '';
  @Input() description = '';
  @Input() id = '';
  @Input() list_Task?: any;

  constructor() {
   }

  ngOnInit() {
  }

  clickOnButton() {
    if (this.id) {
      this.clickButton.emit(this.id);
    }
  }

}
