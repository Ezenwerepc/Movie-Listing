import React, { useState, useRef } from 'react';

import classes from './AddMovie.module.css';

function AddMovie(props) {
 const [enteredTitle, setenteredTitle] = useState('')
 const [enteredOpeningText, setenteredOpeningText] = useState('')
  const [enteredReleaseDate, setenteredReleaseDate] = useState('')
  
  const titleRef = useRef('');
  const openingTextRef = useRef('');
  const releaseDateRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    props.onAddMovie(movie)
    setenteredTitle('');
    setenteredOpeningText('');
    setenteredReleaseDate('');
  }
  
  const titleChangeHandler = (event)=>{
    setenteredTitle(event.target.value);
  };
  const openingTextChangeHandler = (event) =>{
    setenteredOpeningText(event.target.value);
  };
  const releaseDateChangeHandler = (event) =>{
    setenteredReleaseDate(event.target.value);
  };
  
  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleRef} onChange={titleChangeHandler} value={enteredTitle} />
      </div>
      <div className={classes.control}>
        <label htmlFor='opening-text'>Opening Text</label>
        <textarea rows='5' id='opening-text' ref={openingTextRef} onChange={openingTextChangeHandler} value={enteredOpeningText}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor='date'>Release Date</label>
        <input type='text' id='date' ref={releaseDateRef} onChange={releaseDateChangeHandler} value={enteredReleaseDate}/>
      </div>
       <button>Add Movie</button>
      <button onClick={props.onClose} >Cancel</button>
    </form>
  );
}

export default AddMovie;
