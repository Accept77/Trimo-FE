import { useState } from "react";
import Star from "@/components/atoms/Star";
import { Stars } from "@/types/client.types";
import { UseFormSetValue } from "react-hook-form";
import { Review } from "@/types/client.types";

interface Props {
  readOnly?: boolean;
  defaultRate?: number;
  setValue: UseFormSetValue<Review>;
  value: Stars;
}

const stars: Stars[] = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

export default function StarRate({ defaultRate = 0, setValue, value }: Props) {
  const [rate, setRate] = useState(defaultRate);

  const handleClick = (num: Stars) => {
    setRate(num);
    setValue("stars", num);
  };

  const handleMouseOver = (num: number) => {
    setRate(num);
  };

  const handleMouseOut = () => {
    setRate(value);
  };

  return (
    <div className="flex relative">
      {stars.map((el) => (
        <Star
          isChecked={el > rate}
          key={`star${el}`}
          rate={el}
          onClick={handleClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          halfStar={el % 1 !== 0}
        />
      ))}
    </div>
  );
}
