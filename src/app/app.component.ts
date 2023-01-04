import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Cart } from "./models/cart.model";
import { CartService } from "./services/cart.service";

@Component({
  selector: "app-root",
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <app-header [cart]="cart"></app-header>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent implements OnInit, OnDestroy {

  cart: Cart = { items: []}
  sub!: Subscription

  constructor( private cartService: CartService) {}

  ngOnInit(): void {
      this.sub = this.cartService.cart.subscribe({
        next: (cart) => {
          this.cart = cart
        },
        error: () => {}
      })

  }

  ngOnDestroy(): void {
      this.sub.unsubscribe()
  }
}
