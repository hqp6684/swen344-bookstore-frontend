

import {
    trigger,
    state,
    animate,
    style,
    transition
} from '@angular/animations';

export function routerTransition() {
    return slideToLeft();
}


function slideToLeft() {
    return trigger('routerTransition', [
        state('void', style({ position: 'absolute', width: '100%' })),
        state('*', style({ position: 'absolute', width: '100%' })),
        transition(':enter', [  // before 2.1: transition('void => *', [
            style({ transform: 'translate3d(100%, 10%, 0' }),
            animate('1s ease-in-out', style({ transform: 'translate3d(0, 0, 0)' }))
        ]),
        transition(':leave', [  // before 2.1: transition('* => void', [
            style({ transform: 'translateX(0%) scale(1)' }),
            animate('1s ease-in-out', style({
                transform: 'translateX(-100%) scale(0)',

            }))
        ])
    ]);

}