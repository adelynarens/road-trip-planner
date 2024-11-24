import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MapComponent } from './map.component';
import * as L from 'leaflet';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let mapDiv: HTMLElement;
  
  // Mock Leaflet map and its methods
  let mockMap: jasmine.SpyObj<L.Map>;
  let mockTileLayer: jasmine.SpyObj<L.TileLayer>;
  
  beforeEach(async () => {
    // Create spy objects for Leaflet classes
    mockMap = jasmine.createSpyObj('Map', ['setView', 'invalidateSize']);
    mockTileLayer = jasmine.createSpyObj('TileLayer', ['addTo']);
    
    // Mock the Leaflet map constructor
    spyOn(L, 'map').and.returnValue(mockMap);
    // Mock the tileLayer creation
    spyOn(L, 'tileLayer').and.returnValue(mockTileLayer);
    
    // Configure mockMap.setView to return the map instance for method chaining
    mockMap.setView.and.returnValue(mockMap);
    // Configure mockTileLayer.addTo to return the tileLayer instance for method chaining
    mockTileLayer.addTo.and.returnValue(mockTileLayer);

    await TestBed.configureTestingModule({
      imports: [ MapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    
    // Create and add map div to the fixture
    mapDiv = document.createElement('div');
    mapDiv.setAttribute('id', 'map');
    fixture.nativeElement.appendChild(mapDiv);
    
    fixture.detectChanges();
  });

  afterEach(() => {
    // Clean up the map
    if (mapDiv && mapDiv.parentNode) {
      mapDiv.parentNode.removeChild(mapDiv);
    }
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize map in ngOnInit', () => {
    component.ngOnInit();
    
    // Verify map was created
    expect(L.map).toHaveBeenCalledWith('map');
    expect(mockMap.setView).toHaveBeenCalledWith([40, -95], 4);
  });

  it('should call invalidateSize in ngAfterViewInit after timeout', fakeAsync(() => {
    (component as any).map = mockMap;
    component.ngAfterViewInit();
    
    tick(0);
    expect(mockMap.invalidateSize).toHaveBeenCalledTimes(1);
  }));


  it('should create tile layer with correct URL and attribution', () => {
    component.ngOnInit();

    // Verify tileLayer was created with correct URL and options
    expect(L.tileLayer).toHaveBeenCalledWith(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }
    );

    // Verify tile layer was added to the map
    expect(mockTileLayer.addTo).toHaveBeenCalledWith(mockMap);
  });
});
