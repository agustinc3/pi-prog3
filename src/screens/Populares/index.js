import React, { Component } from 'react'
import { options } from '../../utils/constants'
// import MovieContainer from '../../components/MovieContainer/MovieContainer'
import Movie from '../../components/Pelicula/Pelicula'
import MiForm from '../../components/Formulario/Form'


export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            popular: [],
            top: [],
            backup: [],
            backupTop: [],
            page: 1,
            categoria: this.props.match.params.cat || 'popular',
            categoriaTop: this.props.match.params.cat || 'top_rated'
           
           

        }
    }

    componentDidMount() {
        this.traerPeliculas()
       
        
    }

    traerPeliculas(){
        fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${this.state.page}`, options)
            .then(resp => resp.json())
            .then(data => this.setState({
                popular: data.results,
                backup: data.results
            }))
            .catch(err => console.log(err))
    }
    

    traerMasPeliculas() {
        fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${this.state.page+ 1}`, options)
            .then(resp => resp.json())
            .then(data => this.setState({
                popular: this.state.popular.concat(data.results),
                backup: this.state.backup.concat(data.results),
                page: this.state.page + 1
            }))
    }
    

    filtrarPeliculas(nombre) {
        let peliculasFiltrados = this.state.backup.filter((elm) => elm.title.toLowerCase().includes(nombre.toLowerCase()))
        this.setState({
            popular: peliculasFiltrados
        })
    }
    

    render() {
        return (
            <>
                <h2>Todas las peliculas populares</h2>
                <MiForm filtrarPeliculas={(nombre) => this.filtrarPeliculas(nombre)} />

                {
                    this.state.popular.length === 0 ?
                        <img src='img/loading-cat.gif' alt='' /> :
                        <div className='movies-container'>{this.state.popular.map((Pelicula) => <Movie id={Pelicula.id} nombre={Pelicula.title} imagen={Pelicula.poster_path} descripcion={Pelicula.overview} />)}</div>
                }
                <button onClick={() => this.traerMasPeliculas()}>Traer más películas</button>
                <br></br>
            
            </>
        )
    }
}