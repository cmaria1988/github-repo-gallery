const overview = document.querySelector(".overview");
const username = "cmaria1988";
const repoList = document.querySelector(".repo-list");

const githubProfile = async function(){
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserInfo(data);
}
githubProfile();

const displayUserInfo = function(data){
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info");
    userInfoDiv.innerHTML=
        `<figure>
            <img alt="user avatar" src= ${data.avatar_url}/>
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div> `;
    overview.append(userInfoDiv);
    githubRepos();
}

const githubRepos = async function(){
    const repoData = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await repoData.json();
    displayRepositories(repos);
}

const displayRepositories = function(repos){
    for(const repo of repos){
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
}
 