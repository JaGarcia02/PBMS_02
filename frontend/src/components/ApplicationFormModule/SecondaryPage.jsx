import React from "react";
import { IoIosCloudUpload } from "react-icons/io";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { useDropzone } from "react-dropzone";
import { BsCloudUpload } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiCloudUpload } from "react-icons/bi";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
const SecondaryPage = ({ setToggleState, setFieldForms, fieldForms }) => {
  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop: (acceptFiles) => {
      setFieldForms({ ...fieldForms, picture: acceptFiles[0] });
      console.log(
        acceptFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
  });

  return (
    <div className="w-full h-119 relative items-center flex-col flex ">
      <span className="arial-narrow-bold mt-4 text-[20px]">
        COVER LETTER AND FORMAL PHOTO
      </span>

      <form
        onSubmit={() => setToggleState(3)}
        className="w-[95%] h-119  bg-white text-start  flex flex-col"
      >
        <div className="h-10 flex  mt-2 items-center justify-center w-full">
          <div className="rounded-full flex-col items-center justify-center flex w-6 h-6  empmanage-border text-white">
            <p className="mt-5 font-bold text-[12px]">1</p>
            <span className="mt-3 text-black text-[10px] w-30 text-center  text-gray-500">
              Application Form
            </span>
          </div>
          <hr className="border border-green-800 w-15" />
          <div className="rounded-full flex-col items-center justify-center flex w-6 h-6  empmanage-border text-white">
            <p className="mt-5 font-bold text-[12px]">2</p>
            <span className="mt-3 text-black text-[10px] w-30 text-center  text-gray-500">
              Cover Letter
            </span>
          </div>
          <hr className="border border-black w-15" />
          <div className="rounded-full flex-col items-center justify-center flex w-6 h-6 shadow-sm shadow-black border border-black text-black">
            <p className="mt-5 font-bold text-[12px]">3</p>
            <span className="mt-3 text-black text-[10px] w-30 text-center  text-gray-500">
              Upload Resume
            </span>
          </div>
        </div>
        <span className="arial-narrow-bold mt-7 ml-4 text-[13px] flex w-full">
          Cover Letter <p className="text-[13px] text-red-500 ml-1">*</p>
        </span>
        <textarea
          className="rounded-sm pt-2 border mt-2 text-[13px]  self-center mr-1 arial-narrow  border-black h-40 w-[90%] pl-2 resize-none"
          placeholder="Please specify why are you qualified for the position."
          onChange={(e) =>
            setFieldForms({ ...fieldForms, coverletter: e.target.value })
          }
          value={fieldForms.coverletter}
          required
        />
        <span className="self-center flex text-[13px] text-black arial-narrow-bold text-[15px] mt-6">
          {" "}
          Upload Formal Photo <p className="text-red-500 ml-1">*</p>
        </span>
        <div className="h-15 w-70 mt-1  self-center flex border-gray-400 items-center justify-center rounded-md  cursor-pointer overflow-auto border">
          <div
            className="h-14 w-80 flex items-center justify-center flex-col rounded-md  cursor-pointer  "
            {...getRootProps()}
            id="file"
          >
            {fieldForms.picture ? (
              <div className="flex items-center">
                <label>{fieldForms.picture?.name}</label>
                <img
                  src={fieldForms.picture?.preview}
                  className="h-16 w-16 object-contain p-3"
                />
              </div>
            ) : isDragReject ? (
              <p>IMAGE ONLY!</p>
            ) : (
              <>
                <BiCloudUpload className="text-[40px] mr-4 text-blue-600" />
                <p className="font-Roboto arial-narrow-bold text-[12px] flex mt-1 text-gray-400">
                  Drag and drop or{" "}
                  <p className="text-blue-600 mx-1  underline"> browse</p> your
                  jpg files.
                </p>
              </>
            )}
          </div>
          <input type="file" accept="image/" {...getInputProps()} />
          <button
            onClick={() => setToggleState(1)}
            className=" border-black absolute top-3  left-2  border-none active:scale-1 self-center text-[14px] h-7 w-7 items-center   active:duration-75 transition-all hover:(scale-130 ease-in-out  transform py-1 )   flex items-center justify-center text-black    disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent  text-black)"
          >
            <HiArrowSmLeft className=" text-black text-[30px]" />
          </button>
        </div>
        <div className=" w-full justify-between w-[95%] absolute bottom-0 flex">
          <button
            type="submit"
            className=" absolute bottom-2  right-4 border-none active:scale-1 self-center text-[14px] h-7 w-7 items-center   active:duration-75 transition-all hover:(scale-130 ease-in-out  transform py-1 )   flex items-center justify-center text-black    disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent  text-black)"
          >
            <HiArrowSmRight className="font-bold  text-[30px] " />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecondaryPage;
