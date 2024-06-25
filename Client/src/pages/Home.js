import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import Slider from 'react-slick';
import '../styles/pages/Home.css';
import SearchBar from '../components/SearchBar'; // Importa el componente SearchBar

const Home = () => {
  useEffect(() => {
    document.body.classList.add('home-body');
    return () => {
      document.body.classList.remove('home-body');
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: false,
        },
      },
    ],
  };

  const handleSearch = (searchTerm) => {
    // Lógica para manejar la búsqueda
    console.log(`Buscando: ${searchTerm}`);
    // Aquí podrías añadir la lógica para redirigir a una página de resultados de búsqueda
  };

  return (
    <Container className="mt-5">
      <Row className="text-center">
        <Col>
          <h1>Bienvenidos a Motos Indian</h1>
          <p>Piezas y accesorios de motocicletas..</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Slider {...settings}>
            <div>
              <Card>
                <Card.Img variant="top" src="https://impocali.com/wp-content/uploads/2021/11/partes-para-motorpng-1.png" />
                <Card.Body>
                  <Card.Title>Producto 1</Card.Title>
                  <Card.Text>
                    Pieza de motocicleta de alta calidad para garantizar una conducción suave y segura.
                  </Card.Text>
                  <Button variant="primary">Ver Detalles</Button>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card>
                <Card.Img variant="top" src="https://agentedmt.com/wp-content/uploads/2022/01/Terpel-Celerity-20W50-Titanio-1-300x300.png" />
                <Card.Body>
                  <Card.Title>Producto 2</Card.Title>
                  <Card.Text>
                    Piezas fiables y duraderas para todas las marcas de motocicletas.
                  </Card.Text>
                  <Button variant="primary">Ver Detalles</Button>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card>
                <Card.Img variant="top" src="https://static.wixstatic.com/media/e09d1c_8bd83aa6b835437cba272a165b723ff2~mv2.png/v1/fill/w_300,h_300,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Caja%20y%20motor%20para%20motos.png" />
                <Card.Body>
                  <Card.Title>Producto 3</Card.Title>
                  <Card.Text>
                    Accesorios de primera calidad para mejorar su experiencia de conducción.
                  </Card.Text>
                  <Button variant="primary">Ver Detalles</Button>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card>
                <Card.Img variant="top" src="https://aecbmesvcm.cloudimg.io/v7/https://cxf-prod.azureedge.net/b2c-experience-production/attachments/cl1bzvcvq0so301k4xto1b6ns-city-grip-2.png?w=264&h=264&org_if_sml=1" />
                <Card.Body>
                  <Card.Title>Producto 4</Card.Title>
                  <Card.Text>
                    Producto de primera con las mejores prestaciones y calidad.
                  </Card.Text>
                  <Button variant="primary">Ver Detalles</Button>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card>
                <Card.Img variant="top" src="https://percentmotolab.com/wp-content/uploads/2020/08/b51642f10fcc462580f3286fc0cd49c2-300x300.png" />
                <Card.Body>
                  <Card.Title>Producto 5</Card.Title>
                  <Card.Text>
                    Mejore el rendimiento de su moto con este producto de primera calidad.
                  </Card.Text>
                  <Button variant="primary">Ver Detalles</Button>
                </Card.Body>
              </Card>
            </div>
          </Slider>
        </Col>
      </Row>
      <Row className="mt-5 text-center">
        <Col>
          <h2>Productos destacados</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://www.totalservice.com.co/wp-content/uploads/2024/01/Compresor-llantas-Ultra-con-fondo-blanco-300x300.png" />
            <Card.Body>
              <Card.Title>Producto destacado 1</Card.Title>
              <Card.Text>
                Producto de primera con las mejores prestaciones y calidad.
              </Card.Text>
              <Button variant="primary">Ver Detalles</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://mundimotosllanos.com/wp-content/uploads/2024/04/JY511220-CADENILLA-DISTRIBUCION-DOMINAR-400-UG-ORG-300x300.webp" />
            <Card.Body>
              <Card.Title>Producto destacado 2</Card.Title>
              <Card.Text>
                Mejore el rendimiento de su moto con este producto de primera calidad.
              </Card.Text>
              <Button variant="primary">Ver Detalles</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://tapivan.com/wp-content/uploads/2020/06/AK-125-NKD-R-CAFE-RACER-300x300.png" />
            <Card.Body>
              <Card.Title>Producto destacado 3</Card.Title>
              <Card.Text>
                La mejor elección por su durabilidad y fiabilidad.
              </Card.Text>
              <Button variant="primary">Ver Detalles</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5 text-center">
        <Col>
          <h2>Lo que dicen nuestros clientes</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Text>
                "Excelente servicio y productos de primera calidad. Mi moto funciona mejor que nunca".
              </Card.Text>
              <Card.Footer>- Comentario 1</Card.Footer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Text>
                "Un gran lugar para encontrar lo que necesitas para tu moto. Muy recomendable".
              </Card.Text>
              <Card.Footer>- Comentario 2</Card.Footer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Text>
                "Fantásticos productos a precios inmejorables. Mi tienda de referencia para piezas de bicicleta".
              </Card.Text>
              <Card.Footer>- Comentario 3</Card.Footer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <footer className="bg-dark text-white text-center p-4 mt-5">
        <Container>
          <Row>
            <Col>
              <p>&copy; 2024 Motos Indian. Todos los derechos reservados.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </Container>
  );
};

export default Home;
