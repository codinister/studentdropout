type CardOneType = {
  title: string;
  value: string;
};
const CardTwo = ({ title, value }: CardOneType) => {
  return (
    <div className="bg-white   flex align-middle text-center grow">
      <div className="w-full">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className={`font-bold text-3xl  mx-auto mt-2`}>{value}</p>
      </div>
    </div>
  );
};

export default CardTwo;
