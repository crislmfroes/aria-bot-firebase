import { Injectable } from '@angular/core';

import * as mobilenet from '@tensorflow-models/mobilenet';

@Injectable({
  providedIn: 'root'
})
export class LocalVisionService {
  model : mobilenet.MobileNet;
  constructor() {
    mobilenet.load().then(model => {
      this.model = model;
    });
  }

  getLabels(base64Image : String) {
    const img = new Image();
    img.src = 'data:image/png;base64,' + base64Image;
    return this.model.classify(img).then(results => {
      const response = {
        results: [
          {
            labelAnnotations: []
          }
        ]
      };
      for (const result of results) {
        response.results[0].labelAnnotations.push({
          desciption: result.className,
          score: result.probability
        });
      }
      return response;
    });
  }
}
