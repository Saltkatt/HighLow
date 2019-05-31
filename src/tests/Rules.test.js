import { shallowMount, createLocalVue } from '@vue/test-utils';
import Rules from '../components/Rules';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Rules', () => {

    it('renders correct markup for rules', () => {
        const wrapper = shallowMount(Rules, {
          mocks: {
            $store: {
              state: {
                showRules: false
              }
            }
          },
          localVue
        })
        expect(wrapper.html()).toContain('<div class="modalContent">')
        expect(wrapper.html()).toContain('<button class="button-close">x</button>')
        expect(wrapper.html()).toContain('<p>RULES</p>')
        expect(wrapper.html()).toContain('<p>1. All questions have numerical answers and you are expected to answer using digits.</p>')
        expect(wrapper.html()).toContain('<p>2. Everyone will have one opportunity to answer once per round.</p>')
        expect(wrapper.html()).toContain('<p>3. The game will continue until someone has answered correctly.</p>')
      })

})