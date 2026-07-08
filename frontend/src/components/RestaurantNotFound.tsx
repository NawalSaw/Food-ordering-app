type Props = {
  imageUrl: string;
  alt?: string;
  text?: string;
};

const RestaurantNotFound = ({ imageUrl, alt, text }: Props) => {
  return (
    <div className="flex flex-col my-[20%] items-center justify-center">
      <img
        className="rounded-full items-center w-80 "
        src={imageUrl}
        alt={alt ? alt : "restaurant not found"}
      />
      <h1 className="text-3xl font-bold">{text ? text : "Restaurant not found"}</h1>
    </div>
  );
};

export default RestaurantNotFound;
