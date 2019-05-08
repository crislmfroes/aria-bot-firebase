import { Component } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { LocalVisionService } from '../local-vision.service'
import { Observable } from 'rxjs';

import * as tf from '@tensorflow/tfjs';

tf.setBackend('cpu');

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items$ : AngularFireList<{}>;
  constructor(
    private camera : Camera,
    private vision : LocalVisionService,
    private db : AngularFireDatabase,
    private alert : AlertController
  ) {
    this.items$ = db.list('items');
  }

  saveResults(imageData : any, results : any) {
    this.items$.push({
      imageData: imageData,
      results: results
    });
  }

  showAlert(message) {
    let alert = this.alert.create({
      message: message,
      header: 'Erro',
      buttons: ['OK']
    }).then(a => {
      a.present();
    });
  }

  takePhoto() {
    const options : CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then(imageData => {
      this.vision.getLabels(imageData).then(results => {
        this.saveResults(imageData, results);
      }).catch(err => {
        this.showAlert(err);
      });
      /*this.vision.getLabels(imageData).subscribe(result => {
        this.saveResults(imageData, result.json().responses);
      }, err => {
        this.showAlert(err);
      })*/
    }).catch(err => {
      this.showAlert(err);
    });
  }
}
