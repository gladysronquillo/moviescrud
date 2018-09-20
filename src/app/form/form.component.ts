import {Component, OnInit} from '@angular/core';
import {Movie} from '../interfaces/movie';
import {MoviesService} from '../services/movies.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
    movie: Movie = {
        name: null,
        description: null,
        genre: null,
        year: null,
        duration: null
    };
    id: any;
    editing = false;
    movies: Movie[];

    constructor(private moviesServices: MoviesService, private activatedRoute: ActivatedRoute) {
        this.id = this.activatedRoute.snapshot.params['id'];
        if (this.id) {
            this.editing = true;
            this.moviesServices.get().subscribe((data: Movie[]) => {
                this.movies = data;
                this.movie = this.movies.find((m) => {
                    return m.id == this.id;
                });
                console.log(this.movie);
            }, (error) => {
                console.log(error);
            });
        } else {
            this.editing = false;
        }
        console.log(this.id);
    }

    ngOnInit() {
    }

    saveMovie() {
        if (this.editing) {
            this.moviesServices.put(this.movie).subscribe((data) => {
                    alert('Película actualizada');
                    console.log(data);
                }, (error) => {
                    console.log(error);
                    alert('ocurrió un error');
                }
            );
        } else {
            this.moviesServices.save(this.movie).subscribe((data) => {
                    alert('película guardada');
                    console.log(data);
                }, (error) => {
                    console.log(error);
                    alert('ocurrió un error');
                }
            );
        }
    }
}
