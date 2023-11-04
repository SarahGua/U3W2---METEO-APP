import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap"

const Search = () => {

    const [lat, setLat] = useState([])
    const [long, setLong] = useState([])
    const [meteo, setmeteo] = useState([])
    const [city, setCity] = useState('')

    const getLatAndLon = () => {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=4f38068d7e7c5d27e830b68d19fbb064`)
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
            setLat (data[0].lat)
            setLong (data[0].lon)
        })
        .catch((err) => {console.log('errore', err)})    
    }

    const getCityWeather = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=4f38068d7e7c5d27e830b68d19fbb064`)
        .then((res) => {
            if(res.ok){
                return res.json()
            } else {
                throw new Error ('errore nel recupero meteo json')
            }
        })
        .then((meteo) => {
            console.log(meteo)
            setmeteo (meteo)
        })
        .catch((err) => console.log('errore nel recupero del meteo', err))
    }

    // useEffect(() => {
    //     getLatAndLon()
    //     getCityWeather()
    // }, [lat, long])

    return (
        <>
            < Container>
                <Row className="justify-content-center mt-5">
                    <Col xs={12} sm={6} className="mb-5">
                        <h2 className="text-center">Check the weather forecast</h2>
                        <Form className="d-flex justify-content-between mb-3" onSubmit={getLatAndLon}>
                            <Form.Group>
                                <Form.Control type="text" placeholder="*Rome*" value={city} onChange={(e) => {
                                    setCity (e.target.value)
                                }}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Check!
                            </Button>
                        </Form>
                        <Card >
                            <Card.Img variant="top" src="https://placekitten.com/200" />
                            <Card.Body className="d-flex flex-column align-items-center">
                                <Card.Title>Città</Card.Title>
                                <Card.Text className="d-flex flex-column align-items-center">
                                <p>{meteo.weather[0].description}</p>
                                <p>{meteo.main.temp}</p>
                                <p>Pressure: {meteo.main.pressure} | Humidity: {meteo.main.humidity} °C</p>
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item className="d-flex justify-content-around">
                                <p>{meteo.main.temp_max}</p>
                                <p>{meteo.main.temp_min}</p>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Search