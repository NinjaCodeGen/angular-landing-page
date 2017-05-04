import { Component } from "@angular/core";
import { PageScrollConfig } from 'ng2-page-scroll';

@Component({
  selector: 'ncg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'NinjaCodeGen!';

  constructor() {
    PageScrollConfig.defaultScrollOffset = 30;
  }
}

