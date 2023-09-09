import React, { Component } from 'react'

export default class index extends Component {
    constructor(props){
        super(props)
        this.state={
            dataPelicula:null,
            esFavorito: false,
            generos:[]
        }
    }

    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=062d3ce7ea9819367da90034f22a527a&language=en-US`)
        .then(res => res.json())
        .then( data => this.setState({
            dataPelicula: data,
            generos: data.genres
        }, ()=> {

          let storageFav =  localStorage.getItem('favoritos')
          let arrParseado = JSON.parse(storageFav)
  
          if(arrParseado !== null){
            let estaMiPersonaje = arrParseado.includes(this.state.dataPelicula.id)
  
            if(estaMiPersonaje){
              this.setState({
                esFavorito: true
              })
            }
          }

        }))
        .catch(err => console.log(err))


    }
    
    agregarAFavoritos(idPeli){
      let storageFav = localStorage.getItem('favoritos')
      if(storageFav === null){
        let arrIds = [idPeli]
        let arrStringificado = JSON.stringify(arrIds)
        localStorage.setItem('favoritos', arrStringificado)
      } else {
        let arrParseado = JSON.parse(storageFav)
        arrParseado.push(idPeli)
        let arrStringificado = JSON.stringify(arrParseado)
        localStorage.setItem('favoritos', arrStringificado)
      }

      this.setState({
        esFavorito: true
      })
    }

    sacarDeFavoritos(idPeli){
      let storageFav = localStorage.getItem('favoritos')
      let arrParseado = JSON.parse(storageFav)
      let favsFiltrados = arrParseado.filter((id) => id !== idPeli)
      let arrStringificado = JSON.stringify(favsFiltrados)
      localStorage.setItem('favoritos', arrStringificado)
      this.setState({
        esFavorito: false
      })
    }


  render() {
    return (
      <>
      {
        this.state.dataPelicula === null ?
        <img src='img/loading-cat.gif' alt=''/>
        :
        <div>
          <h1>{this.state.dataPelicula.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${this.state.dataPelicula.poster_path}`} alt=''/>
            <p>{this.state.dataPelicula.overview}</p>
            <p>Estreno: {this.state.dataPelicula.release_date}</p>
            <p>{this.state.dataPelicula.runtime} Minutos</p>
            <p>{parseInt(this.state.dataPelicula.vote_average) * 10 + '/100'}</p>
            
            <ul>{this.state.generos.map((genero, idx) => <li>{genero.name}</li>)}</ul>
            {
              this.state.esFavorito ?
              <button onClick={()=> this.sacarDeFavoritos(this.state.dataPelicula.id)}>
                Sacar de favoritos
              </button>  
              :
              <button onClick={()=> this.agregarAFavoritos(this.state.dataPelicula.id)}>
                Agregar a favoritos
              </button>
            }
        </div>}
      </>
    )
  }
}