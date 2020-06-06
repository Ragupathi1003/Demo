import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  PImage:any;

  slideOptions = {
    initialSlide : 0,
    speed: 400,
  };

  constructor(public alertController: AlertController,private router : Router) { }

  ngOnInit() {
    this.PImage =[
      {
        URL:'../../assets/slider/first.png'
      },
      {
        URL:'../../assets/slider/second.png'
      },
      {
        URL:'../../assets/slider/thired.png'
      },
      {
        URL:'../../assets/slider/four.png'
      }
    ]
  }
  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Yes confirm to log out!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }
}
