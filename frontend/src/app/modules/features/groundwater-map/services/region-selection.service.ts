import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RegionSelection } from '../interfaces/RegionSelection';

@Injectable({ providedIn: 'root' })
export class RegionSelectionService {
    constructor() {}

    private subject = new Subject<RegionSelection>()
    
    public selectRegion(regionSelection: RegionSelection) {
        this.subject.next(regionSelection)
    }

    public getSelectedRegion(): Observable<RegionSelection> {
        return this.subject.asObservable()
    }
}