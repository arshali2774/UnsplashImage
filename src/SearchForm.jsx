import React from 'react';
import { toast } from 'react-hot-toast';
import { useGlobalContext } from './context';

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    if (!searchValue) {
      toast.error('Enter a Value', {
        duration: 1500,
        position: 'top-center',
      });
    } else {
      setSearchTerm(searchValue);
    }
  };
  return (
    <section>
      <h1 className='title'>Unsplash Images</h1>
      <form
        className='search-form'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          className='form-input search-input'
          name='search'
          placeholder='cat'
        />
        <button
          type='submit'
          className='btn'
        >
          search
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
