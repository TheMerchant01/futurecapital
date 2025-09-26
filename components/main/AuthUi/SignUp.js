/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { subYears } from "date-fns";
const oneHundredYearsAgo = subYears(new Date(), 100);
const eighteenYearsAgo = subYears(new Date(), 16);
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Calendar } from "../../ui/calendar";
import PhoneInput from "react-phone-input-2";
import VerificationPage from "./VerifficationPage";
import { setCookie } from "nookies";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { countryList } from "./countries";
import { FlagIcon } from "react-flag-kit";
import { useTheme } from "../../../contexts/themeContext";
import { useFormContext } from "../../../contexts/formContext";

const stepValidationSchemas = [
  z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email").nonempty("Email is required"),
  }),
  z.object({
    phoneNumber: z
      .string()
      .min(6, "Phone number must be at least 6 numbers")
      .nonempty("Phone number is required"),
    country: z.string().nonempty("Country is required"),
  }),
  z.object({
    gender: z.string().nonempty("Gender is required"),
    dob: z
      .string()
      .nonempty("Date of Birth is required")
      .refine(
        (value) => {
          const dobDate = new Date(value);
          return dobDate <= eighteenYearsAgo && dobDate >= oneHundredYearsAgo;
        },
        {
          message: "You must be 18 years or older to sign up",
        }
      ),
  }),
  z.object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Password is required"),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
  }),
];

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export function DatePickerDemo({ selected, onSelect }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={` justify-start w-full text-left font-normal border-0 hover:text-white hover:bg-slate-800 bg-slate-800 ${
            selected ? "" : "text"
          }`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(selected, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          defaultMonth={new Date(1979, 8)}
          selected={selected}
          onSelect={onSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

const Signup = () => {
  const [showPass, setShowpass] = useState(false);
  const { formData, setFormData, setCookieVar, setCookieVar1, setCookieVar2 } =
    useFormContext();
  const {
    isVerificationStep,
    setIsVerificationStep,
    currentStep,
    setCurrentStep,
  } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, getValues, setError, formState, setValue } =
    useForm({
      mode: "onChange",
      reValidateMode: "onChange",
      resolver: zodResolver(stepValidationSchemas[currentStep]),
    });
  useEffect(() => {
    // Populate the form fields with values from formData when the component mounts
    setValue("name", formData.name);
    setValue("email", formData.email);
    setValue("phoneNumber", formData.phoneNumber);
    setValue("country", formData.country);
    setValue("gender", formData.gender);
    setValue("dob", formData.dob);
    setValue("password", formData.password);
    setValue("confirmPassword", formData.confirmPassword);
  }, [formData, setValue]);
  const [selectedCountry, setSelectedCountry] = useState("us");
  const checkPhoneNumberExists = async (phoneNumber) => {
    try {
      const response = await fetch("/phoneexist/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phoneNumber }),
      });
      const data = await response.json();
      return data.exists;
    } catch (error) {
      return false;
    }
  };
  const handleShowPassword = () => {
    setShowpass(!showPass);
  };
  const checkEmailExists = async (email) => {
    try {
      const response = await fetch("/emailexists/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      return data.exists;
    } catch (error) {
      return false;
    }
  };
  const handleSignupSubmit = async (data) => {
    setIsLoading(true);
    const { confirmPassword, ...finalData } = {
      ...formData,
      ...data,
    };

    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Send the data to your backend
      const response = await fetch("/signup/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      const result = await response.json();

      if (result.success) {
        // If the signup was successful, show the verification page
        await setIsVerificationStep(true);
        await localStorage.setItem("email", result.email);
        await setCookieVar(result.token);
        await setCookieVar1(result.email);
        await setCookieVar2(result.role);
      } else {
        // Handle any errors from the backend
      }
    } catch (error) {
      // Handle any network or other errors
    }
    setIsLoading(false);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleNextStep = async () => {
    setIsLoading(true);
    if (currentStep === 0) {
      const email = getValues("email");
      const emailExists = await checkEmailExists(email);

      if (emailExists) {
        setError("email", {
          type: "manual",
          message: "Email address already in use",
        });
        setIsLoading(false);
        return;
      }
    }
    if (currentStep === 1) {
      const phoneNumber = getValues("phoneNumber");
      const phoneExists = await checkPhoneNumberExists(phoneNumber);
      if (phoneExists) {
        setError("phoneNumber", {
          type: "manual",
          message: "Phone number already in use",
        });
        setIsLoading(false);
        return;
      }
    }

    const currentStepSchema = stepValidationSchemas[currentStep];
    const currentStepData = getValues(); // Get all form values for the current step

    setFormData({
      ...formData,
      ...currentStepData,
    });
    // Validate the current step's data
    const result = currentStepSchema.safeParse(currentStepData);

    if (result.success) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      // The validation failed
      for (const [key, value] of Object.entries(
        result.error.flatten().fieldErrors
      )) {
        setError(key, {
          type: "manual",
          message: value[0].message,
        });
      }
    }
    setIsLoading(false);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  const { isDarkMode, baseColor } = useTheme();

  const renderFormStep = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <div className="mb-5 mt-6">
              <Label
                htmlFor="name"
                className="block text-red-00 font-bold text-sm mb-2 capitalize"
              >
                Legal Full Name
              </Label>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      type="text"
                      id="name"
                      value={formData.name} // Set the value from formData
                      onChange={(event) => {
                        // Update the formData when the input changes
                        setFormData({
                          ...formData,
                          name: event.target.value,
                        });
                      }}
                      placeholder="John Doe"
                      error={fieldState.error?.message}
                      className={`w-full px-4 py-1 bg-gra-50 ${
                        isDarkMode
                          ? "bg-[#111111] text-gray-200 border-none"
                          : "border text-black"
                      }  h-11 focus:border-none transition-all  capitalize rounded-lg text-sm`}
                      {...field}
                    />
                    {fieldState.error && (
                      <p className={`text-sm text-red-500 my-1 font-semiold`}>
                        {fieldState.error?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div className="mb-5">
              <Label
                htmlFor="email"
                className="block font-bold text-red-00 text-sm mb-2"
              >
                Email Address
              </Label>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      type="email"
                      id="email"
                      value={formData.email} // Set the value from formData
                      onChange={(event) => {
                        // Update the formData when the input changes
                        setFormData({
                          ...formData,
                          email: event.target.value,
                        });
                      }}
                      placeholder="johndoe@example.com"
                      className={`w-full px-4 py-1 bg-gra-50 ${
                        isDarkMode
                          ? "bg-[#111111] text-gray-200 border-none"
                          : "border text-black"
                      }  h-11 focus:border-none transition-all rounded-lg text-sm`}
                      {...field}
                    />
                    {fieldState.error && (
                      <p className={`text-sm text-red-500 my-1 font-semiold`}>
                        {fieldState.error?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="mb-5">
              <Label htmlFor="country" className="block font-bold text-sm mb-2">
                Country
              </Label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center">
                    <div
                      className={`w-full pr-4 py-3  ${
                        isDarkMode
                          ? "bg-[#111111] text-gray-200"
                          : "bg-gray-50 text-black border"
                      }  text-sm rounded-lg`}
                    >
                      <select
                        id="country"
                        className={`bg-inherit ${
                          isDarkMode ? "text-white" : "text-black"
                        } w-full ml-1 mr-3`}
                        value={formData.country} // Set the value from formData
                        onChange={(event) => {
                          handleCountryChange(event);
                          // Update the formData when the input changes
                          setFormData({
                            ...formData,
                            country: event.target.value,
                          });
                        }}
                      >
                        <option value="" disabled>
                          Select country
                        </option>
                        {countryList.map((country) => (
                          <option key={country.value} value={country.value}>
                            {country.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      className={`flag ml-2 p-4 ${
                        isDarkMode ? "bg-[#111111]" : "bg-gray-50"
                      }  rounded-lg`}
                    >
                      {" "}
                      <FlagIcon
                        code={selectedCountry.toUpperCase()}
                        size={21}
                        className={`mr-1 `}
                      />
                    </div>
                  </div>
                )}
              />
            </div>
            <div className="mb-5">
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <PhoneInput
                      country={selectedCountry.toLocaleLowerCase()}
                      value={formData.phoneNumber} // Set the value from formData
                      onChange={(event) => {
                        // Update the formData when the input changes
                        setFormData({
                          ...formData,
                          phoneNumber: event.target.value,
                        });
                      }}
                      {...field}
                      className="w-full"
                      containerClass="w-full"
                      inputClass={`w-full px-4 py-3  ${
                        isDarkMode
                          ? "bg-[#111111] text-gray-200"
                          : "bg-gray-50  text-black border"
                      }  text-sm rounded-lg `}
                    />
                    {fieldState.error && (
                      <p className={`text-sm text-red-500 my-1 font-semiold`}>
                        {fieldState.error?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="mb-5">
              <Label htmlFor="gender" className="block font-bold text-sm mb-2">
                Gender
              </Label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <div
                    className={`w-full pr-4 py-3 ${
                      isDarkMode
                        ? " bg-[#111111] text-gray-200"
                        : "border bg-gray-50 text-black"
                    }  text-sm rounded-lg`}
                  >
                    {" "}
                    <select
                      {...field}
                      // Set the value from formData
                      onChange={(event) => {
                        // Update the formData when the input changes
                        setFormData({
                          ...formData,
                          gender: event.target.value,
                        });
                      }}
                      className={`bg-inherit  w-full ml-1 mr-3`}
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      {genderOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              />
            </div>
            <div className="mb-5">
              <Label htmlFor="dob" className="block font-bold text-sm mb-2">
                Date of Birth
              </Label>
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <Input
                    // Set the value from formData
                    onChange={(event) => {
                      // Update the formData when the input changes
                      setFormData({
                        ...formData,
                        dob: event.target.value,
                      });
                    }}
                    type="date"
                    {...field}
                    className={`w-full px-4 py-1 bg-gra-50 ${
                      isDarkMode
                        ? "bg-[#111111] text-gray-200 border-none"
                        : "border text-black"
                    }  h-11 focus:border-none transition-all rounded-lg text-sm`}
                  />
                )}
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="mb-5">
              <div className="label_controller mb-2 flex items-center justify-between">
                <Label htmlFor="password" className="block font-bold text-sm">
                  Password
                </Label>
                <div
                  className="show-pass cursor-pointer"
                  onClick={handleShowPassword}
                >
                  {showPass ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z"
                        clipRule="evenodd"
                      />
                      <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                      <path
                        fillRule="evenodd"
                        d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      type={showPass ? "text" : "password"}
                      id="password"
                      {...field}
                      value={formData.password} // Set the value from formData
                      onChange={(event) => {
                        // Update the formData when the input changes
                        setFormData({
                          ...formData,
                          password: event.target.value,
                        });
                      }}
                      placeholder="Create a password"
                      className={`w-full px-4 py-1 bg-gra-50 ${
                        isDarkMode
                          ? "bg-[#111111] text-gray-200 border-none"
                          : "border text-black"
                      }  h-11 focus:border-none transition-all rounded-lg text-sm`}
                    />
                    {fieldState.error && (
                      <p className={`text-sm text-red-500 my-1 font-semiold`}>
                        {fieldState.error?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div className="mb-5">
              <Label
                htmlFor="confirmPassword"
                className="block font-bold text-sm mb-2"
              >
                Confirm Password
              </Label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      type={showPass ? "text" : "password"}
                      id="confirmPassword"
                      {...field}
                      value={formData.confirmPassword} // Set the value from formData
                      onChange={(event) => {
                        // Update the formData when the input changes
                        setFormData({
                          ...formData,
                          confirmPassword: event.target.value,
                        });
                      }}
                      placeholder="Confirm password"
                      className={`w-full px-4 py-1 bg-gra-50 ${
                        isDarkMode
                          ? "bg-[#111111] text-gray-200 border-none"
                          : "border text-black"
                      }  h-11 focus:border-none transition-all rounded-lg text-sm`}
                    />
                    {fieldState.error && (
                      <p className={`text-sm text-red-500 my-1 font-semiold`}>
                        {fieldState.error?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const totalSteps = 4; // Set the total number of steps

  return (
    <>
      {isVerificationStep ? (
        <VerificationPage
          Input={Input}
          Button={Button}
          Label={Label}
          formData={formData}
        />
      ) : (
        <form onSubmit={handleSubmit(handleSignupSubmit)} className="">
          <div className="message mb-5">
            <div
              className={`${
                isDarkMode ? "text-gray-200" : "text-gray-950"
              } font-bold text-lg`}
            >
              <span className={`text-[#0066b1]`}>Create</span> a new account
            </div>
            <p
              className={`text-sm font-normal ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              } mt-3`}
            >
              Create a new{" "}
              <span className={`text-[#0066b1] font-bold`}>account</span> to
              enjoy immense benefits and financial freedom, it's easy, it's{" "}
              <span className={` text-[#0066b1] font-bold`}>simple</span>
            </p>
          </div>
          <div className="progress w-full mt-2 mb-8">
            <div
              className={`progress-cont w-full h-1 rounded-full ${
                isDarkMode ? "bg-[#11111180]" : "bg-red-50/80"
              } relative`}
            >
              <div
                className={`progress-bar h-full w-1/2 transition-all duration-500 absolute bg-[#0066b1] rounded-full top-0 left-0`}
                style={{ width: `${currentStep * (100 / 3)}%` }}
              ></div>
            </div>
          </div>
          <div className="">{renderFormStep(currentStep)}</div>
          <div className="flex justify-between">
            {currentStep > 0 && (
              <Button
                type="button"
                onClick={handlePreviousStep}
                //  disabled={!formState.isValid}
                className={`mr-2 ${
                  isDarkMode
                    ? "bg-[#111] text-gray-200 hover:bg-[#11111180]"
                    : "bg-gray-100 hover:bg-slate-200 text-black"
                } h-12 rounded-lg`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            )}
            {currentStep < totalSteps - 1 && (
              <Button
                type="button"
                onClick={handleNextStep}
                className="w-full flex items-center justify-center bg-[#0066b1] text-white h-12 font-bold roundd-lg"
                disabled={!formState.isValid}
              >
                <div className="py-2 flex items-center justify-center">
                  {" "}
                  {isLoading ? (
                    <div className="flex items-center w-full">
                      <InfinitySpin width="100" color="#ffffff" />
                    </div>
                  ) : (
                    "Proceed"
                  )}
                </div>
              </Button>
            )}
            {currentStep === totalSteps - 1 && (
              <Button
                type="submit"
                className="w-full  flex items-center justify-center bg-[#0066b1] text-white h-12 font-bold rounded-lg"
                //disabled={!formState.isValid}
              >
                <div className="py-2 flex items-center justify-center">
                  {isLoading ? (
                    <InfinitySpin width="100" color="#ffffff" />
                  ) : (
                    "Create my account"
                  )}
                </div>
              </Button>
            )}
          </div>
        </form>
      )}
    </>
  );
};

export default Signup;
