type CardOneType = {
  title: string;
  value: string;
  color: string;
};
const CardOne = ({ title, value, color }: CardOneType) => {
  return (
    <div className="bg-white p-8   border flex align-middle rounded shadow-lg text-center grow">
      <div className="w-full">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p
          className={`font-bold text-3xl text-white ${color} w-10 h-10 rounded-full mx-auto mt-4`}
        >
          {value}
        </p>
      </div>
    </div>
  );
};

export default CardOne;
