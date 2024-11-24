import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  private centroid: L.LatLngTuple = [40, -95]; // Geographic center of the US

  constructor() { }

  /**
   * Initialize the map component
   */
  private initMap(): void {
    this.map = L.map('map').setView(
      this.centroid,
      4
    );

    // Set up the tile layer 
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map); // Add the tile layer to the map
  }

  ngOnInit(): void {
    this.initMap();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize(); // ensure proper resizing once map is visible
      }
    }, 0);
  }
}
