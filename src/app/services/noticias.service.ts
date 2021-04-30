import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';

const apiKey = environment.apikey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key':apiKey,
})


@Injectable({
  providedIn: 'root',
})
export class NoticiasService {

  headlinesPage = 0;

  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) {}

  private ejecutarQuery<T>(query: string){
    query = apiUrl + query;
    return this.http.get<T>(query, {headers});
  }

  getTopHeadlines() {
    this.headlinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
  }

    /*
    return this.http.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=ddf92aa700b14f84af63073348155835`
    );
    */

  getTopHeadlinesCargoria(categoria:string){

    if (this.categoriaActual === categoria) {
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
  }

  /*
  return this.http.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=ddf92aa700b14f84af63073348155835`);
  */

}
