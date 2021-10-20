import { useEffect } from "react";

export default function AboutUs() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div id="wrapper-content" className="page-about wrapper-content pt-0 pb-0">
			<div className="banner">
				<div className="container">
					<div className="banner-content text-center">
						<div className="heading" data-animate="fadeInDown">
							<h1 className="mb-0 text-white">
								Community is not readymade,
								<br />
								It's built through Friendship,love and loyality
							</h1>
						</div>
					</div>
				</div>
			</div>
			<div className="about-intro text-center ">
				<div className="container">
					<div className="jumbotron mb-9 bg-transparent p-0 text-dark">
						<h3>ABOUT US</h3>
						<p className="lead mb-0 font-size-lg font-weight-normal lh-18">
							{" "}
							RARA Foods provides food ordering and delivery services throughout the Australia. It is dedicated towards the prosperity of the nation, consumer and the business itself.

Silicontech Nepal Pvt. Ltd. developed this platform upon the request of the RARA Foods in which more than 1 years was invested for the research of other food delivery and ordering system to make it even better than the other competitors.
Some of the advance services that RARA Foods provides are:

- Food re-ordering
- listing & advertising opportunity for small and medium businesses
- easy access to information among nepalse community
- jobs portal
						</p>
					</div>
				</div>
			</div>
			<section className="vission-video  bg-white">
				<div className="container">
					<div className="row">
						<div className="col-md-12 video-wrapper text-white  text-center">
							<h3>Special Feature</h3>
							<p>
								Ask us an exclusive channel wherer we try to answer your queries
								or community answers on behalf of RARA Foods.
							</p>
							<p>
								Dedicated staff to answer your job vacancy related queries and
								trainings(Only for HongKong locals)
							</p>
						</div>
						<div className="col-md-3  mission-grid"></div>
						<div className="col-md-6 history-bg  mission-grid">
							<h3 className="text-lg-heading  text-white text-center">
								Our Mission
							</h3>
							<p className="text-justify">
								Our mission target is to develop a platform and keep upgrading
								for a community integration.
							</p>
							<p className="text-justify">
								A community which is self sufficient, which can offers one
								another with products, housemade product,
								services,marketing,advertisements,jobs etc within the community
								itself.
							</p>
							<p className="text-justify">
								And even a platform to barter goods and services among the
								community
							</p>
							<p className="text-justify">
								A realisation of friendship and unity as a humankind where
								caste, creed and colour would not matter nor influence.
							</p>
						</div>
						<div className="col-md-3  mission-grid"></div>
					</div>
				</div>
			</section>
			<div id="facts-box" className="pt-5 facts-box">
				<div className="container">
					<h3 className="mb-7 text-center">OUR SERVICES</h3>
					<div className="row pb-5 our-services">
						<div className="col-sm-6 col-md-3 mb-5 mb-lg-0 ">
							<div className="icon-box text-center card shadow  equal-height">
								<div className="icon-box-icon text-primary mb-8 ">
									<img src="https://img.icons8.com/metro/70/084965/discount.png" />
								</div>
								<h6>Membership</h6>
								<p>
									Discount and priviliged service for membership card holders
								</p>
							</div>
						</div>
						<div className="col-sm-6 col-md-3 mb-5 mb-lg-0">
							<div className="icon-box text-center card  shadow  equal-height">
								<div className="icon-box-icon text-primary mb-8 ">
									<img src="https://img.icons8.com/ios-filled/70/084965/calendar.png" />
								</div>
								<h6>Event Organise</h6>
								<p>
									RARA Foods will organise Major Events with local and
									international start cast, educational and recreational fun
									fair to food fest etc.
								</p>
							</div>
						</div>
						<div className="col-sm-6 col-md-3 mb-5 mb-lg-0">
							<div className="icon-box text-center card  shadow  equal-height">
								<div className="icon-box-icon text-primary mb-8">
									<img src="https://img.icons8.com/wired/70/084965/event-accepted.png" />
								</div>
								<h6>Event Management</h6>
								<p>
									Event management to the creation and development of small and
									/ or a large -scale personal and corporate events.
								</p>
							</div>
						</div>
						<div className="col-sm-6 col-md-3">
							<div className="icon-box text-center card  shadow  equal-height">
								<div className="icon-box-icon text-primary mb-8">
									<img src="https://img.icons8.com/ios/70/084965/online-order.png" />
								</div>
								<h6>Online shopping</h6>
								<p>Online shopping products range</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
