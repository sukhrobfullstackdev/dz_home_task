import { GetServerSideProps } from "next";
import Image from "next/image";
import { Artwork } from "@/types/typings";

interface Props {
  artwork: Artwork;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const objectId = context.params?.id as string;

  const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
  const artwork: Artwork = await res.json();

  if (!artwork) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      artwork,
    },
  };
};

const ArtworkPage = ({ artwork }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between px-[20px]">
  
  <div className="flex flex-col gap-[10px] sm:w-1/2">
    <h3 className="text-[16px] leading-[24px] font-medium text-black mt-[40px]">{artwork.title}</h3>
    <h3 className="text-[16px] leading-[24px] font-medium text-black italic mb-[40px]">
      {artwork.artistDisplayName}, {artwork.accessionYear}
    </h3>
    <p className="text-[14px] leading-[22px] font-medium text-[#757575]">{artwork.medium}</p>
    <p className="text-[14px] leading-[22px] font-medium text-[#757575]">{artwork.department}</p>
    <p className="text-[14px] leading-[22px] font-medium text-[#757575]">{artwork.artistNationality}</p>
  </div>


  <div className="flex flex-col gap-[20px] sm:w-1/2">
    {artwork.primaryImage ? (
      <Image 
        src={artwork.primaryImage} 
        alt={artwork.title} 
        width={927} 
        height={700} 
        className="w-full h-auto object-cover"
      />
    ) : (
      <p className="text-gray-500 mt-4">No image available</p>
    )}
  </div>
</div>

  );
};

export default ArtworkPage;
