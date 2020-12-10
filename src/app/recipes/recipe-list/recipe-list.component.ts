import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.less']
})
export class RecipeListComponent implements OnInit {
  // recipes = this.recipeService.getRecipes();
  recipes: Recipe[];
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getAllRecipes();
    this.recipeService.recipesChange$
      .subscribe(() =>
        this.getAllRecipes()
        );
  }

  private getAllRecipes() {
    this.recipeService.getRecipes()
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
        console.log(recipes);
      }
      );
  }
}
