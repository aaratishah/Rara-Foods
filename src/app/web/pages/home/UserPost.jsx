import "./post.css";
import Image2 from "image/demo/post-001.jpg";
import Image3 from "image/demo/post-002.jpg";
import Image4 from "image/demo/post-003.jpg";
import { Link } from "react-router-dom";

const styles = {
	post: {
		flexDirection: "column",
	},
};
const options = [
	{
		title: "Feed your employees",
		subtitle: "Create a business account",
		media: Image2,
		link: "",
	},
	{
		title: "Your restaurant, delivered",
		subtitle: "Add your restaurant",
		media: Image3,
		link: "",
	},
	{
		title: "Deliver the Eats",
		subtitle: "Sign up to deliver",
		media: Image4,
		link: "",
	},
];
export default function UserPost() {
	return (
		<section className="post-section section">
			<div className="container-fluid">
				<div className="post-wrapper">
					<div className="row">
						{options.map(({ title, subtitle, media, link }) => (
							<div className="col-md-4">
								<div className="post" style={styles.post}>
									<div className="post-thumbnail">
										<a href="#">
											<img src={media} alt />
										</a>
									</div>
									<h2 className="post-title">{title}</h2>
									<Link to={link}>{subtitle}</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
