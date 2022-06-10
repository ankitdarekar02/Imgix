import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.scss']
})
export class ImageContainerComponent implements OnInit {
  @ViewChild('iframe')
  iframe!: ElementRef;
  @ViewChild('colorInputEl')
  colorInputEl!: ElementRef;
  colorInput: FormControl = new FormControl("00bba5");
  baseUrl: string = "";
  url: string = "";
  showModal: boolean = false;
  showPreview: boolean = false;
  imgText: string = "Check out my sweet wings";
  params: string = `?txt=${this.imgText}&blend=${this.colorInput.value}&w=640&txtclr=fff&txtalign=center%2Cmiddle&txtsize=48&bm=normal&balph=50`;
  imageList = [
    {'url': 'url(https://assets.imgix.net/examples/butterfly.jpg)', "title":"Butterfly", "src": "https://assets.imgix.net/examples/butterfly.jpg"},
    {'url': 'url(https://assets.imgix.net/unsplash/bridge.jpg)', "title":"Bridge", "src": "https://assets.imgix.net/unsplash/bridge.jpg"},
    {'url': 'url(https://assets.imgix.net/unsplash/pineneedles.jpg)', "title":"Pineneedles", "src": "https://assets.imgix.net/unsplash/pineneedles.jpg"},
    {'url': 'url(https://assets.imgix.net/unsplash/motorbike.jpg)', "title":"Motorbike", "src": "https://assets.imgix.net/unsplash/motorbike.jpg"},
    {'url': 'url(https://assets.imgix.net/unsplash/mountains.jpg)', "title":"Mountains", "src": "https://assets.imgix.net/unsplash/mountains.jpg"}
  ];
  constructor() { }

  openImage(src: string) {
    if(src) {
      this.showPreview = true;
      this.baseUrl = src;
      this.url = this.baseUrl + this.params;
      this.iframe.nativeElement.setAttribute('src', this.getNewUrl(this.url));
    }
  }

  getNewUrl(url: string) {
    const newUrl = new URL(url);
    newUrl.searchParams.set('txt', this.imgText);
    newUrl.searchParams.set('blend', this.colorInput.value);
    return newUrl;
  }

  onSubmit() {
    const newUrl = this.getNewUrl(this.url);
    this.url = newUrl.origin + newUrl.pathname + newUrl.search;
    this.iframe.nativeElement.setAttribute('src', this.url);
    this.closeModal();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  ngOnInit(): void {
  }

}
