class Github{
    constructor(){
        this.clientID = "65c40f9bd712748a1bf9";
        this.clientSecret = 'eed61b8ee7e5a5ed3d93a1a2a94d0b8a89aebbbd';
        this.repos_sort = 'created: asc';
        this.count = 5;
    }
    async getUserProfile(user){
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.clientID}&client_secret=${this.clientSecret}`);

        const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.count}&sort=${this.repos_sort}&client_id=${this.clientID}&client_secret=${this.clientSecret}`);

        const profile = await profileResponse.json();
        const repos = await reposResponse.json();
        return {
            profile,/* in es6 profile: profile === profile  */
            repos
        }
    }
}