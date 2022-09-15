import { Component, Injector, Input, OnInit } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { LabeledIconComponent } from '../icons/labeled-icon/labeled-icon.component';

@Component({
  selector: 'veera-ng-html-section',
  templateUrl: './html-section.component.html',
})
export class HtmlSectionComponent implements OnInit {
  @Input() html?: string;
  @Input() sanitize?: boolean;

  constructor(private readonly injector: Injector) {}

  ngOnInit() {
    this.createCustomElements([
      [LabeledIconComponent, 'veera-ng-labeled-icon'],
    ]);
  }

  private createCustomElements(elements: [any, string][]) {
    elements
      .filter(([, name]) => !customElements.get(name))
      .forEach(([component, name]) => {
        const element = createCustomElement(component, {
          injector: this.injector,
        });
        customElements.define(name, element);
      });
  }
}