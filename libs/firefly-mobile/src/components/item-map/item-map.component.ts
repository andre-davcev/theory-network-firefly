import { Component, Input, OnInit } from '@angular/core';
import { Place } from '@firefly/cloud';
import { Color, DirectiveLoadingOptions } from '@firefly/shared';
import { Select } from '@ngxs/store';
import { StateLocation } from '@theory/capacitor';
import { BaseComponent } from '@theory/core';
import { MapMovingMethod } from '@theory/mapbox';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ff-item-map',
  templateUrl: './item-map.component.html',
  styleUrls: ['./item-map.component.scss']
})
export class ComponentItemMap extends BaseComponent implements OnInit {
  @Input() title!: string;
  @Input() interactive: boolean = false;
  @Input() place!: Place;

  @Select(StateLocation.isValid) locationValid$!: Observable<boolean>;

  public Color: any = Color;
  public MapMovingMethod: any = MapMovingMethod;

  public loading: DirectiveLoadingOptions = {
    loading: true,
    color: Color.Dark,
    colorBackground: Color.Map
  };

  constructor() {
    super();
  }

  public ngOnInit(): void {
    this.locationValid$
      .pipe(
        takeUntil(this.destroy$),
        filter((valid: boolean) => valid)
      )
      .subscribe(() => (this.loading = { ...this.loading, loading: false }));
  }
}
