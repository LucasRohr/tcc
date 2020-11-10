import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CheckboxItem, Title } from 'app-components'
import { useOwner, useLoggedUser, useInput } from 'app-hooks'
import { UserIcon } from 'app-icons'

import './create-credential-heirs-list.style.scss'

function CreateCredentialHeirsList({ onChange }) {
  const [heirs, setHeirs] = useState([])
  const [baseHeirs, setBaseHeirs] = useState([])

  const { getAllOwnerHeirsForCredential } = useOwner()
  const { loggedUser } = useLoggedUser()

  const filterItems = searchText => {
    const filteredHeirs = baseHeirs.filter(({ item }) => item.name.includes(searchText))
    setHeirs(filteredHeirs)
  }

  const searchInput = useInput({
    id: 'select_heirs_search',
    name: 'select_heirs_search',
    label: 'Pesquise aqui por um herdeiro',
    variant: 'full',
    onChange: filterItems,
    required: false,
  })

  const mapHeirs = heirsList => heirsList.map(heirItem => ({ item: heirItem, itemCheck: heirItem.hasMedia }))

  const getOwnerHeirs = async () => {
    const result = await getAllOwnerHeirsForCredential(loggedUser.currentAccount.id)

    if (result) {
      const mappedResult = mapHeirs(result.heirs)
      setHeirs(mappedResult)
      setBaseHeirs(mappedResult)
    }
  }

  useEffect(() => {
    getOwnerHeirs()
  }, [])

  const changeItemsOnCheck = (item, itemCheck) => {
    const newHeirsList = heirs.map(heirItem => {
      if (heirItem.item.id === item.id) {
        heirItem.itemCheck = itemCheck
      }

      return heirItem
    })

    setHeirs(newHeirsList)
    onChange(newHeirsList)
  }

  const renderItems = () =>
    heirs.map(({ item, itemCheck }, index) => (
      <CheckboxItem
        key={index}
        item={item}
        icon={UserIcon}
        initialIsChecked={itemCheck}
        title={item.name}
        onChange={changeItemsOnCheck}
      />
    ))

  return (
    <div className="create-credentials-heirs-list-container">
      <Title className="create-credentials-heirs-list-title" variant="sans-serif">
        Selecione os herdeiros desta credencial
      </Title>

      <div className="create-credentials-heirs-list-input-wrapper">{searchInput.getInputComponent()}</div>
      {renderItems()}
    </div>
  )
}

CreateCredentialHeirsList.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export { CreateCredentialHeirsList }
