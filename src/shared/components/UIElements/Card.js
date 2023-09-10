import React from "react";

import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

import "./Card.css";

const Card = (props) => {
  const handlerContentChange = (e, factor) => {
    console.log(factor)
    const content = e.target.value;
    console.log(content)
    props.editContent(factor, content)
  }

  return (
    <div
      className={`card ${props.className} ${
        props.persona_detail_card && "detail_card"
      } ${props.domain_card && "domain_card"} ${
        props.appear_normal && "appear_normal"
      } ${props.appear_fast && "appear_fast"}`}
      style={{ width: props.width, minHeight: props.min_height }}
    >
      {props.children}
      {/* {props.edit && <CloseIcon color='error' fontSize='large' className="close_card" />} */}
      {props.content && (
        <div>
          {Object.keys(props.content).map((key) => (
            <div key={key}>
              <h3>{key}</h3>
              {props.edit ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  multiline={props.multiline}
                  value={props.content[key]}
                  onChange={(e) => handlerContentChange(e, key)}
                />
              ) : (
                <p>{props.content[key]}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
