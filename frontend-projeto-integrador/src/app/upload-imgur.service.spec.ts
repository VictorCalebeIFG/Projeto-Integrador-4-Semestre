import { TestBed } from '@angular/core/testing';

import { UploadImgurService } from './upload-imgur.service';

describe('UploadImgurService', () => {
  let service: UploadImgurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadImgurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
