
// STATE
const state = {
    currentPlayer: 'X',
    winner: '',
    gameActive: true,
    reset: false,
    gameState: ['','','','','','','','',''],
    winningConditions: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    
}

// GETTERS
const getters = {
    getCurrentPlayer: state => {
        return state.currentPlayer;
    },

    getGameState: state => {
        return state.gameState;
    },

    getWinner: state => {
        return state.winner;
    },

    getGameActive: state => {
        return state.gameActive;
    },

    getresetState: state => {
        return state.reset;
    }
}

// MUTATIONS
const mutations = {
    SET_CURRENT_PLAYER(state, currentPlayer) {
        state.currentPlayer = currentPlayer;
    },

}

// ACTIONS
const actions = {
    playerTurn({ commit, dispatch }, payload) {
        commit('SET_CURRENT_PLAYER', payload);
        dispatch('checkWinner');
    },

    addNumber({ state }, payload) {
        state.gameState[payload.cell] = payload.player;
    },

    resetGame({ state }) {
        state.gameActive = true;
        state.currentPlayer = 'X';
        state.gameState = ['','','','','','','','',''];
        state.reset = true;
        setTimeout(() => {
            state.reset = false;
        },10)
    },

    checkWinner({ state }) {
        let roundWon = false;
        
        for (let i = 0; i <= 7; i++) {
            const winCondition = state.winningConditions[i];
            let a = state.gameState[winCondition[0]];
            let b = state.gameState[winCondition[1]];
            let c = state.gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break
            }
        }

        if (roundWon) {
            if(state.currentPlayer === 'X') {
                state.winner = 'O';
            } else {
                state.winner = 'X';
            }

            state.gameActive = false;
        }

        let roundDraw = !state.gameState.includes("");

        if (roundDraw) {
            state.winner = 'Draw'
            state.gameActive = false;
        }
    }


}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}