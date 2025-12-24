const getCountAtStage = (stages, currentStage, startIndex) => {
    let count = 0;
    let nextIndex = startIndex;

    while (nextIndex < stages.length && stages[nextIndex] === currentStage) {
        count++;
        nextIndex++;
    }
    return { count, nextIndex };
};

const sortAndFormatResult = (failureData) => {
    return failureData
        .sort((a, b) => {
            if (b.failRate !== a.failRate) {
                return b.failRate - a.failRate;
            }
            return a.stage - b.stage;
        })
        .map((item) => item.stage);
};

function solution(N, stages) {
    let failureData = [];
    let totalPlayers = stages.length;
    let idx = 0;

    stages.sort((a, b) => a - b);

    for (let stage = 1; stage <= N; stage++) {
        const { count, nextIndex } = getCountAtStage(stages, stage, idx);
        idx = nextIndex;

        const failRate = totalPlayers === 0 ? 0 : count / totalPlayers;

        failureData.push({ stage, failRate });

        totalPlayers -= count;
    }

    return sortAndFormatResult(failureData);
}
