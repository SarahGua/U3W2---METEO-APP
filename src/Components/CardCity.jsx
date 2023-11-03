import { Component } from "react";
import { Card } from "react-bootstrap";
import { ThermometerHigh, ThermometerLow } from 'react-bootstrap-icons';


class CardCity extends Component {
    render(){
        return (
            <>
            <div className="d-flex justify-content-center">

                <Card className="w-50">
                    <Card.Img variant="top" src="https://placekitten.com/200" />
                    <Card.Body className="d-flex flex-column align-items-center">
                        <Card.Title>Nome città</Card.Title>
                        <Card.Text>
                            <div className="d-flex align-items-center">
                                <ThermometerHigh />
                                <p className="m-0">max. temperatura</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <ThermometerLow />
                                <p className="m-0">min. temperatura</p>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            </>
        )
    }
}

export default CardCity