const overview = document.querySelector(".overview");
const username = "cmaria1988";

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
}