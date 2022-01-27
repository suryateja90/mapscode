import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MapService } from '../map.service';
import { usecases } from '../props/map-data';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {

  cases = usecases;

  constructor(private router: Router, private mapService: MapService) { }

  ngOnInit() {
  }

  navMaps(id) {
    this.mapService.setMapId(id);
    this.router.navigate(['/map']);
  }

}
