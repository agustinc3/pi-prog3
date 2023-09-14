import React, {Component} from 'react'
import Movie from '../Pelicula/Pelicula'
import MiForm from '../Formulario/Form'
import './styles.css'
import { options } from "../../utils/constants"
import { Link } from "react-router-dom"


class MovieContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      movies:[],
      backup:[],
      topMovies: [],
      topBackup:[],
      page:1
    }
  }

  componentDidMount(){
    this.traerPeliculas()
    this.traerPeliculasTop()
  }


  traerPeliculas(){
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)          
    .then(resp => resp.json())
    .then(data => this.setState({
      movies: data.results.slice(0,5),
      backup: data.results,
    }))
    .catch(err => console.log(err))
  }
  
  traerPeliculasTop(){
    fetch( 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(resp => resp.json())
    .then(data => this.setState({
      topMovies: data.results.slice(0,5),
      topBackup: data.results,
    }))
    .catch(err => console.log(err))
  }
 
  

  filtrarPeliculas(nombre){
    let peliculasFiltradas = this.state.backup.filter((elm) => elm.title.toLowerCase().includes(nombre.toLowerCase()))
    this.setState({
      movies: peliculasFiltradas.slice(0,5),
    })
  }

  filtrarPeliculasTop(nombre){
    let peliculasFiltradas = this.state.topBackup.filter((elm) => elm.title.toLowerCase().includes(nombre.toLowerCase()))
    this.setState({
      topMovies: peliculasFiltradas.slice(0,5),
    })
  }

  render(){
    return (
      <>
      <Link to={`populares`} className='links'>
      <h2>Peliculas populares</h2>
      </Link>
      <MiForm filtrarPeliculas={(nombre) => this.filtrarPeliculasTop(nombre)} />

      <div className='movies-container'>
        {
          this.state.movies.length === 0 ?
          <img src='img/loading-cat.gif' alt=''/> :
          this.state.movies.map((Pelicula)=> <Movie id={Pelicula.id} nombre={Pelicula.title} imagen={Pelicula.poster_path} descripcion={Pelicula.overview}    />)
        }
      </ div>
      <Link to={`top-rated`} className='links'>
      <h2>Peliculas mejor rankeadas</h2>
      </Link>
      <MiForm filtrarPeliculas={(nombre) => this.filtrarPeliculasTop(nombre)} />
      <div className='movies-container'>
        {
          this.state.topMovies.length === 0 ?
          <img src='img/loading-cat.gif' alt=''/> :
          this.state.topMovies.map((Pelicula)=> <Movie id={Pelicula.id} nombre={Pelicula.title} imagen={Pelicula.poster_path} descripcion={Pelicula.overview}  />)
        }
      </ div>
      </>
    )
  }
}

export default MovieContainer

