

function solve(ballots) {

    let systems = []
    extractSystems(ballots, systems);

    let allVotes = 0

    let totalSystem = undefined
    let totalWinner = undefined

    let penultimateWinner = undefined

    let totalCandidateVotes = []
    allVotes = determineWinnerCandidates(systems, extractTotalCandidateVotes, totalCandidateVotes, allVotes);

    for (sys of systems) {
        let currentCandidate = totalCandidateVotes.find(c => c.name === sys.winnerCandidate.name)
        if (currentCandidate.totalVotes > allVotes / 2) {
            console.log(`${sys.winnerCandidate.name} wins with ${totalCandidateVotes.find(c => c.name === sys.winnerCandidate.name).totalVotes} votes`)
            totalSystem = sys
            totalWinner = sys.winnerCandidate
            break
        }
    }

    if (totalWinner !== undefined) {
        let minVal = Number.MAX_SAFE_INTEGER
        systems.forEach(sys => {
            if (totalSystem.name !== sys.name &&
                totalWinner.name !== sys.winnerCandidate.name) {
                let difference = totalWinner.votes
                if (minVal > difference) {
                    minVal = difference
                    penultimateWinner = sys.winnerCandidate
                }
            }
        })

        if (penultimateWinner !== undefined) {
            let systemsWon = systems.filter(sys => sys.winnerCandidate.name === penultimateWinner.name)
                .sort((sys1, sys2) => sys2.winnerCandidate.votes - sys1.winnerCandidate.votes)
                .map(sys => `${sys.name}: ${sys.winnerCandidate.votes}`)

            console.log(`Runner up: ${penultimateWinner.name}`)
            systemsWon.forEach(sysName => console.log(sysName))
        }
        else {
            console.log(`${totalWinner.name} wins unopposed!`)
        }
    }
    else {
        let allVotes = 0
        systems.forEach(sys => allVotes += sys.winnerCandidate.votes)
        totalCandidateVotes.sort((c1, c2) => c2.totalVotes - c1.totalVotes)

        let winnerPercent = Math.floor((100 / allVotes) * totalCandidateVotes[0].totalVotes)
        let looserPercent = Math.floor((100 / allVotes) * totalCandidateVotes[1].totalVotes)
        console.log(`Runoff between ${totalCandidateVotes[0].name} with ${winnerPercent}% and ${totalCandidateVotes[1].name} with ${looserPercent}%`)
    }


    function extractSystems(ballots, systems) {
        ballots.forEach(b => {
            let systemName = b.system;
            let candidateName = b.candidate;
            let votes = Number(b.votes);

            let system = systems.find(sys => sys.name === systemName);
            if (system === undefined) {
                system = { name: systemName, candidates: [] };
                systems.push(system);
            }

            let candidate = system.candidates.find(c => c.name === candidateName);
            if (candidate === undefined) {
                candidate = { name: candidateName, votes: 0 };
                system.candidates.push(candidate);
            }
            candidate.votes += votes;
        });
    }
    function extractTotalCandidateVotes(totalCandidateVotes, maxVotedCandidate) {
        let currentCandidateVotes = totalCandidateVotes.find(c => c.name === maxVotedCandidate.name);
        if (currentCandidateVotes === undefined) {
            currentCandidateVotes = { name: maxVotedCandidate.name, totalVotes: 0 };
            totalCandidateVotes.push(currentCandidateVotes);
        }
        currentCandidateVotes.totalVotes += maxVotedCandidate.votes;
    }
    function determineWinnerCandidates(systems, extractTotalCandidateVotes, totalCandidateVotes, allVotes) {
        systems.forEach(sys => {
            let maxVotedCandidate = sys.candidates.sort((c1, c2) => c2.votes - c1.votes)[0];
            sys.candidates.forEach(c => {
                if (c.name !== maxVotedCandidate.name)
                    maxVotedCandidate.votes += c.votes;
            });

            extractTotalCandidateVotes(totalCandidateVotes, maxVotedCandidate);

            allVotes += maxVotedCandidate.votes;
            sys.winnerCandidate = maxVotedCandidate;
        });
        return allVotes;
    }
}
