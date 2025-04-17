import random from 'random';

export async function POST(req) {
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
    return new Response(JSON.stringify(userInfo), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}