import { NgModule, ErrorHandler } from "@angular/core";
import { CommonModule } from "@angular/common";

// Shared Modules
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatOptionModule } from "@angular/material/core";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Shared Components/Services
import { ProgressBarComponent } from "./components/progress-bar/progress-bar.component";

// Shared Other
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { PhoneTransformPipe } from "./helpers/phone-transform.pipe";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        ProgressBarComponent,
        LoadingSpinnerComponent,
        PhoneTransformPipe,
    ],
    imports: [
        NgxDropzoneModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        NgxSkeletonLoaderModule,
        MatOptionModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        NgbModule,
        FormsModule,
        CommonModule
    ],
    exports: [
        ProgressBarComponent,
        CommonModule,
        NgxDropzoneModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        NgxSkeletonLoaderModule,
        MatOptionModule,
        MatIconModule,
        MatButtonModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
        LoadingSpinnerComponent,
        RouterModule,
        MatAutocompleteModule,
        PhoneTransformPipe,
    ]
})
export class SharedModule { }