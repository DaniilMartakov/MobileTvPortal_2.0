import { Container } from "react-bootstrap";
import { FooterNavigation } from "../components/Footer_navigation/FooterNavigation";
import './stylePage/NotFound.css'

export default function NotFoundPage (){
    return(
        <>
            <Container>
                <div>
                    <img className="img-not-found" src={'./img/icon404.png'} alt="pictures" />
                    <h1 className="not">К большому сожалению такой страницы не существует</h1>
                </div>
            </Container>
            <FooterNavigation />
        </>
    )
}