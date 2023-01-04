import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { Subscription } from "rxjs";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categories: Array<string> | undefined;
  sub!: Subscription;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.sub = this.storeService.getCategories().subscribe({
      next: (_categories) => {
        this.categories = _categories;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
