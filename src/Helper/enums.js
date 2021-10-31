export const verdicts = {
    accepted: "accepted",
    wa: "wa",
    tle: "tle",
    mle: "mle",
    runtime: "runtime",
    compilation: "compilation",
    other: "other",
};

export const voice = {
    pitch: "pitch",
    rate: "rate",
    volume: "volume",
};

export const defaultCommands = {
    accepted: "Solution Accepted, for Problem ${index}.",
    wa: "WRONG ANSWER on test ${passedTestCount+1}, for Problem ${index}.",
    tle: "TIME LIMIT EXCEEDED on test ${passedTestCount+1}, took ${timeConsumedMillis} Milliseconds, for Problem ${index}.",
    mle: "MEMORY LIMIT EXCEEDED on test ${passedTestCount+1}, took ${memoryConsumedBytes/1000000} Mb, for Problem ${index}.",
    runtime:
        "RUNTIME ERROR on test ${passedTestCount+1}, for Problem ${index}.",
    compilation:
        "COMPILATION ERROR on test ${passedTestCount+1}, for Problem ${index}.",
    other: "${verdict} on test ${passedTestCount+1}, for Problem ${index}.",
};
