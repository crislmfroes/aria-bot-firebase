import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleCloudVisionService {

  constructor(public http : Http) { }

  getLabels(base64Image : String) {
    const body = {
      "requests": [
        {
          "image": {
            "content": base64Image
          },
          "features": [
            {
              "type": "LABEL_DETECTION"
            }
          ]
        }
      ]
    };
    return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.googleCloudVisionAPIKey, body);
  }
}
