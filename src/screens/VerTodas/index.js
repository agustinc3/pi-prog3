import React, { Component } from 'react'
import {options} from '../../utils/constants'
import MovieContainer from '../../components/MovieContainer/MovieContainer'

export default class index extends Component {
    constructor(props){
        super(props)
        this.state={
            popular: [],
            backup: [],
            page: 1
        }
    }

    componentDidMount(){
        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        .then(resp => resp.json())
        .then(data => this.setState({
            popular: data.results,
            backup: data.results
        }))
        .catch(err => console.log(err))
    }

    traerMasPeliculas(){
        fetch(`'https://api.themoviedb.org/3/movie/popular?page=${this.state.page + 1}`, options)
        .then(resp => resp.json())
        .then(data => this.setState({
            popular: this.state.popular.concat(data.results),
            backup: this.state.backup.concat(data.results),
            page: this.state.page + 1
        }))
    }

    filtrarPeliculas(nombre){
        let peliculasFiltrados = this.state.backup.filter((elm) => elm.title.toLowerCase().includes(nombre.toLowerCase()))
        this.setState({
            popular: peliculasFiltrados
        })
    }
    

  render() {
    return (
        <>
            <h1>Todas las peliculas</h1>
            <button onClick={()=> this.traerMasPeliculas()}>Traer más películas</button>
            <MovieContainer peliculas = {this.state.popular}/>
            
        </>
    )
  }
}