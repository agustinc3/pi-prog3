import React, { Component } from 'react'
import FavPelicula from '../../components/FavContainer/FavContainer'
class index extends Component {

  constructor(props){
    super(props)
    this.state = {
      favoritos: []
    }
  }

  componentDidMount(){
    let storageFavs = localStorage.getItem('favoritos')

    if(storageFavs !== null){
      let favsParseados = JSON.parse(storageFavs)
      Promise.all(
        favsParseados.map( id => 
            fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=062d3ce7ea9819367da90034f22a527a&language=en-US`)
            .then( resp => resp.json())
          )
      )
      .then( data => this.setState({favoritos: data}))
      .catch(err => console.log(err))
    }
  }

  actualizarState(id){
    let stateActualizado = this.state.favoritos.filter(elm => elm.id !== id)
    this.setState({
      favoritos: stateActualizado
    })
  }

  render() {
    return (
      <div>
        <h1>Aqui van a ir los Favoritos</h1>
        <FavPelicula actualizarState ={(id)=> this.actualizarState(id)} personajes={this.state.favoritos} />
      </div>
    )
  }
}

export default index