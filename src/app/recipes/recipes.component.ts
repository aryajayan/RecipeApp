import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.less']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  allowEdit = false;
  editedRecipe: Recipe = this.selectedRecipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.recipeSelected
      .subscribe(
        (recipe: Recipe) => this.selectedRecipe = recipe);
  }
  editClickedParent() {
    this.allowEdit = true;
  }
  cancelClickedOnEdit() {
    this.allowEdit = false;
  }
  onSaveEdittedRecipe(newRecipe: Recipe) {
    let newSelected = null;
    this.recipeService.getRecipeById(newRecipe.id)
      .subscribe(recipe => {
        newSelected = this.selectedRecipe = recipe;
        if (newSelected !== null) {
          this.allowEdit = false;
        }
      });

  }

}
