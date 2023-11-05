import { useEffect, useState } from "react"
import { Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap"
import { Wind, Droplet, ClockHistory } from "react-bootstrap-icons"

const Search = () => {

    const [meteo, setMeteo] = useState({})
    const [city, setCity] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState('')

    console.log(city)

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
            // getImage()
            setIsLoading(false)
        })
        .catch((err) => {console.log('errore nel recupero dati', err)})
    }

    const getImage = () => {
        fetch(`https://api.teleport.org/api/urban_areas/slug:${city}/images/`)
        .then((res) => {
            if (res.ok){
                return res.json()
            } else {
                throw new Error ('Errore nel recupero img')
                // throw new Error (`Errore nel recupero dell'immagine. Codice di stato: ${res.status}`) ???? perché non funziona?
            }
        })
        .then((image) => {
            console.log(image)
            setImage(image)
        })
        .catch((err) => {console.log('errore reupero immagine', err)})
    }

    useEffect(() => {
        getCityWeather()
        getImage()
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
                        </Form>

                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center" xs={12}>
                    {isLoading ? (<p className="fw-300 fs-2">Enter a city!</p>) : 
                        <Card className="w-75 radiant-bg shadow rounded-4">
                            {/* {image.photos &&
                            <Card.Img variant="top" src={image.photos[0].image.mobile} alt="city-img"/>}                           */}
                            {/* <div>
                                {image.photos &&
                                // <img src={image.photos[0].image.mobile} alt="img-city" className="w-50"/>
                                <div style={{backgroundImage: `url('${image.photos[0].image.mobile}')`, backgroundSize: 'cover',  backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '15em'}}>
                                </div>
                                }
                            </div> */}
                            <Card.Body className="d-flex flex-column align-items-center">
                                <Card.Title className="d-flex align-items-center w-100 justify-content-around">
                                <p className="fw-300 m-0">{city}</p>
                                <p className="m-0">Now</p>
                                </Card.Title>
                                    <Card.Text className="d-flex flex-column align-items-center">
                                        <p className="m-0 pt-4 fs-1">{meteo.main && meteo.main.temp} °C</p>
                                        <p className="m-0 pb-4">{meteo.weather && meteo.weather[0].description}</p>
                                        {/* <p className="m-0">Pressure: {meteo.main && meteo.main.pressure} | Humidity: {meteo.main && meteo.main.humidity} %</p> */}
                                    </Card.Text>
                                    <div className="d-flex align-items-center justify-content-evenly w-100">
                                        <p className="m-0">Max: {meteo.main && meteo.main.temp_max} °C</p>
                                        {meteo.weather && 
                                        <img src={`https://openweathermap.org/img/wn/${meteo.weather[0].icon}.png`} alt="" className="m-0"/>}
                                        <p className="m-0">Min: {meteo.main && meteo.main.temp_min} °C</p>
                                    </div>
                                    <div className="pt-4 d-flex justify-content-around w-100">
                                        <div>
                                            <p className="m-0">{meteo.wind && <><Wind /> {meteo.wind.speed} km/h</>}</p>
                                            <p className="m-0 mt-1">{meteo.main && <><ClockHistory className="me-2"/>{meteo.main.pressure}</>}</p>
                                            <p className="m-0 mt-1">{meteo.main && <><Droplet /> {meteo.main.humidity} %</>}</p>
                                        </div>
                                    </div>                                    
                                </Card.Body>
                            </Card>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>                                        
                    </Col>
                </Row>
            </Container>
        
        </>
    )
}

export default Search