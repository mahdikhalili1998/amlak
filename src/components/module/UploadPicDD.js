"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage"; // از این استفاده کنید
import { supabase } from "../../../supabase";
import SelectedPic from "./SelectedPic";

export default function Upload({ adInfo, setAdInfo }) {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
      setImage(file);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (!image) return;

    try {
      const croppedImageBlob = await getCroppedImg(
        previewUrl,
        croppedAreaPixels,
      );
      const fileExt = image.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { data, error } = await supabase.storage
        .from("image")
        .upload(filePath, croppedImageBlob);

      if (error) {
        console.error("Error uploading image:", error.message);
      } else {
        const { data: publicUrlData, error: publicUrlError } =
          await supabase.storage.from("image").getPublicUrl(filePath);

        if (publicUrlError) {
          console.error("Error getting public URL:", publicUrlError.message);
        } else {
          setAdInfo({
            ...adInfo,
            picUrl: [...adInfo.picUrl, publicUrlData.publicUrl],
          });
          setPreviewUrl(null);
          setImage(null);
        }
      }
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p className="rounded-xl border-2 border-dashed border-blue-600 px-10 py-16 dark:text-white">
          فایل را اینجا بکشید یا کلیک کنید تا آپلود شود.
        </p>
      </div>
      <h3 className="flex items-center gap-1 text-xs font-medium dark:text-white">
        <span className="mt-[2px] justify-center text-lg font-medium text-red-600">
          *
        </span>{" "}
        اولین عکس به عنوان کاور استفاده میشود
      </h3>
      {previewUrl && (
        <div className="relative h-64 w-64">
          <Cropper
            image={previewUrl}
            crop={crop}
            zoom={zoom}
            aspect={170 / 210}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
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
