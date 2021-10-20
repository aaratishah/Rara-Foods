import clsx from 'clsx';
import routeURL from 'config/routeURL';
import {
	ADDRESS,
	CONTACT, EMAIL,
	FACEBOOK_LINK,
	INSTAGRAM_LINK,
	TWITTER_LINK,
	YOUTUBE_LINK,
} from 'config/string';
// import footerBg from 'image/footer_bg.jpg';
import logoImage from 'image/logo_white.png';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import { Col, Row } from 'antd';

const socialLinks = [
	{
		title: 'FB',
		icon: 'fa-facebook-f',
		link: FACEBOOK_LINK,
		category: 'github' , // fixed by css
	},
	{
		title: 'TW',
		icon: 'fa-twitter',
		link: TWITTER_LINK,
		category: 'twitter' , // fixed by css

	},
	{
		title: 'IG',
		icon: 'fa-instagram',
		link: INSTAGRAM_LINK,
		category: 'linkedin' , // fixed by css

	},
	{
		title: 'YT',
		icon: 'fa-youtube',
		link: YOUTUBE_LINK,
		category: 'youtube' , // fixed by css

	},
];

const listStyle = {
	listStyleType: 'none',
};

const getStartedLink = [
	{
		title: 'Be a Rider',
		link: routeURL.web.rider_request()
	},
	{
		title: 'Add your restaurant',
		link: routeURL.web.restaurant_request()
	},
];

const legalLink = [
	{
		title: 'Privacy Notice',
		link: routeURL.web.privacy_policy(),
	},
	{
		title: 'Terms of Use',
		link: routeURL.web.terms_and_condition(),
	},

]

const links = [
	{
		title: 'Quick Links',
		list: [
			{
				title: 'Home',
				link: routeURL.web.home(),
			},
			{
				title: 'Terms and Condition',
				link: routeURL.web.terms_and_condition(),
			},
			{
				title: 'Contact Us',
				link: routeURL.web.contactUs(),
			},
			// {
			//   title: 'Blog',
			//   link: '',
			// },
		],
	},
	{
		title: 'COMPANY',
		list: [
			{
				title: 'My Account',
				link: routeURL.web.my_account(),
			},
			{
				title: 'Checkout',
				link: routeURL.web.checkout(),
			},
			{
				title: 'Forget Password',
				link: routeURL.web.forget_password(),
			},
			// {
			//   title: 'Order Tracking',
			//   link: '',
			// },
		],
	},
];

