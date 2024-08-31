'use client';

import { Box } from '@/components/Box';
import { MdOutlineErrorOutline } from "react-icons/md";

const Error = () => {
  return (
    // <Box className="h-full flex items-center justify-center">
    //   <div className="text-neutral-400">Something went wrong.</div>
    // </Box>
    <Box className="flex flex-col w-full h-full items-center justify-center text-center">
        <div className="flex flex-col gap-y-2 items-center text-center">
            <MdOutlineErrorOutline size={36} className="text-white" />
            <p className="text-white font-bold text-lg">Something went wrong</p>
            <p className="text-neutral-400 font-medium text-md">Please make sure you are connected to the internet.</p>
        </div>
    </Box>
  );
};

export default Error;
