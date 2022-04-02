import React from 'react';
import { Link } from 'react-router-dom';
import {
	FaFacebook,
	FaInstagram,
	FaYoutube,
	FaTwitter,
	FaLinkedin,
} from 'react-icons/fa';
import { Button } from '../button/Button';
import './footer.css';

const Footer = () => {
	return (
		<div className='footer-container'>
			<section className='footer-subscription'>
				<p className='footer-subscription-heading'>
					Join our exclusive membership to receive the latest news and releases
				</p>
				<p className='footer-subscription-text'>
					You can unsubscribe at any time.
				</p>
				<div className='input-areas'>
					<form>
						<input
							className='footer-input'
							name='email'
							type='email'
							placeholder='Your Email'
						/>
						<Button buttonStyle='btn--outline'>Subscribe</Button>
					</form>
				</div>
			</section>
			<div className='footer-links'>
				<div className='footer-link-wrapper'>
					<div className='footer-link-items'>
						<h2>About Us</h2>
						<Link to='/sign-up'>How it works</Link>
						<Link to='/'>Testimonials</Link>
						<Link to='/'>Meet the Team</Link>
					</div>
					<div className='footer-link-items'>
						<h2>Contact Us</h2>
						<Link to='/'>Contact</Link>
						<Link to='/'>Support</Link>
						<Link to='/'>Sponsorships</Link>
					</div>
				</div>
			</div>
			<section className='social-media'>
				<div className='social-media-wrap'>
					<div className='footer-logo'>
						<Link to='/' className='social-logo'>
							TransversaL
						</Link>
					</div>
					<small className='website-rights'>TransversaL © 2022</small>
					<div className='social-icons'>
						<Link
							className='social-icon-link'
							to='/'
							target='_blank'
							aria-label='Facebook'>
							<FaFacebook />
						</Link>
						<Link
							className='social-icon-link'
							to='/'
							target='_blank'
							aria-label='Instagram'>
							<FaInstagram />
						</Link>
						<Link
							className='social-icon-link'
							to={
								'//www.youtube.com/channel/UCsKsymTY_4BYR-wytLjex7A?view_as=subscriber'
							}
							target='_blank'
							aria-label='Youtube'>
							<FaYoutube />
						</Link>
						<Link
							className='social-icon-link'
							to='/'
							target='_blank'
							aria-label='Twitter'>
							<FaTwitter />
						</Link>
						<Link
							className='social-icon-link'
							to='/'
							target='_blank'
							aria-label='LinkedIn'>
							<FaLinkedin />
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Footer;
