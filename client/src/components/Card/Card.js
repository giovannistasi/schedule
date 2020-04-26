import React, { useState } from 'react';
import Moment from 'react-moment';
import Countdown from '../Countdown';
import EventModal from '../EventModal/EventModal';
import AddToCalendar from 'react-add-to-calendar';

function Card(props) {
  console.log(props);
  let items = [{ outlook: 'Outlook' }, { google: 'Google' }, { apple: 'iCal' }];
  const [flipped, setFlipped] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleClick = () => {
    setFlipped(!flipped);
  };
  const toggleModal = (e) => {
    e.stopPropagation();
    setModalVisible(!modalVisible);
  };

  const handleChildClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div>
      <div className="flip-card">
        <div
          onClick={handleClick}
          className={flipped ? 'flip flip-card-inner' : 'flip-card-inner'}
        >
          <div className="card-container flip-card-front">
            <div className="image-container">
              <img src={props.info.image} className="card-image" />
            </div>
            <div className="card-artist">{props.info.artistName}</div>
            <div className="card-time">
              <Moment format="ddd Do MMM, HH:mm">{props.info.date}</Moment>
            </div>
            <div className="card-title">{props.info.title}</div>
            <div
              onClick={handleChildClick}
              style={{
                textAlign: 'center',
                padding: '20px 0',
                width: '160px',
                height: '60px',
                borderRadius: '3px',
                backgroundColor: 'white'
              }}
            >
              <AddToCalendar
                event={{
                  title: props.info.title,
                  location: 'ViralCulture.com',
                  description: props.info.description,
                  startTime: props.info.date,
                  endTime: props.info.endTime
                }}
                listItems={items}
                buttonLabel="Add to Calendar"
              ></AddToCalendar>
            </div>
          </div>

          <div className="card-container flip-card-back">
            <div className="card-title back">{props.info.title}</div>
            <div className="description-container">
              {props.info.description}
            </div>
            <div className="countdown-container">
              {flipped && <Countdown info={props.info} />}
            </div>
            <a onClick={toggleModal} className="event-link">
              Watch here!
            </a>
          </div>
        </div>
      </div>
      <EventModal
        visible={modalVisible}
        toggleModal={toggleModal}
        info={props.info}
      />
    </div>
  );
}
export { Card as default };
