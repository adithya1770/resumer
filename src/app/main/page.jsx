"use client";
import './page.css'
import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { cn } from "../lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

export default function Main() {
  const [name, setName] = useState('');
  const [email, setMail] = useState('');
  const [git, setGit] = useState('');
  const [info, setInfo] = useState('');

  const reqFunction = async () => {
    const sendReq = await fetch("http://localhost:3000/info", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": name,
        "email": email,
        "git": git,
        "info": info
      })
    })
    const blob = await sendReq.blob();
    const url = URL.createObjectURL(blob);
    const element = document.createElement('a')
    element.href=url;
    element.download = "Resume.txt";
    element.click();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div
      className="shadow-input mx-auto mt-10 z-10 w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-4xl font-mono text-neutral-800 dark:text-neutral-200">
        Give us some Details!
      </h2>
      <p className="mt-2 max-w-sm font-mono text-sm text-neutral-600 dark:text-neutral-300">
      In the bio section give an in-depth introduction about your education, achievements, expreience and what not!
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div
          className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer className="mt-6">
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Adithya" type="text" onChange={(e) => setName(e.target.value)}/>
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4 mt-6">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="adithyaps929@gmail.com" type="email" onChange={(e) => setMail(e.target.value)} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4 mt-6">
          <Label htmlFor="Git">Github ID</Label>
          <Input id="gitid" placeholder="e.g: adithya1770" type="text" onChange={(e) => setGit(e.target.value)} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4 mt-6">
          <Label htmlFor="about">About You</Label>
          <Input id="about" placeholder="bio" type="textarea" onChange={(e) => setInfo(e.target.value)} />
        </LabelInputContainer>
        <br />
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
          onClick={reqFunction}>
            Generate &rarr;
          <BottomGradient />
        </button>
      </form>
      <div>
        <h1 className='text-white font-bold font-mono'>Q{') '}How to use the generated text file?</h1>
        <br />
        <p className='text-white font-mono'>{'-> '}You will receive a text file with your resume in latex.</p>
        <p className='text-white font-mono'>{'-> '}<a href="https://texviewer.herokuapp.com/">{"(Click here) "}Paste it here and click on download as pdf.</a></p>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
