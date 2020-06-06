import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddWalletPage } from '../add-wallet/add-wallet.page';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
items:any;
  constructor(public modalController: ModalController) { }

  ngOnInit() {
    localStorage.setItem('wallet','walletpage');
    this.items =[
      {"name":"John1",amount:100, "creditdebit":"Credit", "date":new Date()},
      {"name":"John2",amount:101, "creditdebit":"Debit", "date":new Date()},
      {"name":"John3",amount:102, "creditdebit":"Failed", "date":new Date()},
      {"name":"John4",amount:103, "creditdebit":"Debit", "date":new Date()}
    ]
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
