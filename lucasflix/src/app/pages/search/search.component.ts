import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieApiService } from '../../services/movie-api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  constructor (
    private service: MovieApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  result: any;
  resultsList: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 0;

  ngOnInit(): void {
    //Quando a rota carregar ou mudar
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      this.currentPage = parseInt(params['page'], 10) || 1;
      if (this.searchQuery) {
        this.searchMedia();
      }
    })
  }

  //Executar a pesquisa ao enviar o formulário
  onSearch(): void {
    this.currentPage = 1;
    this.resultsList = [];
    //Atualiza a URL com os novos parâmetros
    this.router.navigate([],  {
      relativeTo: this.route,
      queryParams: { query: this.searchQuery, page: this.currentPage },
      queryParamsHandling: 'merge'
    });
    this.searchMedia();
  }

  // Faz a chamada à API e tratar o resultado
  searchMedia(): void {
    const query = this.searchQuery.trim();
    if (!query) return;

    this.service.searchMedia(query, this.currentPage).subscribe(result => {
      this.result = result;
      this.totalPages = result.total_Pages;
      //console.log(result);

      if (this.currentPage === 1) {
        this.resultsList = result.results;
      } else {
        this.resultsList = [...this.resultsList, ...result.results];
      }
    })
  }

  //Aumenta a pagina e carrega mais resultados
  loadMore(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      //Atualiza a URL com os novos parâmetros
    this.router.navigate([],  {
      relativeTo: this.route,
      queryParams: { query: this.searchQuery, page: this.currentPage },
      queryParamsHandling: 'merge'
    });
    this.searchMedia();
    }
  }

}
