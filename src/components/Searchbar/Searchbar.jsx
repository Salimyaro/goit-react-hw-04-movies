import { useState } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [queue, setQueue] = useState('');

  const handleChange = ({ target }) => {
    setQueue(target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(queue);
    setQueue('');
  };

  return (
    <div className={s.searchbar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <span className={s.label}>Search</span>
        </button>
        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          value={queue}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
