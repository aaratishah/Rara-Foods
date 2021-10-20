import { Card, Col, Row, Skeleton, Typography } from 'antd';
import api from 'app/dashboard/api';
import routeURL from 'config/routeURL';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { handleError } from 'services/util';

let countServiceList = [
	{
		title: 'Region',
		icon: 'fas fa-building',
		iconColor: '#2196f3',
		dataIndex: 'region',
		link: routeURL.cms.region(),
	},
	{
		title: 'Diet Plan',
		icon: 'fas fa-layer-group',
		iconColor: '#cddc39',
		dataIndex: 'diet-plan',
		link: routeURL.cms.dietary_plan(),
	},
	{
		title: 'Category',
		icon: 'fas fa-braille',
		iconColor: '#ff9800',
		dataIndex: 'food-speciality',
		link: routeURL.cms.food_speciality(),
	},
	{
		title: 'Restaurant',
		icon: 'fas fa-comment-dots',
		iconColor: '#f44336',
		dataIndex: 'restaurant',
		link: routeURL.cms.restaurant(),
	},{
		title: 'Food',
		icon: 'fas fa-comment-dots',
		iconColor: '#f44336',
		dataIndex: 'food',
		link: routeURL.cms.food(),
	},{
		title: 'Restaurant Package',
		icon: 'fas fa-comment-dots',
		iconColor: '#f44336',
		dataIndex: 'restaurant-package',
		link: routeURL.cms.restaurant_package(),
	},
];

let ecommerceCount = [
	{
		title: 'Earning',
		icon: 'fas fa-dollar-sign',
		iconColor: '#ff5722',
		dataIndex: 'earning',
		link: routeURL.cms.food(),
	},
	{
		title: 'Food',
		icon: 'fas fa-tshirt',
		iconColor: '#673ab7',
		dataIndex: 'product',
		link: routeURL.cms.food(),
	},
	{
		title: 'Order',
		icon: 'fas fa-Shopping-cart',
		iconColor: '#cddc39',
		dataIndex: 'order',
		link: routeURL.cms.pending_order(),
	},
	{
		title: 'Delivered Order',
		icon: 'fas fa-Shopping-bag',
		iconColor: '#009688',
		dataIndex: 'successfulOrder',
		link: routeURL.cms.completed_order(),
	},
];

let orderDetailList = [
	{
		title: 'Total Order',
		dataIndex: 'all',
	},
	{
		title: 'Pending Order',
		dataIndex: 'pending',
	},
	{
		title: 'Cancelled Order',
		dataIndex: 'cancelled',
	},
	{
		title: 'Completed Order',
		dataIndex: 'completed',
	},
];

const Title = (props) => (
	<Typography.Title
		level={4}
		style={{
			textDecoration: 'none',
			width: '100%',
			color: '#353353',
			opacity: 0.7,
		}}
	>
		{props.children}
	</Typography.Title>
);
const ServiceCount = ({ item, service }) => {
	return (
		<Col xs={24} sm={12} md={8} lg={6}>
			<Card bordered hoverable>
				<Link to={service.link}>
					<Typography.Title
						level={5}
						style={{
							textDecoration: 'none',
							width: '100%',
							color: '#353353',
							opacity: 0.7,
						}}
					>
						{service.title}
					</Typography.Title>
				</Link>
				<Row
					justify="space-between"
					align="middle"
					style={{
						marginTop: 8,
					}}
				>
					<Col>
						<i
							className={service.icon}
							style={{
								fontSize: 25,
								color: service.iconColor || 'chocolate',
							}}
						/>
					</Col>
					<Col>
						{item ? (
							<span
								style={{
									fontSize: 20,
								}}
							>
                {item}
              </span>
						) : (
							<Skeleton.Input active style={{ width: '30px' }} size="small" />
						)}
					</Col>
				</Row>
			</Card>
		</Col>
	);
};

export default function Home() {
	const [itemCount, setItemCount] = useState({});
	const [ecommerceData, setEcommerceData] = useState({});
	const [orderDetail, setOrderDetail] = useState([]);

	useEffect(() => {
		api.dashbaord
			.countService()
			.then(({ data }) => setItemCount(data))
			.catch(handleError);
		api.dashbaord
			.ecommerce()
			.then(({ data }) => setEcommerceData(data))
			.catch(handleError);
		api.dashbaord
			.orderDetail()
			.then(({ data }) => setOrderDetail(data))
			.catch(handleError);
	}, []);

	return (
		<div style={{ width: '100%', padding: '24px 40px' }}>
			<Row gutter={[16, 16]} justify="start" align="middle">
				<Title>Listed Items</Title>
				{countServiceList.map((each) => {
					const item = itemCount[each.dataIndex];
					return <ServiceCount item={item} service={each} />;
				})}
			</Row>
			<Row
				gutter={[16, 16]}
				justify="start"
				align="middle"
				style={{
					marginTop: 16,
				}}
			>
				<Title>Statistics</Title>

				{ecommerceCount.map((each) => {
					const item = ecommerceData[each.dataIndex];
					return (
						<ServiceCount
							item={
								each.dataIndex === 'earning'
									? `${
										process.env.REACT_APP_CURRENCY_SYMBOL || '$'
									} ${parseFloat(item).toFixed(2)}`
									: parseFloat(item).toFixed(2)
							}
							service={each}
						/>
					);
				})}
			</Row>
			<Row
				gutter={[16, 16]}
				justify="start"
				align="middle"
				style={{
					marginTop: 16,
					width: '100%',
				}}
			>
				<Title>Order Detail</Title>
				<Row
					style={{
						width: '100%',
					}}
				>
					<Col
						xs={24}
						lg={12}
						style={{
							width: '100%',
							backgroundColor: '#e3f2fd',
						}}
					>
						<Card
							bordered={true}
							hoverable={false}
							style={{
								width: '100%',
								backgroundColor: '#e3f2fd',
							}}
						>
							{orderDetailList.map((each) => (
								<Row
									gutter={[16, 16]}
									justify="space-between"
									align="middle"
									style={{
										width: '100%',
									}}
								>
									<Col>
                    <span
											style={{
												fontSize: 16,
												textDecoration: 'none',
												width: '100%',
												color: '#353353',
												opacity: 0.7,
											}}
										>
                      {each.title}
                    </span>
									</Col>
									<Col>
                    <span
											style={{
												textDecoration: 'none',
												width: '100%',
												color: '#353353',
												opacity: 0.7,
											}}
										>
                      {(() => {
												if (orderDetail) {
													let value = orderDetail.find(
														(order) => order.status === each.dataIndex
													);
													return value ? value.total : 0;
												}
												return 0;
											})()}
                    </span>
									</Col>
								</Row>
							))}
						</Card>
					</Col>
					<Col xs={24} lg={12}>
						<Doughnut
							type="doughnut"
							data={{
								labels: ['Pending Order', 'Completed Order', 'Cancelled Order'],
								datasets: [
									{
										data: orderDetail
											.filter((each) => each.status !== 'all')
											.map((each) => each.total),
										backgroundColor: ['#3f51b5', '#009688', '#ff9800'],
										hoverBackgroundColor: ['#303f9f', '#00796b', '#f57c00'],
									},
								],
							}}
						/>
					</Col>
				</Row>
			</Row>
		</div>
	);
}
