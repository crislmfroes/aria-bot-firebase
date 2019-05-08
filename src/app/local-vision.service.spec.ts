import { TestBed } from '@angular/core/testing';

import { LocalVisionService } from './local-vision.service';

describe('LocalVisionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalVisionService = TestBed.get(LocalVisionService);
    expect(service).toBeTruthy();
  });
});
