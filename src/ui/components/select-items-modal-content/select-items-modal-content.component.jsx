import React from 'react'
import PropTypes from 'prop-types'
import { useModal, useInput } from 'app-hooks'
import { Button } from '../button/button.component'
import { Title } from '../title/title.component'
import { CheckboxItem } from '../checkbox-item/checkbox-item.component'
import { EmptyContent } from '../empty-content/empty-content.component'

import './select-items-modal-content.style.scss'

const SelectItemsModalContent = ({
  listItems,
  setListItems,
  baseItems,
  onConfirm,
  defaultIcon,
  iconsEnum: ICONS_ENUM,
  modalTitle,
  emptyContentText,
}) => {
  const { hideModal } = useModal()

  const filterItems = searchText => {
    const filteredItems = baseItems.filter(({ item }) => item.name.includes(searchText))
    setListItems(filteredItems)
  }

  const searchInput = useInput({
    id: 'select_items_modal_search',
    name: 'select_items_modal_search',
    label: 'Pesquise aqui',
    variant: 'full',
    onChange: filterItems,
    required: false,
  })

  const renderButtons = () => (
    <div className="select-items-modal-content-buttons-container">
      <Button onClick={hideModal} variant="light">
        Cancelar
      </Button>
      <Button onClick={onConfirm} variant="primary">
        Confirmar
      </Button>
    </div>
  )

  const changeItemsOnCheck = (item, itemCheck) => {
    const newItemsList = listItems.map(listItem => {
      if (listItem.item.id === item.id) {
        listItem.itemCheck = itemCheck
      }

      return listItem
    })

    setListItems(newItemsList)
  }

  const renderItems = () =>
    listItems.map(({ item, itemCheck }, index) => (
      <CheckboxItem
        key={index}
        item={item}
        icon={defaultIcon || ICONS_ENUM[item.type].icon}
        initialIsChecked={itemCheck}
        title={item.name}
        onChange={changeItemsOnCheck}
      />
    ))

  const renderContent = () => {
    const hasItems = listItems && listItems.length

    if (hasItems || searchInput.value) {
      return (
        <>
          {searchInput.getInputComponent()}
          <div className="select-items-modal-contentent-list">{renderItems()}</div>
          {renderButtons()}
        </>
      )
    }

    return <EmptyContent mainMessage={emptyContentText} />
  }

  return (
    <div className="select-items-modal-content">
      <Title variant="sans-serif">{modalTitle}</Title>
      <div className="select-items-modal-content-wrapper">{renderContent()}</div>
    </div>
  )
}

SelectItemsModalContent.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.object),
  setListItems: PropTypes.func,
  baseItems: PropTypes.arrayOf(PropTypes.object),
  onConfirm: PropTypes.func,
  defaultIcon: PropTypes.element,
  iconsEnum: PropTypes.object,
  modalTitle: PropTypes.string,
  emptyContentText: PropTypes.string,
}

export { SelectItemsModalContent }
