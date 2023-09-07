import React, {Component} from 'react'
import Movie from '../Pelicula/Pelicula'
import MiForm from '../Formulario/Form'
import './styles.css'
import { options } from "../../utils/constants"

class MovieContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      movies: [],
      backup:[],
      page:1
    }
  }

  componentDidMount(){
    this.traerPeliculas()
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
  

  filtrarPeliculas(nombre){
    let peliculasFiltradas = this.state.backup.filter((elm) => elm.name.toLowerCase().includes(nombre.toLowerCase()))
    this.setState({
      movies: peliculasFiltradas,
    })
  }


  render(){
    return (
      <>
      <MiForm filtrarPeliculas={(nombre) => this.filtrarPeliculas(nombre)} />
      <h2>Peliculas populares</h2>
      <div className='movies-container'>
        {
          this.state.movies.length === 0 ?
          <h1>Trayendo Peliculas</h1> :
          this.state.movies.map((Pelicula, idx)=> <Movie key={Pelicula+idx} id={Pelicula.id} nombre={Pelicula.title+idx} imagen={Pelicula.poster_path} descripcion={Pelicula.overview}   />)
        }
      </ div>
      </>
    )
  }
}

export default MovieContainer
