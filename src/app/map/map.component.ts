import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../map.service';

import { Store } from '@ngrx/store';
import * as fromActions from '../store/count.actions';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  @ViewChild('chap', {static: false}) mapInputRef: ElementRef;
  private mapContainer: ElementRef<HTMLElement>;

  constructor(private map: MapService, private store: Store<any>, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.map.getMapId()) {
        const id = this.map.getMapId();
        if (id === 1) {
          this.store.dispatch(new fromActions.LoadUsers());
        }
        if (id === 2) {
          this.store.dispatch(new fromActions.DragMarker());
        }
        if (id === 3) {
          this.store.dispatch(new fromActions.BuildMap());
        }
    } else {
     window.history.back();
    }

  }

  ngOnDestroy() {
    this.map.setMapId(undefined);
  }

}
