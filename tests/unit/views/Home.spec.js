import { mount } from '@vue/test-utils';
import Home from '../../../src/views/Home.vue';
import { createStore } from 'vuex';

describe('Home', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        store = createStore({
            state: {
                currentPlayer: 'X',
                winner: '',
                gameActive: true,
                reset: false,
                gameState: ['','','','','','','','',''],
            },

            getters: {
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
        })

        wrapper = mount(Home, {
            global: {
                plugins: [store]
            }
        });
        
    })

    afterEach(() => {})

    it('should start with player X', () => {
        // console.log(wrapper)
        expect(store.getters.getCurrentPlayer).toBe('X');
    })
})
