import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ImageInfo} from "../image-info";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'tc-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {
  @Input() accept?: string | undefined = 'image/png, image/jpeg, image/jpg';
  @Input() output: 'base64' | 'file' | undefined = 'base64';
  @Input() type: 'multiple' | 'single' | undefined = 'single';
  @Output() imageAdded = new EventEmitter<ImageInfo[]>();

  @ViewChild('imageItem', { static: false }) imageItem!: ElementRef;
  @Input() files: Array<ImageInfo> = [];

  constructor(private sanitize: DomSanitizer) { }

  ngOnInit(): void {
  }

  selectFiles(file: any) {
    if (this.type === 'single') {
      this.singleFileSelected(file);
    } else {
      this.multipleFileSelected(file)
    }
  }

  singleFileSelected(file: any): void {
    this.files = [];
    if (file.target.files && file.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        if (this.output === 'file') {
          this.files = [...this.files, {
            file: file.target.files[0],
            type: file.target.files[0].type,
            ext: String(file.target.files[0].type).split('/')[1],
            name: file.target.files[0].name,
            safeFile: this.sanitize.bypassSecurityTrustResourceUrl(file.target.files[0])
          }];
          this.imageAdded.emit(this.files);
        } else {
          this.files = [...this.files, {
            file: event.target.result,
            type: file.target.files[0].type,
            ext: String(file.target.files[0].type).split('/')[1],
            name: file.target.files[0].name,
            safeFile: this.sanitize.bypassSecurityTrustResourceUrl(file.target.files[0])
          }];
          this.imageAdded.emit(this.files);
        }
      };
      reader.readAsDataURL(file.target.files[0]);
    } else {
      this.imageAdded.emit(this.files);
    }
  }

  multipleFileSelected(file: any): void {
    for (const doc of file.target.files) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        if (this.output === 'file') {
          this.files.push({
            type: doc.type,
            ext: String(doc.type).split('/')[1],
            name: doc.name,
            file: doc,
            safeFile: this.sanitize.bypassSecurityTrustResourceUrl(doc)
          });
        } else {
          this.files.push({
            type: doc.type,
            ext: String(doc.type).split('/')[1],
            name: doc.name,
            file: event.target.result,
            safeFile: this.sanitize.bypassSecurityTrustResourceUrl(event.target.result)
          });
        }
      };
      reader.readAsDataURL(doc);
    }

    this.imageAdded.emit(this.files);
  }

  clearImages() {
    this.files = [];
    this.imageItem.nativeElement.value = '';
    this.imageAdded.emit(this.files);
  }

  clearImage(index: number) {
    this.files.splice(index, 1);
    if (this.files.length === 0) {
      this.imageItem.nativeElement.value = '';
    }
    this.imageAdded.emit(this.files);
  }
}
