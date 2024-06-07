"use client";

import { useState } from "react";
import TextInput from "../module/TextInput";
import { p2e } from "@/utils/replaceNumber";
import RadioList from "../module/RadioList";
import TextList from "../module/TextList";
import { FaRegEdit } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { deleteHandlerd } from "@/funcs/helper";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePickers from "../module/DatePicker";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";

function AddAdsPage() {
  const [adInfo, setAdInfo] = useState({
    title: "",
    description: "",
    location: "",
    phone: "",
    price: "",
    realState: "",
    constractionDate: new Date(),
    category: "",
    rules: [],
    options: [],
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    title,
    description,
    location,
    phone,
    price,
    realState,
    constractionDate,
    category,
    rules,
    options,
  } = adInfo;

  const [editRules, setEditRules] = useState({});
  const [saveEdit, setSaveEdite] = useState("");

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAdInfo({ ...adInfo, [name]: p2e(value) });
  };

  const radioHandler = (e) => {
    const { name, value } = e.target;
    setAdInfo({ ...adInfo, category: name });
  };

  const editHandler = (index, string) => {
    setEditRules({ index, string });
    setSaveEdite(adInfo[string][index]);
  };

  const saveHandler = (index, string) => {
    adInfo[string][index] = saveEdit;
    setEditRules("");
  };

  const deleteHandler = (rules, index, string) => {
    setAdInfo({ ...adInfo, [string]: deleteHandlerd(rules, index) });
  };

  const submitHandler = async () => {
    setLoading(true);
    await axios
      .post("/api/add-ad", {
        title,
        description,
        location,
        phone,
        price,
        realState,
        constractionDate,
        category,
        rules,
        options,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message, {
            position: "top-center",
            transition: Flip,
          });
          router.push("/dashbord");
        }
      })
      .catch((error) => {
        if (error) {
          toast.error(error.response.data.error, {
            position: "top-center",
            transition: Flip,
          });
        }
      });
    setLoading(false);
  };

  return (
    <div>
      <h1 className="mb-10 w-full rounded-lg bg-blue-200 px-3 py-2 text-center text-xl font-semibold text-blue-800">
        ثبت آگهی{" "}
      </h1>
      <div className="space-y-6">
        <TextInput
          type="text"
          label="عنوان"
          name="title"
          adInfo={adInfo}
          changeHandler={changeHandler}
        />
        <TextInput
          type="text"
          label="توضیحات"
          name="description"
          adInfo={adInfo}
          textArea={true}
          changeHandler={changeHandler}
        />
        <TextInput
          type="text"
          label="آدرس"
          name="location"
          adInfo={adInfo}
          changeHandler={changeHandler}
        />
        <TextInput
          type="number"
          label="شماره تماس"
          name="phone"
          adInfo={adInfo}
          changeHandler={changeHandler}
        />
        <TextInput
          type="number"
          label="قیمت ( تومان )"
          name="price"
          adInfo={adInfo}
          changeHandler={changeHandler}
        />
        <TextInput
          type="text"
          label="بنگاه"
          name="realState"
          adInfo={adInfo}
          changeHandler={changeHandler}
        />

        <div className="space-y-3">
          <h1 className="text-base font-semibold">دسته بندی : </h1>
          <div className="flex items-center justify-between">
            <RadioList
              name="villa"
              label="ویلا"
              adInfo={adInfo}
              radioHandler={radioHandler}
            />
            <RadioList
              name="department"
              label="آپارتمان"
              adInfo={adInfo}
              radioHandler={radioHandler}
            />
            <RadioList
              name="office"
              label="دفتر"
              adInfo={adInfo}
              radioHandler={radioHandler}
            />
            <RadioList
              name="store"
              label="مغازه"
              adInfo={adInfo}
              radioHandler={radioHandler}
            />
          </div>
        </div>
        <div className="space-y-4 font-medium">
          <h2 className="text-center">قوانین ساختمان</h2>
          {adInfo.rules.length
            ? adInfo.rules?.map((i, index) => (
                <ul className="text-[14px]/3 font-semibold" key={index}>
                  {editRules.index === index && editRules.string === "rules" ? (
                    <div className="flex items-center gap-3">
                      <input
                        className="rounded-lg border-2 border-blue-600 px-2 py-1 text-center focus:outline-none"
                        value={saveEdit}
                        onChange={(e) => setSaveEdite(e.target.value)}
                      />

                      <span onClick={(e) => saveHandler(index, "rules")}>
                        <IoIosSave className="text-2xl text-green-700" />
                      </span>
                    </div>
                  ) : (
                    <li className="flex w-max cursor-pointer items-center gap-3 rounded-lg px-2 py-1">
                      <span className="rounded-lg bg-red-300 px-2 py-2 text-red-900">
                        {" "}
                        _ {i}
                      </span>
                      <span>
                        <FaRegEdit
                          onClick={(e) => editHandler(index, "rules")}
                          className="text-xl text-blue-800"
                        />
                      </span>
                      <span>
                        <RiDeleteBin5Fill
                          onClick={(e) =>
                            deleteHandler(adInfo.rules, index, "rules")
                          }
                          className="text-xl text-red-800"
                        />
                      </span>
                    </li>
                  )}
                </ul>
              ))
            : null}
          <TextList
            label="قوانین"
            adInfo={adInfo}
            name="rules"
            setAdInfo={setAdInfo}
          />
        </div>
        <div className="space-y-4 font-medium">
          <h2 className="text-center">امکانات</h2>
          {adInfo.options.length
            ? adInfo.options?.map((i, index) => (
                <ul className="text-[14px]/3 font-semibold" key={index}>
                  {editRules.index === index &&
                  editRules.string === "options" ? (
                    <div className="flex items-center gap-3">
                      <input
                        className="rounded-lg border-2 border-blue-600 px-2 py-1 text-center focus:outline-none"
                        value={saveEdit}
                        onChange={(e) => setSaveEdite(e.target.value)}
                      />

                      <span onClick={(e) => saveHandler(index, "options")}>
                        <IoIosSave className="text-2xl text-green-700" />
                      </span>
                    </div>
                  ) : (
                    <li className="flex w-max cursor-pointer items-center gap-3 rounded-lg px-2 py-1">
                      <span className="text-green-90 rounded-lg bg-green-300 px-2 py-2">
                        _ {i}
                      </span>
                      <span>
                        <FaRegEdit
                          onClick={(e) => editHandler(index, "options")}
                          className="text-xl text-blue-900"
                        />
                      </span>
                      <span>
                        <RiDeleteBin5Fill
                          onClick={(e) =>
                            deleteHandler(adInfo.options, index, "options")
                          }
                          className="text-xl text-red-800"
                        />
                      </span>
                    </li>
                  )}
                </ul>
              ))
            : null}
          <TextList adInfo={adInfo} name="options" setAdInfo={setAdInfo} />
        </div>
        <div>
          <DatePickers adInfo={adInfo} setAdInfo={setAdInfo} />
        </div>
        <ToastContainer />

        {loading ? (
          <div className="mx-auto w-max ">
            {" "}
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#2563eb"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <button
            className="mx-auto w-full rounded-xl bg-blue-600 px-2 py-1 text-2xl text-white"
            onClick={submitHandler}
          >
            ثبت آگهی{" "}
          </button>
        )}
      </div>
    </div>
  );
}

export default AddAdsPage;
