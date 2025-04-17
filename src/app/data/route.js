const userInfo = {
    "name":"",
    "email":"",
    "git_id": "",
    "info": "",
    "location": "",
}

export async function POST(req, res) {
    const {name, email, git, info} = req.body;
    const userName = await fetch(`https://api.github.com/users/${name}`);
    const gitInfo = await fetch(`https://api.github.com/users/${git}/repos`);
    const jsonInfo = await userName.json();
    const jsonGit = await gitInfo.json();
    userInfo.name = jsonInfo.name;
    userInfo.location = jsonInfo.location;
}