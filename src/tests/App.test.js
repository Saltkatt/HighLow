import { shallowMount, createLocalVue } from '@vue/test-utils';
import App from '../App';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('App', () => {
    it('works', () => {
        const wrapper = shallowMount(App, { localVue });
    })
})