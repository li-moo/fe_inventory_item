import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from './EventDetail.module.css';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState({});

  useEffect(() => {
    console.log(id);
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/eventdetail/${id}`);
      console.log("EventDetail data:", response.data);
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
          <img src={event.imgname}/>
        </div>
      }
    </div>
  );
}

export default EventDetail;