import { shallowMount, createLocalVue } from '@vue/test-utils';
import vuex from 'vuex';
import StartMenu from '../components/StartMenu';

const localVue = createLocalVue();
localVue.use(vuex);

describe('StartMenu', () => {

    it('renders a value from $store.state', () => {
        const wrapper = shallowMount(StartMenu, {
            mocks: {
                $store: {
                    state: {
                        value_1: 'value_1'
                    }
                }
            },
            localVue
        })

        expect(wrapper.find('.state-1')
        .text().trim()).toEqual('value_1')

    })
})
