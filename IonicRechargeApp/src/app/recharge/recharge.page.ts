import { Component, OnInit } from '@angular/core';
import { AddWalletPage } from '../add-wallet/add-wallet.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.page.html',
  styleUrls: ['./recharge.page.scss'],
})
export class RechargePage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    localStorage.setItem('wallet','registerpage')
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddWalletPage
    });
    modal.onDidDismiss().then((detail: any) => {
      if (detail !== null) {
        console.log('The result:', detail.data);
      }
   });
    return await modal.present();
  }
}
