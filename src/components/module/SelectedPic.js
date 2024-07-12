import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { use, useState } from "react";
import { IoIosEyeOff } from "react-icons/io";

function SelectedPic({ adInfo }) {
  const [preview, setPreview] = useState(null);
  const [urls, setUrls] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const router = useRouter();
  // console.log({ url, preview });

  const deleteHandler = (item) => {
    const index = adInfo.indexOf(item);
    if (index > -1) {
      adInfo.splice(index, 1);
    }
    router.refresh();
  };

  const previewHandler = (item) => {
    setUrls(item);
    setPreview(item);
  };
  const closePreviewHandler = (item) => {
    setUrls("");
    setPreview(null);
  };
  return (
    <div className={`space-y-5`}>
      {adInfo.length ? <h2>عکس های انتخاب شده :</h2> : null}
      <div className="flex flex-col items-center justify-center rounded-lg py-3 shadow-xl shadow-blue-300 dark:shadow-cyan-700 450:grid 450:grid-cols-3 450:gap-1 450:gap-y-3 sm:grid-cols-4">
        {adInfo.map((item) => (
          <div
            className="flex flex-col items-center justify-center 450:px-3"
            key={item}
          >
            <Image
              className="m-1 size-[6rem] rounded-full border-2 border-cyan-600"
              src={item}
              alt={item}
              width={500} // عرض تصویر
              height={300} // ارتفاع تصویر
            />
            <div className="flex items-center gap-1">
              <MdDelete
                onClick={(e) => deleteHandler(item)}
                className="text-xl text-red-500"
              />
              {item === urls ? (
                <IoIosEyeOff
                  onClick={(e) => closePreviewHandler(item)}
                  className="text-xl text-red-500"
                />
              ) : (
                <FaEye
                  onClick={(e) => previewHandler(item)}
                  className="text-xl text-green-500"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {preview && urls ? (
        <div className="450:flex 450:justify-center">
          <img
            className="h-auto w-[150px] rounded-lg"
            src={preview}
            alt="Uploaded Image"
          />
        </div>
      ) : null}
    </div>
  );
}

export default SelectedPic;
