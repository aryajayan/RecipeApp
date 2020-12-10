import { Ingredient } from './../../shared/ingredient.model';
import { RecipeService } from './../recipe.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.less']
})
export class RecipeEditComponent implements OnInit {
  @Input() recipeId: number;
  @Output() cancelEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter<Recipe>();
  recipe: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    console.log(this.recipeId);
    this.recipeService.getRecipeById(this.recipeId)
      .subscribe(recipe => this.recipe = recipe);
  }
  addIngredient() {
    this.recipe.ingredients.push({ id: -1, name: '', amount: 0 });
  }

  cancelClicked() {
    this.cancelEvent.emit();
  }
  saveClicked() {
    this.recipeService.saveEdittedRecipe(this.recipe)
      .subscribe((recipe: Recipe) => {
        console.log('editted recipe ' + recipe);
      });
    this.saveEvent.emit(this.recipe);
  }
  deleteIngredient(index: number) {
    this.recipe.ingredients.splice(index, 1);
  }
}
