import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeUrl = '/api/recipes';
  recipeSelected = new EventEmitter<Recipe>();
  _recipesChange$ = new Subject<Recipe[]>();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private slService: ShoppingListService,
              private http: HttpClient) { }

  get recipesChange$() {
    return this._recipesChange$;
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipeUrl);
    // return this.recipes.slice();
  }

  addRecipeToShopping(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipeById(id: number): Observable<Recipe> {
    const url = this.recipeUrl + '/' + id;
    return this.http.get<Recipe>(url);
    // const selected = this.recipes.find(recipe => recipe.id === id);
    // return { ...selected };
  }

  saveEdittedRecipe(newRecipe: Recipe): Observable<any> {
    return this.http.put(this.recipeUrl + '/' + newRecipe.id,
      JSON.stringify(newRecipe),
      this.httpOptions).pipe(
        tap(() => this._recipesChange$.next())
      );

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
