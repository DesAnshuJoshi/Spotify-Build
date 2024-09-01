import { getSongs } from '@/actions/getSongs';
import { Header } from '@/components/Header';
import { PageContent } from './components/PageContent';
import { getUserDetails } from '@/actions/getUserDetails';


export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  const userDetails = await getUserDetails();

  const safeUserDetails = userDetails && userDetails.email ? userDetails : undefined;

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-hidden">
      <Header userDetails={safeUserDetails} />
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Latest Songs</h1>
        </div>
        <div>
          <PageContent songs={songs} />
          {/* {songs.map((song) => <div>{song.title}</div>)} */}
        </div>
      </div>
    </div>
  );
}
