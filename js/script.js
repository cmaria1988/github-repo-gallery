const overview = document.querySelector(".overview");
const username = "cmaria1988";
const repoList = document.querySelector(".repo-list");
const repos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

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

repoList.addEventListener("click",function(e){
    if(e.target.matches("h3")){
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function(repoName){
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();

    const fetchLanguage = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguage.json();languageData

    const languanges = [];
    for (const language in languageData){
        languanges.push(language);
    }
    
    displayRepoInfo(repoInfo, languanges);
}

const displayRepoInfo = function(repoInfo, languages){
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    repos.classList.add("hide");
    
    const divElement = document.createElement("div");
    divElement.innerHTML=
    `<h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" 
            target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(divElement);

}
 