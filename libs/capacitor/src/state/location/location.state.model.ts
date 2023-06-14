import { PermissionState } from '@capacitor/core';
import { Position } from '@capacitor/geolocation';

export interface StateLocationModel
{
    location        : Position;
    permissionState : PermissionState;
    error           : Error;
}
