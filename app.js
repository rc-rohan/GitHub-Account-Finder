/* intializing github */
const github = new Github();

const username = document.querySelector("input");
const profile = document.querySelector(".profile");
const reposCard = document.querySelector(".repos");

username.addEventListener("keyup", (e) => {
  const user = username.value;
  if (user !== "") {
    github.getUserProfile(user).then((data) => {
      if (data.profile.message === "Not Found") {
        // Show Alert
        alert();
      } else {
        // Show profile
        console.log(data);
        console.log(data.repos)
        showProfile(data.profile);
        showRepos(data.repos);
      }
    });
  } else {
    // Clear all profiles
    profile.innerHTML = ``;
    reposCard.innerHTML =  ``;
  }
});

const searchSection = document.querySelector(".search-details");
function alert() {
  clearPopup();
  const alert = document.createElement("div");
  alert.className = "alert-popup";
  alert.innerHTML = `<p>&#x26A0; Username doesn't exists</p>`;
  searchSection.insertAdjacentElement("afterbegin", alert);
  setTimeout(clearPopup, 1000);
}

function clearPopup() {
  const currentAlert = document.querySelector(".alert-popup");
  if (currentAlert) {
    currentAlert.remove();
  }
}

function showProfile(user) {
  profile.innerHTML = `
        <div class="card">
            <div class="profile-visit">
                <div class="image-area"><img src="${user.avatar_url}" alt="" /></div>
              <a class="btn" href="${user.html_url}" target="_blank" ">View Profile</a>
            </div>
            <div class="profile-info">
              <div class="badges">
                <span class="badge-1">Public Repos: ${user.public_repos}</span>
                <span class="badge-2">Public Gists: ${user.public_gists}</span>
                <span class="badge-3">Followers: ${user.followers}</span>
                <span class="badge-4">Following: ${user.following}</span>
              </div>
              <div class="user-details">
                  <ul>
                  <li>Name: ${user.name}</li>
                  <li>Website/Blog: ${user.blog}</li>
                      <li>Location: ${user.location}</li>
                      <li>Member Since: ${user.created_at}</li>
                  </ul>
              </div>
            </div>
          </div>
          `
          ;
}
function showRepos(repos) {

  let output = ``;
  repos.forEach((repo) => {
    output += `
        <div class="repo-content">
          <div class="repo-name">
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          </div>
          <div class="badges">
            <span class="stars badge-1">Stars: ${repo.stargazers_count}</span>
            <span class="watchers badge-2">Watchers: ${repo.watchers_count}</span>
            <span class="forks badge-3">Forks: ${repo.forks_count}</span>
          </div>
        </div>
        `;
  });
  reposCard.innerHTML = "<h1>Latest Repos :</h1>"+ output;
}
