import { useQuery } from '@tanstack/react-query';
import customFetch from './utils';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useGlobalContext } from './context';
const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const [isSkeleton, setIsSkeleton] = useState(false);
  const { isLoading, data, isError, isFetching } = useQuery({
    queryKey: ['images', searchTerm],
    queryFn: async () => {
      try {
        const { data } = await customFetch(
          `?client_id=${
            import.meta.env.VITE_CLIENT_ID
          }&page=1&query=${searchTerm}`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSkeleton(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  if (isError) {
    toast.error('There was an error...');
    return <></>;
  }
  if (data?.results?.length < 1) {
    return (
      <section className='image-container'>
        <h1>No Images Found</h1>
      </section>
    );
  }
  return (
    <>
      {!isSkeleton ? (
        <section className='image-container'>
          {data?.results.map((item) => {
            const url = item?.urls?.regular;
            return (
              <Skeleton
                variant='rounded'
                animation='wave'
                width={'100%'}
                key={item.id}
              >
                <div className='img-div'>
                  <img
                    src={url}
                    alt={item.alt_description}
                    className='img'
                  />
                </div>
              </Skeleton>
            );
          })}
        </section>
      ) : (
        <section className='image-container'>
          {data?.results.map((item) => {
            const url = item?.urls?.regular;
            return (
              <div
                className='img-div'
                key={item.id}
              >
                <img
                  src={url}
                  alt={item.alt_description}
                  className='img'
                />
              </div>
            );
          })}
        </section>
      )}
    </>
  );
};

export default Gallery;
