import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated$ = new BehaviorSubject(false);
  connector: WalletConnect;

  constructor(private router: Router) {
    // this.initiateConnection();

    // Create a connector
    this.connector = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org', // Required
      qrcodeModal: QRCodeModal,
    });

    if (this.connector && this.connector.connected) {
      this.attachEventListeners();
      this.isAuthenticated$.next(true);
      this.router.navigate(['']);
    } else {
      this.isAuthenticated$.next(false);
    }
  }

  attachEventListeners() {
    // Subscribe to connection events
    this.connector.on('connect', (error, payload) => {
      if (error) {
        throw error;
      }

      console.log('Successfully connected!:', payload);

      this.isAuthenticated$.next(true);
      this.router.navigate(['']);

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
    });

    this.connector.on('session_update', (error, payload) => {
      if (error) {
        throw error;
      }

      console.log('Session Updated!:', payload);

      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];
    });

    this.connector.on('disconnect', (error, payload) => {
      if (error) {
        throw error;
      }

      console.log('Successfully Disconnected!:', payload);

      this.isAuthenticated$.next(false);
      this.router.navigate(['login']);

      // Delete connector
    });
  }

  initiateConnection() {
    // Create a connector
    this.connector = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org', // Required
      qrcodeModal: QRCodeModal,
    });

    this.attachEventListeners();

    // this.isAuthenticated$.next(this.connector.connected);

    // if (this.connector.connected) {
    //   this.connector.killSession();
    // }

    // Check if connection is already established
    if (!this.connector.connected) {
      // create new session
      this.connector.createSession();
    } else {
      console.log(this.connector.session);
      this.router.navigate(['']);
    }
  }

  login() {
    // this.isAuthenticated$.next(true);
    // this.router.navigate(['']);

    // // Create a connector
    // this.connector = new WalletConnect({
    //   bridge: 'https://bridge.walletconnect.org', // Required
    //   qrcodeModal: QRCodeModal,
    // });

    // // Check if connection is already established
    // if (!this.connector.connected) {
    //   // create new session
    //   this.connector.createSession();
    // }

    this.initiateConnection();
    // this.attachEventListeners();
  }

  logOut() {
    // this.isAuthenticated$.next(false);
    // this.router.navigate(['login']);

    this.connector.killSession();
  }

  showCurrentSessionInfo() {
    console.log(this.connector.session);
    return this.connector.session;
  }
}
