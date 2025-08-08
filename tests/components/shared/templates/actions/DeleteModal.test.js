import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DeleteModal from '@/components/shared/templates/actions/DeleteModal.vue'

const action = { description: 'Test action' }

test('clicking Cancel button or backdrop emits cancel', async () => {
  const wrapper = mount(DeleteModal, { props: { show: true, loading: false, action } })

  await wrapper.find('button.btn-outline-secondary').trigger('click')
  expect(wrapper.emitted('cancel')).toHaveLength(1)

  await wrapper.find('.modal-backdrop').trigger('click')
  expect(wrapper.emitted('cancel')).toHaveLength(2)
})

test('clicking Delete Action emits confirm and respects loading state', async () => {
  const wrapper = mount(DeleteModal, { props: { show: true, loading: false, action } })

  let deleteBtn = wrapper.find('button.btn-danger')
  await deleteBtn.trigger('click')
  expect(wrapper.emitted('confirm')).toHaveLength(1)

  await wrapper.setProps({ loading: true })
  deleteBtn = wrapper.find('button.btn-danger')
  expect(deleteBtn.attributes('disabled')).toBeDefined()

  await deleteBtn.trigger('click')
  expect(wrapper.emitted('confirm')).toHaveLength(1)
})

