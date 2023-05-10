import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, map, finalize, takeUntil } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { TranslateService } from '@ngx-translate/core';
import { Style } from '@capacitor/status-bar';
import { NavController } from '@ionic/angular';

import { StorageImage, StateStorage, TimestampFormat } from '@theory/firebase';
import { BaseComponent } from '@theory/core';
import { ActionDeviceStatusBarSet, StateDevice, ServiceCamera } from '@theory/capacitor';
import { StateInterest, ActionInterestSave, StateUserEvents, ActionUserEventsGetData, ActionInterestPatchMetadata, ActionCityStreamGet, InterestType, Translation, ActionAppLoadingShow, ActionAppLoadingHide, StateInterests } from '@firefly/shared';
import { Pages, ActionMobileToast } from '@firefly/mobile';
import { Event } from '@firefly/cloud';

@Component
({
    selector    : 'app-page-asset-interest',
    templateUrl : 'asset-interest.page.html',
    styleUrls   : ['./asset-interest.page.scss']
})

export class PageAssetInterest extends BaseComponent implements OnInit
{
    @Select(StateInterest.formGroup()) form$:         Observable<UntypedFormGroup>;
    @Select(StateInterest.isNew())     isNew$:        Observable<boolean>;
    @Select(StateInterest.canUpdate()) canUpdate$:    Observable<boolean>;
    @Select(StateInterest.events)      events$:       Observable<Event[]>;
    @Select(StateInterest.private)     private$:      Observable<boolean>;
    @Select(StateInterest.image)       image$:        Observable<string>;
    @Select(StateStorage.images)       images$:       Observable<Record<string, StorageImage>>;
    @Select(StateDevice.device)        device$:       Observable<boolean>;
    @Select(StateUserEvents.initialized()) stateUserInitialized$: Observable<boolean>;

    public Pages: any = Pages;
    public TimestampFormat: any = TimestampFormat;
    public images: Record<string, StorageImage> = {};

    constructor
    (
      private store:         Store,
      private navController: NavController,
      private camera:        ServiceCamera,
      private translate:     TranslateService
    )
    {
      super();
    }

    public ngOnInit(): void
    {
        this.images$.
        pipe(takeUntil(this.destroy$)).
        subscribe((images: Record<string, StorageImage>) =>
            this.images = images
        );
    }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({ style: Style.Light }));
    }

    public add(page: Pages.IconSelector | Pages.EventSelector)
    {
        //this.store.dispatch(new Navigate([ Pages.EventDetail, CoreEnum.IdNew ]));

/*
      if(page === Pages.IconSelector)
      {
        from(this.modal.create({
          component: PageIconSelector
        })).
        subscribe((modal: HTMLIonModalElement) => modal.present());
      }
      else{
        from(this.modal.create({
          component: PageEventSelector
        })).
        subscribe((modal: HTMLIonModalElement) => modal.present());
      }
*/
    }

    public save(): void
    {
        const interestType : InterestType = this.store.selectSnapshot(StateInterests.type);
        const isNew        : boolean      = this.store.selectSnapshot(StateInterest.isNew());

        this.translate.get
        ([
            Translation.PageInterestCreatedSuccess,
            Translation.PageInterestCreatedError,
            Translation.PageInterestUpdateSuccess,
            Translation.PageInterestUpdateError
        ]).
        pipe
        (
            switchMap((translations: Record<string, string>) =>
                this.store.dispatch
                ([
                    new ActionAppLoadingShow(),
                    new ActionInterestSave()
                ]).
                pipe
                (
                    map(() =>
                        isNew ?
                            translations[Translation.PageInterestCreatedSuccess] :
                            translations[Translation.PageInterestUpdateSuccess]
                    ),
                    catchError(() =>
                        isNew ?
                            of(translations[Translation.PageInterestCreatedError]) :
                            of(translations[Translation.PageInterestUpdateError])
                    ),
                    finalize(() =>
                        ([
                          this.store.dispatch(new ActionCityStreamGet()),
                          this.store.dispatch(new ActionAppLoadingHide())
                        ])
                    )
                )
            )
        ).
        subscribe((message: string) =>
        {
            this.store.dispatch(new ActionMobileToast(message));
            if(interestType === InterestType.Created)
              this.store.dispatch(new Navigate([Pages.Home, Pages.Stream]));
            else
              this.navController.back();
        });
    }

    public select(object: Event): void
    {
        this.store.dispatch(new ActionAppLoadingShow()).
        pipe
        (
            switchMap(() => this.store.dispatch(new ActionUserEventsGetData())),
            switchMap(() => this.store.dispatch([
              new ActionAppLoadingHide(),
              new Navigate([Pages.EventDetail, object.id])
            ]))
        ).subscribe();
    }

    public addEvent(): void{
        this.store.dispatch(new Navigate([Pages.EventSelector]));
    }

    public selectImage(): void
    {
        this.store.dispatch(new ActionAppLoadingShow()).
        pipe
        (
            switchMap(() =>
                this.camera.getPhoto()
            ),
            switchMap((image: string) =>
                this.store.dispatch(new ActionInterestPatchMetadata({ image }))
            ),
            finalize(() =>
                this.store.dispatch(new ActionAppLoadingHide())
            )
        ).
        subscribe();
    }
}
