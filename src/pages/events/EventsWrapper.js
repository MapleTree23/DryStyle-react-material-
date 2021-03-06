/* eslint-disable no-console */
import React, {useEffect} from 'react';
import {connect} from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import '../../assets/css/style.scss';
import '../../assets/css/style-responsive.scss';
import divider1Icon from '../../assets/images/ic-divider-1.png';
import divider2Icon from '../../assets/images/ic-divider-2.png';
import divider3Icon from '../../assets/images/ic-divider-3.png';
import arrowLeftIcon from '../../assets/images/arrow-left-1.svg';
import arrowRightIcon from '../../assets/images/arrow-right-1.svg';

import {
    getEvents,
    getEventsSectionHeroImage,
    getEventsSectionSubTitle,
    getEventsSectionTitle
} from "../../state/ducks/Events/Events-Selectors";
import EventSummaryView from "./event-summary";
import EventDetailView from "./event-detail";

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <>
            <div className="slick-arrow right" onClick={onClick}>
                <img src={arrowLeftIcon}></img>
            </div>
        </>
    );
};
const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <>
            <div className="slick-arrow left" onClick={onClick}>
                <img src={arrowRightIcon}></img>
            </div>
        </>
    );
};
const Events = ({
                    title, subtitle, heroImage, events
                }) => {

    const slickSettings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    dots: true
                }
            }
        ],
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    const dividerIcons = [divider1Icon, divider2Icon, divider3Icon];

    if (!title && !subtitle && !heroImage) {
        return <div/>;
    }
    return (
        <>
            <div className="banner-section">
                <div className="banner-image">
                    <img className="d-block w-100" src={heroImage} alt="Banner"/>
                </div>
            </div>
            <div className="middle-section bg-light">
                <div className="event-section">
                    <div className="row">
                        <h1>{title.toUpperCase()}</h1>
                        {/*<h5>{EVENT_HEAD_1}</h5>*/}
                        <p dangerouslySetInnerHTML={{__html: subtitle}}/>
                    </div>

                    <div className="slider-row">
                        <Slider {...slickSettings}>
                            {events.map(({image, title, subtitle, action}, index) => {
                                return <EventSummaryView image={image} title={title} subtitle={subtitle} action={action}
                                                         key={'event_' + index}/>;
                            })}
                        </Slider>
                    </div>

                    <div className="detail-row">
                        {events.map((event, index) => {
                            return <EventDetailView {...event} dividerIcon={dividerIcons[index % 3]}
                                                    key={'event_' + index}/>;
                        })}
                    </div>
                </div>
                <div className="gradient-bottom-decorator"/>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    title: getEventsSectionTitle(state),
    subtitle: getEventsSectionSubTitle(state),
    heroImage: getEventsSectionHeroImage(state),
    events: getEvents(state)
});

export default connect(mapStateToProps)(Events);
