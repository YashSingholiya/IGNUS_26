import React from 'react';
import scheduleImage from "./ignus.png";
import './schedule.css';

const Schedule = () => {
    return (
        <div className="schedule-container">
            <img
                src={scheduleImage}
                alt="IGNUS'26 Schedule"
                className="schedule-image"
            />
        </div>
    );
};

export default Schedule;
