import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";
import { StoreService } from "src/app/services/store.service";

const ROWS_HEIGHT: { [key: number]: number } = {
  1: 400,
  3: 335,
  4: 350,
};

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = "desc";
  count ="12";
  productSubscription: Subscription | undefined;
  isLoading = false

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    console.log('heelooooo')
      this.getProducts()
  }

  getProducts() {
    this.isLoading = true
    this.productSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category)
    .subscribe({
      next: (_products) => {
        console.log(_products)
        this.products = _products
        this.isLoading = false
      },
      error: (err) => {
        console.log(err)
        this.isLoading = false
      }
    })
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts()
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      name: product.title,
      product: product.image,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  onSortChange(sort: string) {
    this.sort = sort
    this.getProducts()
  }

  onItemCountsChange(count: number){
    this.count = count.toString()
    this.getProducts()
  }

  ngOnDestroy(): void {
      if (this.productSubscription) {
        this.productSubscription?.unsubscribe()
      }
  }
}
