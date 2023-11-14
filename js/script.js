const overview = document.querySelector(".overview");
const username = "cmaria1988";
const repoList = document.querySelector(".repo-list");
const repos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

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
    filterInput.classList.remove("hide");
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
    backButton.classList.remove("hide");
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

backButton.addEventListener("click", function(){
    repos.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");
})

filterInput.addEventListener("input", function(e){
    let filterValue = e.target.value.toLowerCase().trim();
    const repos = document.querySelectorAll(".repo");

    for(const repo of repos){
        const repoLowerText = repo.innerText.toLowerCase();
        if(repoLowerText.includes(filterValue)){
            repo.classList.remove("hide");
        }else{
            repo.classList.add("hide")
        }
    }
})
 