"use client";
import { useForm } from "react-hook-form";

interface IFormInput {
  Username: string;
  Message: string;
}

export default function Form() {
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    try {
      const url = "https://jsonplaceholder.typicode.com/posts"; // Replace this with the actual API endpoint URL
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response from server:", responseData);
        alert("Data successfully submitted!");
      } else {
        console.error("Error sending data:", response.statusText);
        alert("Error submitting data. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg shadow-md z-10 w-full max-w-5xl items-center justify-between"
    >
      <div className="mb-4">
        <label
          htmlFor="Username"
          className="block text-gray-700 font-bold mb-2"
        >
          Username
        </label>

        <input
          {...register("Username")}
          id="Username"
          className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="Message"
          className="block text-gray-700 font-bold mb-2 "
        >
          MEssage
        </label>

        <input
          {...register("Message")}
          id="Message"
          className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
          type="text"
          aria-label="Filter projects"
          placeholder="Filter projects..."
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
