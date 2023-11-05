import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap"

const Search = () => {

    // const [lat, setLat] = useState([])
    // const [long, setLong] = useState([])
    const [meteo, setMeteo] = useState({})
    const [city, setCity] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    console.log(city)

    // const getLatAndLon = () => {
    //     fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=4f38068d7e7c5d27e830b68d19fbb064`)
    //     .then((res) => {
    //         if(res.ok){
    //             return res.json()
    //         } else {
    //             throw new Error ('Errore nel recupero della città')
    //         }
    //     })
    //     .then((data) => {
    //         console.log('recupero dati', data[0])
    //         console.log('recupero dati', data[0].lat)
    //         console.log('recupero dati', data[0].lon)
    //         setLat (data[0].lat)
    //         setLong (data[0].lon)
    //         getCityWeather()
    //     })
    //     .catch((err) => {console.log('errore', err)})    
    // }

    // const getCityWeather = () => {
    //     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=4f38068d7e7c5d27e830b68d19fbb064`)
    //     .then((res) => {
    //         if(res.ok){
    //             return res.json()
    //         } else {
    //             throw new Error ('errore nel recupero meteo json')
    //         }
    //     })
    //     .then((meteo) => {
    //         console.log(meteo)
    //         setMeteo (meteo)
    //     })
    //     .catch((err) => console.log('errore nel recupero del meteo', err))
    // }

    // console.log(meteo)


    const getCityWeather = () => {
        setIsLoading(true)
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=251511199b1950c9246de9ad2501f298`)
        .then((res) => {
            if (res.ok){
                return res.json()
            } else {
                throw new Error ('errore')
            }
        })
        .then((data) => {
            console.log(data)
            setMeteo(data)
            setIsLoading(false)
        })
        .catch((err) => {console.log('errore nel recupero dati', err)})
        // .finally(() => {
            
        // })
    }

    // useEffect(() => {
    //     getLatAndLon()
    //     getCityWeather()
    // }, [lat, long])

    useEffect(() => {
        getCityWeather()
    },[city])


    console.log(meteo.cod)

    return (
        <>
            < Container>
                <Row className="justify-content-center pt-5">
                    <Col xs={12} sm={6} className="pt-2">
                        <p className="text-center fs-1">Check the weather forecast</p>
                        <Form className="d-flex justify-content-center pb-4" onSubmit={getCityWeather}>
                            <Form.Group>
                                <Form.Control type="text" placeholder="*Rome*" value={city} onChange={(e) => {
                                    setCity (e.target.value)
                                }}/>
                            </Form.Group>
                            {/* <Button variant="primary" type="submit">
                                Check!
                            </Button> */}
                        </Form>

                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center" xs={12}>
                    {isLoading ? (<p className="fw-300 fs-2">Inserisci una città!</p>) : 
                        <Card className="w-75 radiant-bg rounded-pill shadow ">
                            <Card.Body className="d-flex flex-column align-items-center">
                                <Card.Title className="fw-700 fs-3">{city}</Card.Title>
                                    <Card.Text className="d-flex flex-column align-items-center">
                                        <p>{meteo.weather && meteo.weather[0].description}</p>
                                        <p>{meteo.main && meteo.main.temp} °C</p>
                                        <p>Pressure: {meteo.main && meteo.main.pressure} | Humidity: {meteo.main && meteo.main.humidity} %</p>
                                    </Card.Text>
                                    <div className="d-flex align-items-center">
                                        <p className="m-0">Max: {meteo.main && meteo.main.temp_max} °C</p>
                                        {meteo.weather && 
                                        <img src={`https://openweathermap.org/img/wn/${meteo.weather[0].icon}.png`} alt="" className="m-0"/>}
                                        <p className="m-0">Min: {meteo.main && meteo.main.temp_min} °C</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        }
                    </Col>
                </Row>
            </Container>
        
        </>
    )
}

export default Search