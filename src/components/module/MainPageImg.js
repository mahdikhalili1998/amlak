import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

function MainPageImg({ name, title }) {
  return (
    <Link
      href={`/resedentionals/?category=${name}`}
      className="flex items-center justify-between gap-5 px-3 tabletz:flex-col-reverse"
    >
      <div className="flex items-center gap-3">
        {" "}
        <FaChevronRight className="dark:text-white md:hidden" />
        <span className="text-sm font-semibold dark:text-white">{title}</span>
      </div>
      <Image
        src={`/images/${name}.png`}
        alt={name}
        width={240}
        height={144}
        priority={true}
        className="size-[5rem] rounded-full dark:border-4 dark:border-cyan-500 md:size-[7rem]"
      />
    </Link>
  );
}

export default MainPageImg;
