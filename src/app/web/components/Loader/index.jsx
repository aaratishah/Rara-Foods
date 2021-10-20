import { Spin } from "antd";
import Container from "../Container";

export default function Loader({ spinning, children, className, style }) {
	return (
		<Container>
			<Spin className={className} style={style} spinning={spinning}>
				{children}
			</Spin>
		</Container>
	);
}
