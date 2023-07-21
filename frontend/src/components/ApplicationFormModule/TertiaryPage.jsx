import React, { useState } from "react";
import { IoIosCloudUpload } from "react-icons/io";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { useDropzone } from "react-dropzone";
import { BsCloudUpload } from "react-icons/bs";
import { BiCloudUpload } from "react-icons/bi";
import { HiArrowSmLeft } from "react-icons/hi";
import { AiOutlineFileDone, AiFillCloseSquare } from "react-icons/ai";
const TertiaryPage = ({
  setToggleState,
  setFieldForms,
  fieldForms,
  applicantSubmit,
}) => {
  const [showTerms, setShowTerms] = useState(false);
  const [checkCondi, setCheckCondi] = useState({
    hereby: false,
    agree: false,
  });
  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    onDrop: (acceptFiles) => {
      setFieldForms({ ...fieldForms, resume: acceptFiles[0] });
      console.log(
        acceptFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
  });

  const TermsCondition = ({ setShowTerms }) => {
    return (
      <div className="h-115 w-[90%] mt-4 absolute flex flex-col">
        <div className="bg-white h-18 p-5 flex items-start border border-gray-500 relative">
          <AiFillCloseSquare
            className="absolute top-1 right-1 text-[18px] text-red-600 cursor-pointer"
            onClick={() => setShowTerms(false)}
          />
          <AiOutlineFileDone className="text-[40px]" />
          <div className="flex items-start justify-center w-full h-full flex-col">
            <span className="arial-narrow-bold  text-[20px] mt-1 ml-2">
              TERMS OF SERVICE
            </span>
          </div>
        </div>
        <div className="h-[80%] bg-white p-3 overflow-auto border border-gray-500">
          <ol className="list-decimal mx-3 arial-narrow-bold">
            <li className="text-[14px]">
              Applicant Declaration, Acceptance, Understanding and Compliance
            </li>
            <p className="text-justify inter-word arial-narrow text-[13px] mt-3 ">
              I hereby declare that all the above information is true and
              correct. I further declare that the Company has the right to
              terminate my services at any time should there be any false
              information in the above and in the application form that I filled
              out. I also agree to be bound by and faithfully observe and abide
              by all policies, systems, procedures, rules and regulations which
              are in effect, as well as their changes/amendments that may be
              implemented from time to time. I further warrant protection of
              Company information, trade secrets, business methods and practices
              that any unauthorized disclosure/breach of such will be a cause
              for the termination of my employment for cause and/or institution
              of legal action.
              <br /> <br />I shall immediately notify Human Resources Department
              of any changes in my personal information such as (but not limited
              to) change of status, addition or reduction of dependents, change
              of residence, cellphone/telephone numbers, etc
              <br />
              <br />
            </p>
            <li className="mt-5 text-[14px]">Consent</li>
            <p className="text-justify inter-word arial-narrow text-[13px] mt-3">
              This also certifies that by saving/indicating my thumbmarks and/or
              signatures below that I give my FULL CONSENT to PESO RESOURCES
              DEVELOPMENT CORPORATION (PRDC) and its partners, if any, to
              collect, store, access and/or process within the Philippines,
              whether manually or electronically, any personal data I may
              provide in connection with my employment including but not limited
              to any of its marketing or promotional activities. This consent
              shall be valid and continuing, unless expressly withdrawn by me
              for the period allowed in accordance with Republic Act No. 10173,
              otherwise known as Data Privacy Act of 2012 and its Implementing
              Rules and Regulations.
            </p>
          </ol>
        </div>
      </div>
    );
  };

  return (
    <form
      onSubmit={applicantSubmit}
      className="w-full h-119 relative items-center relative flex-col flex "
    >
      <span className="arial-narrow-bold mt-4 text-[20px]">RESUME</span>

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
        <hr className="border border-green-800 w-15" />
        <div className="rounded-full flex-col items-center justify-center flex w-6 h-6  empmanage-border text-white">
          <p className="mt-5 font-bold text-[12px]">3</p>
          <span className="mt-3 text-black text-[10px] w-30 text-center  text-gray-500">
            Upload Resume
          </span>
        </div>
      </div>
      <span className="mt-15 w-full flex items-center  arial-narrow-bold justify-center text-[13px]">
        Upload Resume <p className="text-red-500 ml-1">*</p>
      </span>
      <div className=" h-15 w-70 mt-1  self-center flex border-black items-center justify-center rounded-md  cursor-pointer overflow-auto border">
        <div
          className="h-14 w-80 flex items-center justify-center flex-col rounded-md  cursor-pointer  "
          {...getRootProps()}
          id="file"
        >
          {fieldForms.resume ? (
            <div className="flex items-center">
              <label>{fieldForms.resume?.name}</label>
              <iframe
                src={fieldForms.resume?.preview}
                className="h-16 w-16 object-contain p-3"
              />
            </div>
          ) : isDragReject ? (
            <p>IMAGE ONLY!</p>
          ) : (
            <>
              <BiCloudUpload className="text-[40px] mr-4 text-blue-600" />
              <p className="font-Roboto text-[12px] text-gray-400">
                Choose a file or drag it here.
              </p>
            </>
          )}
        </div>
        <input type="file" accept="/pdf" {...getInputProps()} />
      </div>
      <span className="text-[13px] mt-20 arial-narrow-bold text-black">
        Applicant Declaration, Acceptance, and Consent
      </span>
      <div className="flex flex-col items-center justify-start w-full text-start">
        <div className="flex mt-5 items-center mr-[3.4rem] justify-center">
          <input
            type="checkbox"
            className=""
            onChange={(e) =>
              setCheckCondi({ ...checkCondi, hereby: e.target.checked })
            }
          />
          <span className="text-[10px] ml-2">
            I hereby declare that all the above information is true and correct.
          </span>
        </div>
        <div className="flex mt-3 items-center w-full justify-center">
          <input
            type="checkbox"
            className=""
            onChange={(e) =>
              setCheckCondi({ ...checkCondi, agree: e.target.checked })
            }
          />
          <span className="text-[10px] flex ml-2">
            I agree to PESO Resources Development Corporation's
            <p
              onClick={() => setShowTerms(true)}
              className="cursor-pointer ml-1 text-blue-800 underline"
            >
              Terms and Conditions.
            </p>
          </span>
        </div>
      </div>
      <button
        onClick={() => setToggleState(2)}
        className=" border-black absolute top-3  left-2  border-none active:scale-1 self-center text-[14px] h-7 w-7 items-center   active:duration-75 transition-all hover:(scale-130 ease-in-out  transform py-1 )   flex items-center justify-center text-black    disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent  text-black)"
      >
        <HiArrowSmLeft className=" text-black text-[30px]" />
      </button>
      <div className=" w-full justify-center absolute bottom-0 w-[95%] flex">
        <button
          type="submit"
          disabled={
            checkCondi.agree == false || checkCondi.hereby == false
              ? true
              : false
          }
          className="items-center justify-center bg-green-800 border-green-800  active:scale-1 self-center rounded-sm text-[14px] h-7 w-20  hover:(border-green-500 rounded-sm) active:duration-75 transition-all hover:(scale-108 ease-in-out  transform py-1 rounded-sm)  mb-5 flex      disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent border-green-500 border-2 text-green-500) text-white"
        >
          Submit
        </button>
      </div>

      {showTerms && <TermsCondition setShowTerms={setShowTerms} />}
    </form>
  );
};

export default TertiaryPage;
