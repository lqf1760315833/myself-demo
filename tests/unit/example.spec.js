/*
 * @Author: Lqf
 * @Date: 2021-10-21 16:27:40
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-16 18:30:58
 * @Description: 我添加了修改
 */
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = ''
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
