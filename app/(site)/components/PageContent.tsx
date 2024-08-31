'use client';

import { SongItem } from '@/components/SongItem';
import { useOnPlay } from '@/hooks/useOnPlay';
import { Song } from '@/types';
import { MdOutlineMusicOff } from "react-icons/md";

interface PageContentProps {
  songs: Song[];
}

export const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    // return <div className="mt-4 text-neutral-400">No songs available</div>;
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] w-full text-center">
          <div className="flex flex-col gap-y-2 items-center">
              <MdOutlineMusicOff size={36} className="text-white" />
              <p className="text-white font-bold text-lg">No songs available.</p>
              <p className="text-neutral-400 font-medium text-md">Please make sure you are connected to the internet or songs were added.</p>
          </div>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8
        gap-4
        mt-4
        "
    >
      {songs.map((item) => (
        <SongItem key={item.id} onClick={(id: string) => onPlay(id)} data={item} />
      ))}
    </div>
  );
};
