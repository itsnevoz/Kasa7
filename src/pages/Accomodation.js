import '../style/accomodation.scss'
import { useEffect, useState } from "react"
import { useParams, Navigate } from "react-router-dom";
import NotFound from '../pages/NotFound';
import datas from '../data/data'
import Header from "../components/Header";
import Slider from "../components/Carousel"
import Footer from "../components/Footer";
import Collapse from '../components/Collapse';
import greyStar from '../assets/grey_star.png';
import redStar from '../assets/red_star.png';


export default function Accommodation() {
	const [imageSlider, setImageSlider] = useState([]);

	const idAccommodation = useParams('id').id;
	const dataCurrentAccommodation = datas.filter(data => data.id === idAccommodation);

	useEffect(() => {
		const dataCurrentAccomodation = datas.filter(data => data.id === idAccommodation);
		setImageSlider(dataCurrentAccomodation[0].pictures);
	}, [idAccommodation]);

 
    if(dataCurrentAccommodation.length === 0) {
        return <Navigate to="*" />
    }

	const name = dataCurrentAccommodation[0].host.name.split(' '); 
	const rating = dataCurrentAccommodation[0].rating;
	const description  = dataCurrentAccommodation[0].description;
	const equipments = dataCurrentAccommodation[0].equipments;

	return (
		<>
		<Header/>
			<Slider imageSlider={imageSlider}/>
			<main className="accomodation">
				<div className="accomodation_content">
					<div className="accomodation_content_infos">
						<h1>{dataCurrentAccommodation[0].title}</h1>
						<p>{dataCurrentAccommodation[0].location}</p>
						<div>
							{dataCurrentAccommodation[0].tags.map((tag, index) => {
								return (
									<button key={index}>{tag}</button>
								)
							})}
						</div>
					</div>
					<div className="accomodation_content_host">
						<div>
							<div className='accomodation_content_host_name'>
								<span>{name[0]}</span>
								<span>{name[1]}</span>
							</div>
							<img src={dataCurrentAccommodation[0].host.picture} alt="host of this accomodation" />
						</div>
							
						<div className="accomodation_content_host_stars">
							{[...Array(5)].map((star, index) => {
								const ratingValue = index + 1;
								return (
									<img key={index} src={ratingValue <= rating ? redStar : greyStar} alt="star" />
								)
							})}
						</div>
					</div>
				</div>
				<div className="accomodation_collapse">
					<div className="accomodation_collapse_item">
						<Collapse title={'Description'} content={description} />	
					</div>
					<div className="accomodation_collapse_item">
						<Collapse title={'Équipements'} content={equipments}/>
					</div>	
				</div>
			</main>
			<Footer/>
		</>
	)
}