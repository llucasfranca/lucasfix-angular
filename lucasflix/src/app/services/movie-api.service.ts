import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://api.themoviedb.org/3';
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2M3NGZiZDgxY2FlODcxNjY0YWE0MmMwOWI4NDNlZCIsIm5iZiI6MTc0NjQ5MTI1Mi4zNiwic3ViIjoiNjgxOTU3NzQyM2I3M2E0MDc0OTEzYmMyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.DhmkAAXQko-T-RTJPebejpkiOstIvF05ydPlR2XaYMU'
    }
  };

  // Dados para o Banner - Midias em destaque da semana
  bannerApiData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/trending/all/week?language=pt-br`, this.options);
  }

  //pFilmes em destaques do dia 
  trendingMovieApiData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/trending/movie/day?language=pt-br`, this.options);
  }

  //Series em destaque do dia
  trendingSerieApiData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/trending/tv/day?language=pt-br`, this.options);
  }

  //Filmes de acão Popularidades
  popularActionMovieApiData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/discover/movie?language=pt-br-&with_genere=28&sort_by=popularity.desc`, this.options);
  }

}