export default function Footer() {
	return <div className="pg-footer">
		<footer className="footer">
			<svg className="footer-wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100"
					 preserveAspectRatio="none">
				<path className="footer-wave-path"
	d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"/>
			</svg>
			<div className="footer-content">
				<div className="footer-content-column">
					<div className="footer-logo">
						<Link className="footer-logo-link" to={routeURL.web.home()}>
							<img width={96} src={logoImage} alt={'logo RaraFoods rara foods'} />
						</Link>
					</div>
					{/*<div className="footer-menu">*/}
					{/*	<h2 className="footer-call-to-action-title"> </h2>*/}
					{/*	<p className="footer-call-to-action-description"> Have a support question?</p>*/}
					{/*</div>*/}
				</div>
				<div className="footer-content-column">
					<div className="footer-menu">
						<h2 className="footer-menu-name"> Quick Links</h2>
						<ul id="menu-get-started" className="footer-menu-list">
							{getStartedLink.map(each => <li className="menu-item menu-item-type-post_type menu-item-object-product">
								<Link to={each.link} >{each.title}</Link>
							</li>)}
						</ul>
					</div>
				</div>

				<div className="footer-content-column">
					<div className="footer-menu">
						<h2 className="footer-menu-name"> Legal</h2>
						<ul id="menu-company" className="footer-menu-list">
							{legalLink.map(each => <li className="menu-item menu-item-type-post_type menu-item-object-product">
								<Link to={each.link} >{each.title}</Link>
							</li>)}
						</ul>
					</div>
				{/*	<div className="footer-menu">*/}
				{/*		<h2 className="footer-menu-name"> Legal</h2>*/}
				{/*		<ul id="menu-legal" className="footer-menu-list">*/}
				{/*			<li*/}
				{/*				className="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-170434">*/}
				{/*				<a href="#">Privacy Notice</a>*/}
				{/*			</li>*/}
				{/*			<li className="menu-item menu-item-type-post_type menu-item-object-page">*/}
				{/*				<a href="#">Terms of Use</a>*/}
				{/*			</li>*/}
				{/*		</ul>*/}
				{/*	</div>*/}
				</div>
				<div className="footer-content-column">
					<div className="footer-call-to-action">
						<p className="footer-call-to-action-description"> Have a support question?</p>
						<Link className="footer-call-to-action-button button" to={routeURL.web.contactUs()} target="_self"> Get in
							Touch </Link>
					</div>
					<div className="footer-call-to-action">
						<h2 className="footer-call-to-action-title"> You Call Us</h2>
						<p className="footer-call-to-action-link-wrapper"><a
							className="footer-call-to-action-link" href={`tel:${CONTACT}`}
							target="_self">{CONTACT}</a></p>
					</div>
				</div>
				<div className="footer-social-links">
					<svg className="footer-social-amoeba-svg" xmlns="http://www.w3.org/2000/svg"
							 viewBox="0 0 236 54">
						<path className="footer-social-amoeba-path"
	d="M223.06,43.32c-.77-7.2,1.87-28.47-20-32.53C187.78,8,180.41,18,178.32,20.7s-5.63,10.1-4.07,16.7-.13,15.23-4.06,15.91-8.75-2.9-6.89-7S167.41,36,167.15,33a18.93,18.93,0,0,0-2.64-8.53c-3.44-5.5-8-11.19-19.12-11.19a21.64,21.64,0,0,0-18.31,9.18c-2.08,2.7-5.66,9.6-4.07,16.69s.64,14.32-6.11,13.9S108.35,46.5,112,36.54s-1.89-21.24-4-23.94S96.34,0,85.23,0,57.46,8.84,56.49,24.56s6.92,20.79,7,24.59c.07,2.75-6.43,4.16-12.92,2.38s-4-10.75-3.46-12.38c1.85-6.6-2-14-4.08-16.69a21.62,21.62,0,0,0-18.3-9.18C13.62,13.28,9.06,19,5.62,24.47A18.81,18.81,0,0,0,3,33a21.85,21.85,0,0,0,1.58,9.08,16.58,16.58,0,0,1,1.06,5A6.75,6.75,0,0,1,0,54H236C235.47,54,223.83,50.52,223.06,43.32Z"/>
					</svg>
					{socialLinks.map(eachIcon => <a
						className={`footer-social-link ${eachIcon.category}`}
						href={eachIcon.link} target="_blank">
						<span className="hidden-link-text">{eachIcon.title}</span>
						<i style={{
						marginLeft: 5
						}} className={`fab ${eachIcon.icon} footer-social-icon-svg`} />
					</a>)}
				</div>
			</div>
			<div className="footer-copyright">
				<Row className="footer-copyright-wrapper" justify='center'>
					{/* <Col xs={24} md={8}>*/}
					{/*	<p className="footer-copyright-text" style={{*/}
					{/*			textAlign: 'left'*/}
					{/*	}}>*/}
					{/*		Designed By:&nbsp;*/}
					{/*		<a style={{*/}
					{/*			textDecoration: 'none',*/}
					{/*		}} href={"https://silicontechnepal.com.np/"}>{" "}Silicontech Nepal</a>.*/}
					{/*	</p>*/}
					{/*</Col> */}
					<Col xs={24}>
						<p className="footer-copyright-text">
						<span className="footer-copyright-link">Copyright © {new Date().getFullYear()}. |&nbsp;{process.env.REACT_APP_CMS_TITLE}&nbsp;|&nbsp;All rights reserved. </span>
						</p>
					</Col>

				</Row>
			</div>
		</footer>
	</div>;
}
