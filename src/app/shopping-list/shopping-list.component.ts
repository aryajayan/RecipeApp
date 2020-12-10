import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.less']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];
  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingService.getShoppingList();
    this.shoppingService.ingredientChanged$
      .subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
  }
  deleteIngredient(index: number, id: number) {
    this.shoppingService.deleteIngredient(id);
  }
  getIngredients() {

  }
}
