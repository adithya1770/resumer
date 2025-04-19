import random from 'random';
import { GoogleGenAI } from '@google/genai';
import { config } from 'dotenv';
config();
const fs = require('fs');
import { console } from 'inspector';


export async function POST(req) {
    console.log(process.env.GOOGLE_API_KEY)
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY});
    const userInfo = {
        "user_name":"",
        "email":"",
        "git_id": "",
        "info": "",
        "location": "",
        "repos": [
            
        ]
    }
    const body = await req.json();
    const { name, email, git_id, info } = body;
    console.log(name, git_id);

    try{
        const userName = await fetch(`https://api.github.com/users/${git_id}`);
        const gitInfo = await fetch(`https://api.github.com/users/${git_id}/repos`);
        const jsonInfo = await userName.json();
        const jsonGit = await gitInfo.json();
        userInfo.user_name = jsonInfo.name;
        userInfo.location = jsonInfo.location;
        userInfo.email = email;
        userInfo.git_id = git_id;
        userInfo.info = info;
        const count = jsonGit.length;
        for(let i=0; i < Math.min(3, count); i++){
            const rand = random.int(0, count-1);
            userInfo.repos.push({"repo_name": jsonGit[rand].name, "description": jsonGit[rand].description, "created_at": jsonGit[rand].created_at});
        }
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Generate a LaTeX resume using this JSON: ${JSON.stringify(userInfo)}. Keep it minimal, clean, and include name, email, GitHub, summary, location, and a projects section sorted by date, I need experience, eduation, projects and achievements section. Please don't include any explaination or Improvements just return latex.`,
          });
        const latexContent = response.candidates[0].content.parts[0].text;
        return new Response(JSON.stringify(latexContent),
                    {
                        status: 200,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                )
    }
    catch(error){
        return new Response(JSON.stringify({"message": error.message}), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}