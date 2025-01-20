
//הנתונים נשמרים רק בעת ניצחון
const fillJson = () => {
    const a = new URLSearchParams(location.search);
    users = JSON.parse(localStorage.getItem("users"));
    let seconds = parseInt(time) % 60, minutes = parseInt(time / 60) % 60, hours = parseInt(time / 60 / 60);
    userObj = {
        userName: a.get("currentUserName"),
        maxScore: sumScore,
        time: `${hours}:${minutes}:${seconds}`
    }
    if (!users || users.length == 0) {
        users = [userObj];
    }
    else {
        let temp;
        let isFound = false;
        users = users.map((o) => {
            if (o.userName == a.get("currentUserName")) {
                isFound = true;
                temp = Object.entries(o);
                if (temp[1][1] < sumScore) {
                    temp[1][1] = sumScore;
                    temp[2][1] = `${hours}:${minutes}:${seconds}`;
                }
                o = Object.fromEntries(temp);
            }
            return o;
        })
        if (!isFound)
            users.unshift(userObj);
        users.sort((a, b) => {
            return parseInt(a.maxScore) > parseInt(b.maxScore) ? -1 : 1
        });
    }
    localStorage.setItem("users", JSON.stringify(users));
}
