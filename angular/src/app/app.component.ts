import { ReplaceableComponentsService } from '@abp/ng.core';
import { eThemeLeptonXComponents } from '@abp/ng.theme.lepton-x';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
    <abp-dynamic-layout></abp-dynamic-layout>
  `,
})
export class AppComponent implements OnInit {
  constructor(private replaceableComponents: ReplaceableComponentsService) {}

  ngOnInit(): void {
    this.replaceableComponents.add({
      component: FooterComponent,
      key: eThemeLeptonXComponents.Footer
    });
  }
}
