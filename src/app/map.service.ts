import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../environments/environment';
import { geojson } from './props/map-data';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: mapboxgl.Map;
style = 'mapbox://styles/mapbox/streets-v11';
lat = 45.899977;
lng = 6.172652;
zoom = 12;
  mapId: any;

  constructor(private http: HttpClient) {
    mapboxgl.accessToken = 'pk.eyJ1IjoidGVqYTkwIiwiYSI6ImNreDdsbW81eTE5MWIycG81MHAxNTZvaW8ifQ.ZtBi2nOLQySE5Ovz_Eb2JQ';
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=SoL71Zyf7SmLrVYWC7fQ',
      center: [3.58926, 23.49875],
      zoom: 0.66
    });
    this.map.addControl(new mapboxgl.NavigationControl());

    for (const feature of geojson.features) {
        // this.map.on('click', (e)=> {
        //   const ft = this.map.queryRenderedFeatures(e.point, {
        //     layers: ['chicago-parks']
        //   });
        // });
        // make a marker for each feature and add to the map
        new mapboxgl.Marker({ color: 'black', rotation: 45 }).setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
            )
        ).addTo(this.map);
      }
  }


  dragMarker() {
    const coordinates = document.getElementById('coordinates');
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 2
      });
    const marker = new mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([0, 0])
      .addTo(map);

    const onDragEnd = () => {
        const lngLat = marker.getLngLat();
        coordinates.style.display = 'block';
        coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
        };

    marker.on('dragend', onDragEnd);
  }

  searchGeo() {
   this.http.get('https://api.maptiler.com/geocoding/rajahmundry.json?key=Kvh2Jcl06B9WMxt5vf82').subscribe((response: any) => {
      const feature = response.features[0];
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=SoL71Zyf7SmLrVYWC7fQ',
        center: feature.center,
        zoom: 10
        });
      const marker =  new mapboxgl.Marker({draggable: true}).setLngLat(feature.center).
        setLngLat(feature.center)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<p>${feature.text}</p>`
            )
        ).addTo(map);

      const onDragEnd = () => {
          const lngLat = marker.getLngLat();
          console.log(response);
          const url =
          // tslint:disable-next-line: max-line-length
          this.http.get(`https://api.maptiler.com/geocoding/${lngLat.lng},${lngLat.lat}.json?key=Kvh2Jcl06B9WMxt5vf82`).subscribe((res: any) => {
            const ft = res.features[0];
            marker.setPopup(
              new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<p>${ft.text}</p>`
            )
            ).addTo(map);
          });
          };

      marker.on('dragend', onDragEnd);
    });
  }


  public setMapId(id) {
    this.mapId = id;
  }

  public getMapId() {
    return this.mapId;
  }
}


 // coordinates.style.display = 'block';
          // coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
