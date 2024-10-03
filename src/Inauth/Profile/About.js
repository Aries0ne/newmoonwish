import { TabPanel } from '@mui/lab';
import { List, ListItem, Typography } from '@mui/material';
import React from 'react';

const About = (props) => {
	const { data } = props;

	return (
		<List className='profile-content'>
			{data && (
				<ListItem>
					<Typography component='h4'>{data?.title}</Typography>
					<Typography component='p'>{data?.content}</Typography>
				</ListItem>
			)}

			<ListItem>
				<Typography component='h4'>What do we do?</Typography>
				<Typography component='p'>
					At Mooonwish, We specialize in assisting investors in selecting the
					most successful and effective trading alternatives. Our trading
					programme will assist you in analyzing the fundamental and technical
					characteristics of a stock to decide whether you should invest in it
					rather than instructing you on how to trade (which you already know).
				</Typography>
			</ListItem>

			<ListItem>
				<Typography component='h4'>
					Check price movements through a bar chart.
				</Typography>
				<Typography component='p'>
					Bar charts throughout time show a number of price bars. You may
					examine the price changes for each bar over the specified time. Each
					bar typically displays the low, high, open, and close trends.
				</Typography>
			</ListItem>

			<ListItem>
				<Typography component='h4'>
					Check Buy/Sell Signals in the bar chart.
				</Typography>
				<Typography component='p'>
					View the bar chart's high, low, open, and close prices for each
					respective time. The bar chart contains a lot of information that
					investors and traders may use. The price spread between the low and
					high in lengthy vertical bars was substantial.
				</Typography>
				<Typography component='p'>
					The app allows customers to check price movements through bar charts.
					Usually, each bar demonstrates the low, high, open and close trends.
					Investors and traders can also check buy/sell signals in the bar chart
					by identifying the considerable price difference between the low and
					high in long vertical bars. Furthermore, the app uses AI technology to
					buy and sell entries with the best exits at the top and bottom of the
					market. Investors and traders can quickly close a profitable trade
					with this approach and smartly judge the right exits and entries with
					more accuracy.
				</Typography>
			</ListItem>
		</List>
	);
};

About.propTypes = {};

export default About;
