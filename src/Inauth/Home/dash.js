import { Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "./dash.scss";
import tec from "../../images/tec.png";
import price from "../../images/price.png";
import trade from "../../images/trade.png";
import paper from "../../images/paper.png";
import scanner from "../../images/scanner.png";
import open from "../../images/open.png";
import close from "../../images/close.png";
import arrow1 from "../../images/arrow1.png";

const slides = [
  {
    title: "Start Your Trading Journey",
    description: "Invite your friends and earn 15% of subscription cost.",
  },
  {
    title: "Another Journey",
    description: "Join us for more exciting opportunities.",
  },
  {
    title: "Once again Another Journey",
    description: "Join us for more exciting opportunities.",
  },
  {
    title: "Once again Another Journey part 2",
    description: "Join us for more exciting opportunities.",
  },
];

const settings1 = {
    dots: true, // Shows navigation dots
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of cards to show at once
    slidesToScroll: 3, // Number of cards to scroll on slide
    responsive: [
      {
        breakpoint: 1024, // Adjust for medium screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600, // Adjust for small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };


  const cards = [
    {
      title: 'Four Price Trade',
      date: '09 Feb 2024',
      timeFrame: '5 min',
      index: 'Nifty 500',
      match: '2 Match',
      description:
        'Scan for Open(0) equal to Close(0) and Open(0) equal to High(0) and High(0) equal to Low(0) on Daily candles using candlestick chart',
    },
    {
        title: 'Four Price Trade',
        date: '09 Feb 2024',
        timeFrame: '5 min',
        index: 'Nifty 500',
        match: '2 Match',
        description:
          'Scan for Open(0) equal to Close(0) and Open(0) equal to High(0) and High(0) equal to Low(0) on Daily candles using candlestick chart',
      },
      {
        title: 'Four Price Trade',
        date: '09 Feb 2024',
        timeFrame: '5 min',
        index: 'Nifty 500',
        match: '2 Match',
        description:
          'Scan for Open(0) equal to Close(0) and Open(0) equal to High(0) and High(0) equal to Low(0) on Daily candles using candlestick chart',
      },
    // Add more cards with different data if needed
    { /* second card */ },
    { /* third card */ },
    { /* more cards if needed */ },
  ];

export default function Dash(props) {
  // Slider settings
  const settings = {
    dots: true, // Enable dots if you want them
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="div1">
      <div className="div111">
        <div className="main">
          <div className="slider-container">
            <Slider {...settings}>
              {slides.map((slide, index) => (
                <div key={index} className="container">
                  <div className="cont">
                    <div className="div001">
                      <h1>{slide.title}</h1>
                      <p>{slide.description}</p>
                      <button>View Now</button>
                    </div>
                    {/* <img src={slide.img} className="dashimage" alt={`Slide ${index + 1}`} /> */}
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <div className="strat">
            <h1>Strategy Builder</h1>
            <div className="exp">
              <div className="explore">
                <h3>Explore Strategy Builder</h3>
                <p>
                  Personalized your own strategy with our technical tools and
                  support.
                </p>
                <div className="tech">
                  <img src={tec} className="stratlogo" />
                  <div className="div023">
                    <h6>30+ technical indicators</h6>
                    <span></span>
                    <p1>
                      We offer 30+ technical indicators to create strategy
                    </p1>
                  </div>
                  <div class="vertical-line"></div>
                  <img src={price} className="stratlogo" />
                  <div className="div023">
                    <h6>30+ technical indicators</h6>
                    <span></span>
                    <p1>
                      We offer 30+ technical indicators to create strategy
                    </p1>
                  </div>
                </div>
              </div>
              <button>Explore Now</button>
            </div>
          </div>
        </div>

        <div className="right">
          <h1>Key Feature</h1>
          <p>Invite your friends and earn 15% of subscription cost.</p>

          <div className="live2">
            <div className="live">
              <div className="insi">
                <img src={trade} className="stratlogo" />
                <div className="div123">
                  <h1>Live Trades</h1>
                  <p>Not Deployed</p>
                </div>
              </div>
              <img src={arrow1} className="arrow1" />
            </div>

            <hr />
            <div className="live3">
              <div className="insi">
                <img src={paper} className="stratlogo" />
                <div className="div123">
                  <h1>Paper Trades</h1>
                  <p>Not Deployed</p>
                </div>
              </div>
              <img src={arrow1} className="arrow1" />
            </div>
            <hr />
            <div className="live3">
              <div className="insi">
                <img src={scanner} className="stratlogo" />
                <div className="div123">
                  <h1>Scanner</h1>
                  <p>Not Deployed</p>
                </div>
              </div>
              <img src={arrow1} className="arrow1" />
            </div>
            <hr />
            <div className="live3">
              <div className="insi">
                <img src={open} className="stratlogo" />
                <div className="div123">
                  <h1>Open Order</h1>
                  <p>Not Deployed</p>
                </div>
              </div>
              <img src={arrow1} className="arrow1" />
            </div>
            <hr />
            <div className="live3">
              <div className="insi">
                <img src={trade} className="stratlogo" />
                <div className="div123">
                  <h1>Close Order</h1>
                  <p>Not Deployed</p>
                </div>
              </div>
              <img src={arrow1} className="arrow1" />
            </div>
          </div>
        </div>
      </div>

      <h1 className="text111">My Stratergy</h1>
      <div className="next">
      {/* <div class="card">
        <div class="card-header">
          <h2>Four Price Trade</h2>

          <div class="card-info">
            <span class="tag time-frame">5 min</span>
            <span class="tag index">Nifty 500</span>
            <span class="match">2 Match</span>
          </div>
        </div>
        <p class="date">09 feb 2024</p>

        <div class="card-content">
          <p>
            Scan for Open(0) equal to Close(0) and Open(0) equal to High(0) and
            High(0) equal to Low(0) on Daily candles using candlestick chart
          </p>
        </div>

        <div class="card-actions">
          <button class="live-btn">Take Live</button>
          <button class="results-btn">Show Results</button>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h2>Four Price Trade</h2>

          <div class="card-info">
            <span class="tag time-frame">5 min</span>
            <span class="tag index">Nifty 500</span>
            <span class="match">2 Match</span>
          </div>
        </div>
        <p class="date">09 feb 2024</p>

        <div class="card-content">
          <p>
            Scan for Open(0) equal to Close(0) and Open(0) equal to High(0) and
            High(0) equal to Low(0) on Daily candles using candlestick chart
          </p>
        </div>

        <div class="card-actions">
          <button class="live-btn">Take Live</button>
          <button class="results-btn">Show Results</button>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h2>Four Price Trade</h2>

          <div class="card-info">
            <span class="tag time-frame">5 min</span>
            <span class="tag index">Nifty 500</span>
            <span class="match">2 Match</span>
          </div>
        </div>
        <p class="date">09 feb 2024</p>

        <div class="card-content">
          <p>
            Scan for Open(0) equal to Close(0) and Open(0) equal to High(0) and
            High(0) equal to Low(0) on Daily candles using candlestick chart
          </p>
        </div>

        <div class="card-actions">
          <button class="live-btn">Take Live</button>
          <button class="results-btn">Show Results</button>
        </div>
      </div> */}

<div className="slider-container">
      <Slider {...settings1}>
        {cards.map((card, index) => (
          <div key={index} className="card">
            <div className="card-header">
              <h2>{card.title}</h2>

              <div className="card-info">
                <span className="tag time-frame">{card.timeFrame}</span>
                <span className="tag index">{card.index}</span>
                <span className="match">{card.match}</span>
              </div>
            </div>
            <p className="date">{card.date}</p>

            <div className="card-content">
              <p>{card.description}</p>
            </div>

            <div className="card-actions">
              <button className="live-btn">Take Live</button>
              <button className="results-btn">Show Results</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    </div>
    </div>
    

  );
}
