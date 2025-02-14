import { Artwork, Tag } from "@/types/typings";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

const Card = ({primaryImage, tags, medium, dimensions, artistNationality, artistDisplayName}: Pick<Artwork, "primaryImage" | "tags" | "medium" | "dimensions" | "artistNationality" | "artistDisplayName">) => {
    const { ref, inView } = useInView({
        triggerOnce: true,  
        threshold: 0.2,  
      });
    return (
        <div ref={ref} className="flex flex-col justify-start">
                <div className="relative w-full h-60 mb-[10px]">
                {inView && <Image
                    src={primaryImage || '/example.png'}
                    alt={"Art"}
                    fill
                    className="object-cover rounded-md"
                    loading="lazy"
                    priority={false}
                />}
                </div>
              <p className="text-[16px] font-medium leading-[24px] tracking-[0] text-black">{artistDisplayName}</p>
              <p className="text-[16px] font-medium leading-[24px] tracking-[0] text-black italic mb-[10px]">{artistNationality}</p>
              <p className="text-sm font-medium leading-5 text-[#757575]">{dimensions}</p>
              <p className="text-sm font-medium leading-5 text-[#757575]">{medium}</p>
              {tags && <p className="text-sm font-medium leading-5 text-[#757575]">{tags.map((tag: Tag) => <span key={tag.term}>{tag.term}</span>)}</p>}
          </div>
    )
}

export default Card;