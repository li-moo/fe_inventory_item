import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import style from './EventDetail.module.css';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState({});

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BE_API}/eventdetail/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {event &&
        <div className={style.eventWrap}>
          <h2>{event.name}</h2>
          <h4>기간 {event.start_date} ~ {event.end_date}</h4>
          <img src={event.imgname} />
        </div>
      }
    </div>
  );
}

export default EventDetail;