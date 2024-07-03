"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "../../../supabase";
import SelectedPic from "./SelectedPic";

export default function Upload({ adInfo, setAdInfo }) {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (!image) return;

    const fileExt = image.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    let { data, error } = await supabase.storage
      .from("image")
      .upload(filePath, image);

    if (error) {
      console.error("Error uploading image:", error.message);
    } else {
      console.log("Image uploaded successfully");
      const { data: publicUrlData, error: publicUrlError } =
        await supabase.storage.from("image").getPublicUrl(filePath);

      if (publicUrlError) {
        console.error("Error getting public URL:", publicUrlError.message);
      } else {
        // console.log("Public URL:", publicUrlData.publicUrl);
        setAdInfo({
          ...adInfo,
          picUrl: [...adInfo.picUrl, publicUrlData.publicUrl],
        });
        // setPreviewUrl(publicUrlData.publicUrl);
        setPreviewUrl(null);
        setImage(null);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p className="rounded-xl border-2 border-dashed border-blue-600 px-10 py-16">
          فایل را اینجا بکشید یا کلیک کنید تا آپلود شود.
        </p>
      </div>
      {previewUrl && (
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="font-semibold">پیش‌نمایش:</h2>
          <img
            className="rounded-lg"
            src={previewUrl}
            alt="Uploaded Image"
            style={{ width: "150px" }}
          />
        </div>
      )}
      <button
        className="cursor-pointer rounded-xl bg-cyan-500 px-2 py-1 font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
        disabled={!image}
        onClick={handleUpload}
      >
        آپلود تصاویر
      </button>
      <SelectedPic adInfo={adInfo.picUrl} />
    </div>
  );
}
