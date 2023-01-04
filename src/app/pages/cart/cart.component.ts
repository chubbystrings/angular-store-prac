import { Component, OnDestroy, OnInit } from "@angular/core";
import { map, Subscription } from "rxjs";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styles: [],
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart = {
    items: [
      {
        product: "https://via.placeholder.com/150",
        price: 150,
        name: "sneakers",
        quantity: 1,
        id: 1,
      },
      {
        product: "https://via.placeholder.com/150",
        price: 150,
        name: "sneakers",
        quantity: 3,
        id: 2,
      },
    ],
  };
  sub!: Subscription
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor( private cartService: CartService) {}

  ngOnInit(): void {
    this.sub = this.cartService.cart.subscribe({
      next: (cart) => {
        this.cart = cart
        this.dataSource = this.cart.items;
      },
      error: () => {}
    })
    
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items)
  }

  onClearCard(): void {
    this.cartService.clearCart()
  }

  onRemoveItemFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item)
  }

  onIncreaseQuantity(item: CartItem): void {
    this.cartService.addToCart(item)
  }

  onDecreaseQuantity(item: CartItem): void {
    this.cartService.decreaseItemQuantity(item)
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe()
  }

}
