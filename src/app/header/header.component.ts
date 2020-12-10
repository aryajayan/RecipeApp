import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  selectedFeature = 'recipe';
  @Output() featureSelected = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  onSelectFeature(feature: string) {
    this.selectedFeature = feature;
    this.featureSelected.emit(feature);
  }

}
