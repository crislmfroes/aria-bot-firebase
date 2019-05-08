import { TestBed } from '@angular/core/testing';

import { GoogleCloudVisionService } from './google-cloud-vision-service.service';

describe('GoogleCloudVisionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleCloudVisionService = TestBed.get(GoogleCloudVisionService);
    expect(service).toBeTruthy();
  });
});
