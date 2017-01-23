import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tmp = {id: 0};
  tmp2 = {id: 0};
  tmp3 = {id: 0};
  title = 'app works!';

  getJSONFormat(tmp) {
    return JSON.stringify(tmp);
  }
}
