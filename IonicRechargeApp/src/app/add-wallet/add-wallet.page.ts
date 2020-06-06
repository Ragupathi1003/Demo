import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.page.html',
  styleUrls: ['./add-wallet.page.scss'],
})
export class AddWalletPage implements OnInit {

  constructor(private router : Router,private modalController: ModalController,) { }

  ngOnInit() {
  }

  async backbtn() {
      const result: Date = new Date();
      await this.modalController.dismiss(result);
  }
}
