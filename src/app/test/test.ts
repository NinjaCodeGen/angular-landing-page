// import {
//   Component,
//   trigger,
//   state,
//   style,
//   transition,
//   animate,
//   keyframes
// } from '@angular/core';

// @Component({
//   selector: 'test-app',
//   template: `<section id="test-app">
//     <div class="row">
//         <div class="columns">
//             <button (click)="toggleMove()">Press me for animation</button>
//         </div>
//         <div class="columns">
//             <div id="content" [@focusPanel]='state' [@movePanel]='state'>Look at me animate</div>
//         </div>
//     </div></section>
//     `,
//   styles: [`
//         button { font-size:1.8em; }
//         #content { padding:30px; background:#eeeeee; }
//     `],
//   animations: [
//     trigger('focusPanel', [
//       state('inactive', style({
//         transform: 'scale(1)',
//         backgroundColor: '#eee'
//       })),
//       state('active', style({
//         transform: 'scale(1.1)',
//         backgroundColor: '#cfd8dc'
//       })),
//       transition('inactive => active', animate('100ms ease-in')),
//       transition('active => inactive', animate('100ms ease-out'))
//     ]),

//     trigger('movePanel', [

//       transition('void => *', [
//         animate(600, keyframes([
//           style({ opacity: 0, transform: 'translateY(-200px)', offset: 0 }),
//           style({ opacity: 1, transform: 'translateY(25px)', offset: .75 }),
//           style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
//         ]))
//       ])
//     ])
//   ]
// })
// export class TestComponent {
//   state: string = 'inactive';
//   toggleMove() {
//     this.state = (this.state === 'inactive' ? 'active' : 'inactive');
//   }
// }