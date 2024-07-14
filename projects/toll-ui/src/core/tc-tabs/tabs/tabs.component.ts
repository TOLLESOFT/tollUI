import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'tc-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
    @Input() type: 'primary' | 'success' | 'danger' | 'warning' | 'info' = 'danger';
    @Input() tabItems: any[] = [];
    @Input() selectedIndex: number = 0;
    @Output() onSelectedIndex = new EventEmitter();

    onSelected(event: any) {
        this.selectedIndex = event;
        this.onSelectedIndex.emit(event);
    }
}
