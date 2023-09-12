import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './SliderFilter.css'; // You need to create a CSS file for your component styles

const SliderFilter = ({ minValue, maxValue, onChange }) => {
    const [sliderValue, setSliderValue] = useState([minValue, maxValue]);

    const handleSliderChange = (values) => {
        setSliderValue(values);
        onChange(values); // Notify parent component about the slider value change
    };

    return (
        <div className="slider-filter">
            <Slider
                range
                min={minValue}
                max={maxValue}
                value={sliderValue}
                onChange={handleSliderChange}
            />
            <div className="slider-values">
                <span>{sliderValue[0]}</span>
                <span>{sliderValue[1]}</span>
            </div>
        </div>
    );
};

export default SliderFilter;