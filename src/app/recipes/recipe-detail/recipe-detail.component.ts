import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.less']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() editClicked = new EventEmitter();

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }
  addIngredientToShopping() {
    this.recipeService.addRecipeToShopping(this.recipe.ingredients);
  }
  editRecipeClicked() {
    this.editClicked.emit();
  }
}
