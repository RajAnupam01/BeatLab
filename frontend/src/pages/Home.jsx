import Layout from '../components/Layout';
import { SongData } from '../contexts/songContext';
import AlbumItem from '../components/AlbumItem';
import SongItem from '../components/SongItem';
import Loading from '../components/Loading';


function Home() {

const { songs, albums, songsLoading, albumsLoading } = SongData();

if (songsLoading || albumsLoading) {
  return (
    <Layout>
      <Loading/>
    </Layout>
  );
}

  return <Layout>
    <div className="mt-4">
      <h1 className="my-5 font-bold text-2xl" >Featured Charts</h1>
      <div className="flex overflow-auto" >
        {albums.map((e, i) => (
          <AlbumItem key={i} image={e.thumbnail} name={e.title} desc={e.description} id={e._id} />
        ))
        }
      </div>
    </div>

    <div className="mb-4">
      <h1 className="my-5 font-bold text-2xl" >Todays Biggest Hits</h1>
      <div className="flex overflow-auto" >
        {songs.map((e, i) => (
          <SongItem key={i} image={e.thumbnail} name={e.title} desc={e.description} id={e._id} />
        ))
        }
      </div>

    </div>
  </Layout>
}

export default Home