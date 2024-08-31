'use client';

import { Box } from '@/components/Box';

import { Bars } from 'react-loader-spinner';

const Loading = () => {
  return (
    <Box className="h-full flex items-center justify-center">
      {/* <Triangle
        height="80"
        width="80"
        color="#1DB954"
        ariaLabel="triangle-loading"
        visible={true}
      /> */}
      <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          />
    </Box>
  );
};

export default Loading;
