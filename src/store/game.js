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
    ],
    prevMoves: ['','','','','','','','',''],
    ai: null
    
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
    },

    getPrevMoves: state => {
        return state.prevMoves;
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

    async addNumber({ state, dispatch }, payload) {
        state.gameState[payload.cell] = payload.player;
        state.prevMoves[payload.cell] = payload.cell;

        dispatch('aiMove')
       
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
                console.log(winCondition[0],winCondition[1],winCondition[2])
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
    },

    async aiMove({ state, dispatch, commit }) {
        // const prevMoves = state.prevMoves;

        // let randomNum = Math.floor( Math.floor(Math.random() * 9)  );

        // let x;

        // for(let i = 0; i < 9; i++) {
        //     if(prevMoves.includes(randomNum)) {
        //         console.log('number included')
        //         continue;
        //     } else {
        //         console.log('number NOT included')
        //         x = randomNum;
        //         break;
        //         // break;
        //     }
        // }

        // state.ai = x;
        // console.log('ai move: ', x)
        // -------------------------------------------------------------

        let pMoves = await state.prevMoves;
        let randomNum = Math.floor(Math.random() * 8);

        setTimeout(() => {
            if(state.currentPlayer === 'O') {

                while(pMoves.includes(randomNum)) {
                    randomNum = Math.floor(Math.random() * 8);
                }

                state.gameState[randomNum] = 'O';
                state.prevMoves[randomNum] = randomNum;
                // commit('SET_CURRENT_PLAYER', 'O');
                dispatch('checkWinner');

                // for(let i = 0; i < 8; i++) {
                //     if(Array.isArray(state.prevMoves)) {
                        
                //         if(pMoves.includes(randomNum)) {
                //             // randomNum = Math.floor(Math.random() * 8);
                //             continue;
                //         } else {
                //             state.gameState[randomNum] = 'O';
                //             state.prevMoves[randomNum] = randomNum;
                //             commit('SET_CURRENT_PLAYER', 'O');
                //             dispatch('checkWinner');
                //         }
                //     }
                // }
            }
        }, 500)

        setTimeout(() => {
            commit('SET_CURRENT_PLAYER', 'X')
        }, 600)
    }


}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}