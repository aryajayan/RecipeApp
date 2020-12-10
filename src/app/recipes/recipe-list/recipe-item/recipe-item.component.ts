import { Recipe } from './../../recipe.model';
import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.less']
})
export class RecipeItemComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('recipeElement') recipe: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }
  onSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
