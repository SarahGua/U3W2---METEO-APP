import { Component } from "react";
import { Button, Form } from "react-bootstrap";
import CardCity from "./CardCity";

class SearchCity extends Component {

    state ={
        cityLon : null,
        cityLat: null,
        cityName: null,
    }

    getLatAndLon = () => {
        fetch('http://api.openweathermap.org/geo/1.0/direct?q=Milano&limit=10&appid=4f38068d7e7c5d27e830b68d19fbb064')
        .then((res) => {
            if(res.ok){
                return res.json()
            } else {
                throw new Error ('Errore nel recupero della città')
            }
        })
        .then((data) => {
            console.log('recupero dati', data[0])
            console.log('recupero dati', data[0].lat)
            console.log('recupero dati', data[0].lon)
            this.setState({
                cityLon: data[0].lon,
                cityLat: data[0].lat,
            })
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.cityLat}&lon=${this.state.cityLon}&appid=4f38068d7e7c5d27e830b68d19fbb064`)
            .then((res) => {
                if(res.ok){
                    return res.json()
                } else {
                    throw new Error ('Errore nel recupero delle previsioni')
                }
            })
            .then((city) => {
                console.log(city)
                this.setState({
                    cityName: city
                })
            })
            .catch((err) => {console.log('errore', err)})
        })
        .catch((err) => {console.log('errore', err)})    
    }

    componentDidMount(){
        this.getLatAndLon()
        
    }

    render () {
        return (
            <>
                <Form className="d-flex flex-column align-items-center mb-3">
                    <Form.Group className="mt-3 mb-1 d-flex flex-column align-items-center">
                        <Form.Label className="d-flex justify-content-center">Inserisci la città</Form.Label>
                        <Form.Control type="text" placeholder="*Roma*" className="w-100"/>
                    </Form.Group>
                    <Button variant="info">CERCA</Button>
                </Form>
                <CardCity />
            </>
        )
    }
}

export default SearchCity