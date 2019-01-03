import { Component } from '@angular/core';

@Component
({
    selector    : 'app-page-image-library',
    templateUrl : 'image-library.page.html',
    styleUrls   : ['./image-library.page.scss']
})

export class PageImageLibrary
{
    public urls: Array<string> =
    [
        'assets/images/temp-icon-1.png',
        'assets/images/temp-icon-2.png',
        'assets/images/temp-icon-3.png',
        'assets/images/temp-icon-4.png',
        'assets/images/temp-icon-5.png',
        'assets/images/temp-icon-6.png',
        'assets/images/temp-icon-7.png'
    ];

    public imageClicked(index: number): void
    {
        console.log(`icon ${index} clicked`);
    }
}
