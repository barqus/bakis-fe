import axios from 'axios'

const fetchDataCall = async ({ api }) => {
    let apiReturn = await axios
        .get('http://localhost:8080/api/v1/' + api)
        .then(async function (response) {
            console.log("RESPONSE", response.data[0].tier)
            var tierOrdering = {},
                tierOrder = ['CHALLENGER', 'GRANDMASTER', 'MASTER', 'DIAMOND', 'PLATINUM', 'GOLD', 'SILVER', 'BRONZE', 'IRON'];
            for (var i = 0; i < tierOrder.length; i++)
                tierOrdering[tierOrder[i]] = i;

            var rankOrdering = {},
                rankOrder = ['I', 'II', 'III', 'IV'];
            for (i = 0; i < rankOrder.length; i++)
                rankOrdering[rankOrder[i]] = i;
            console.log("BFORE", response.data)
            response.data = response.data.sort(function (a, b) {
                let winRateA = (a.wins/(a.wins+a.losses)).toFixed(4)*100 
                if (isNaN(winRateA)) {
                    winRateA = 0
                }
                let winRateB = (b.wins/(b.wins+b.losses)).toFixed(4)*100 
                if (isNaN(winRateB)) {
                    winRateB = 0
                }
                return tierOrdering[a.tier] - tierOrdering[b.tier] || rankOrdering[a.rank] - rankOrdering[b.rank] 
                    || b.points - a.points|| b.is_live - a.is_live || winRateB - winRateA 
            });
            console.log("AFTER", response.data)

            return response;
        })
        .catch(function (error) {
            console.log(error);
        });
    return apiReturn;
};

export default fetchDataCall