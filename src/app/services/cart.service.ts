import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { Cart, CartItem } from "../models/cart.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    const index = this.cart.value.items.findIndex(
      (_item) => item.id === _item.id
    );

    if (index >= 0) {
      this.cart.value.items[index].quantity += 1;
    } else {
      this.cart.value.items.push(item);
    }

    this.cart.next({ items: this.cart.value.items.slice() });
    console.log(this.cart.value.items);
    this._snackBar.open("1 item added", "Ok", {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "center",
    });
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((a, b) => a + b, 0);
  }

  clearCart() {
    this.cart.value.items = [];
    this.cart.next({ items: this.cart.value.items.slice() });
    this._snackBar.open("cart cleared", "Ok", {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "center",
    });
  }

  removeFromCart(item: CartItem) {
    this.cart.value.items = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );
    this.cart.next({ items: this.cart.value.items.slice() });
    this._snackBar.open("1 item removed", "Ok", {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "center",
    });
  }

  decreaseItemQuantity(item: CartItem): void {
    const index = this.cart.value.items.findIndex(
      (_item) => item.id === _item.id
    );

    if (index >= 0) {
      if (this.cart.value.items[index].quantity === 1) {
        this.removeFromCart(item);
      } else {
        this.cart.value.items[index].quantity -= 1;
        this.cart.next({ items: this.cart.value.items.slice() });
        this._snackBar.open("1 item removed", "Ok", {
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "center",
        });
      }
    }
  }
}
