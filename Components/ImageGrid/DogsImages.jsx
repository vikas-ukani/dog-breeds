import Image from "next/image";

const DogsImages = ({ images }) => {
  return (
    <div className="my-6 grid grid-cols-5 p-4 gap-4 bg-white shadow-lg duration-300  rounded-xl border-2">
      {images.map((item, i) => (
        <div key={i} className="rounded-lg dark:border-gray-700 py-2 " >
          <Image src={item} alt={`Dog_Image_${i}`} 
          className="object-cover h-36 w-36 rounded-lg shadow hover:shadow-lg hover:-translate-y-1 hover:scale-105 cursor-pointer image-container duration-300"
            width={250} height={250}
            loading="eager"
          />
        </div>
      ))}
    </div>
  );
}

export default DogsImages;