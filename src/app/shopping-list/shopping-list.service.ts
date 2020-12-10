import { tap } from 'rxjs/operators';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsUrl = '/api/ingredients';
  _ingredientChanged$ = new EventEmitter<Ingredient[]>();
  ingredients: Ingredient[] = [];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  get ingredientChanged$() {
    return this._ingredientChanged$;
  }
  getShoppingList() {
    this.http.get<Ingredient[]>(this.ingredientsUrl)
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
        this._ingredientChanged$.next(this.ingredients);
      });
    // return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    let maxId;
    if (this.ingredients.length > 0) {
      maxId = this.ingredients.map(ing => ing.id).reduce((a, b) => Math.max(a, b));
    } else {
      maxId = 0;
    }
    ingredient.id = maxId + 1;
    this.http.post<Ingredient>(this.ingredientsUrl, JSON.stringify(ingredient), this.httpOptions)
      .subscribe((ing: Ingredient) => {
        this.ingredients.push(ing);
        this._ingredientChanged$.next(this.ingredients);
      });
  }

  addIngredients(ingredients: Ingredient[]) {
    this.http.get<Ingredient[]>(this.ingredientsUrl)
      .subscribe((ings: Ingredient[]) => {
        this.ingredients = ings;
        ingredients.forEach(element => {
          let maxId;
          if (this.ingredients.length > 0) {
            maxId = this.ingredients.map(ing => ing.id).reduce((a, b) => Math.max(a, b));
          } else {
            maxId = 0;
          }
          element.id = maxId + 1;
          this.ingredients.push(element);
          this.http.post<Ingredient>(this.ingredientsUrl, JSON.stringify(element), this.httpOptions)
          .subscribe((ingredient: Ingredient) => {
            // this._ingredientChanged$.next(this.ingredients);
          });
        });
      });


    // this.ingredients.concat(ingredients);


    // this.ingredients.push(...ingredients);
    // this.ingredientChanged.emit(this.ingredients.slice());
  }

  deleteIngredient(id: number) {
    this.http.delete<Ingredient>(this.ingredientsUrl + '/' + id)
      .subscribe((ing: Ingredient) => {
        const index = this.ingredients.findIndex((data) => data.id === id);
        this.ingredients.splice(index, 1);
        this._ingredientChanged$.next(this.ingredients);
      });
  }
}
