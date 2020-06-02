const callApi = {
  _callH2h: async (teamId1, teamId2) => {
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v2/fixtures/h2h/${teamId1}/${teamId2}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "3d3a997c8fmsh72c953500760ae9p12f8bcjsn336cae28920b",
        },
      }
    );
    const data = response.json();
    if (response.status !== 200) throw Error(data.message);
    return data;
  },
  _callTeamSearch: async (team) => {
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v2/teams/search/${team}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "3d3a997c8fmsh72c953500760ae9p12f8bcjsn336cae28920b",
        },
      }
    );
    const data = response.json();
    if (response.status !== 200) throw Error(data.message);
    return data;
  },
  _callTeam: async (team_id) => {
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v2/teams/team/${team_id}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "3d3a997c8fmsh72c953500760ae9p12f8bcjsn336cae28920b",
        },
      }
    );
    const data = response.json();
    if (response.status !== 200) throw Error(data.message);
    return data;
  },
  _callTeamFixture: async (team_id) => {
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v2/fixtures/team/${team_id}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "3d3a997c8fmsh72c953500760ae9p12f8bcjsn336cae28920b",
        },
      }
    );
    const data = response.json();
    if (response.status !== 200) throw Error(data.message);
    return data;
  },
  _callLive: async () => {
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/fixtures/live`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "3d3a997c8fmsh72c953500760ae9p12f8bcjsn336cae28920b",
        },
      }
    );
    const data = response.json();
    if (response.status !== 200) throw Error(data.message);
    return data;
  },
  _callFixture: async (fixtureId) => {
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v2/fixtures/id/${fixtureId}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "3d3a997c8fmsh72c953500760ae9p12f8bcjsn336cae28920b",
        },
      }
    );
    const data = response.json();
    if (response.status !== 200) throw Error(data.message);
    return data;
  },





  // Call Own Server

  _loginPost: async (data)=>{
    const response = await fetch(`http://localhost:8080/loginPost`,{
      headers:{
        method : 'POST',
        cors : 'cors',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: data
      }
    })
  },
  promiseIt: function (any) {
    return new Promise((resolve, reject) => {
      if (any === true) {
        resolve("Fucking");
      } else if (any === false) {
        reject("Hell");
      } else {
        return Error("Any should be Boolean");
      }
    });
  },
};

export default callApi;
