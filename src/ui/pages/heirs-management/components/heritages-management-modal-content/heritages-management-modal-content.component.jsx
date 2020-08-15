import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Title, Button, CheckboxItem } from 'app-components'
import { useInput, useModal, useHeir } from 'app-hooks'
import { HERITAGE_TYPES } from 'app-constants'

import './heritages-management-modal-content.style.scss'

const HeritagesManagementModalContent = ({ heirId }) => {
  const [heritages, setHeritages] = useState([])
  const [baseHeritages, setBaseHeritages] = useState([])

  const { getHeritages } = useHeir()
  const { hideModal } = useModal()

  const mapHeritages = heritages => heritages.map(heritage => ({ heritage, heirHasItem: true }))

  const filterHeritages = searchText => {
    const filteredHeritage = baseHeritages.filter(({ heritage }) => heritage.name.includes(searchText))
    setHeritages(filteredHeritage)
  }

  const searchInput = useInput({
    id: 'heritages_search',
    name: 'heritages_search',
    label: 'Pesquise pelo item',
    variant: 'full',
    onChange: filterHeritages,
    required: false,
  })

  const getHeirHeritages = async () => {
    const result = await getHeritages(heirId)

    if (result && result.heritages.length) {
      const mappedHeritages = mapHeritages(result.heritages)
      setHeritages(mappedHeritages)
      setBaseHeritages(mappedHeritages)
    }
  }

  useEffect(() => {
    getHeirHeritages()
  }, [])

  const renderButtons = () => (
    <div className="heritages-management-modal-content-buttons-container">
      <Button onClick={hideModal} variant="light">
        Cancelar
      </Button>
      <Button type="submit" variant="primary">
        Confirmar
      </Button>
    </div>
  )

  const changeHeritagesOnCheck = (heritageItem, heirHasItem) => {
    const newHeritagesList = heritages.map(item => {
      if (item.heritage.id === heritageItem.id) {
        item.heirHasItem = heirHasItem
      }

      return item
    })

    setHeritages(newHeritagesList)
  }

  const renderHeritages = () =>
    heritages.map(({ heritage, heirHasItem }, index) => (
      <CheckboxItem
        item={heritage}
        icon={HERITAGE_TYPES[heritage.type].icon}
        initialIsChecked={heirHasItem}
        title={heritage.name}
        onChange={changeHeritagesOnCheck}
        index={index}
      />
    ))

  return (
    <div className="heritages-management-modal-content">
      <Title variant="sans-serif">Gerencie os itens deste herdeiro</Title>
      {searchInput.getInputComponent()}
      <div className="heritages-management-modal-contentent-list">{renderHeritages()}</div>
      {renderButtons()}
    </div>
  )
}

HeritagesManagementModalContent.propTypes = {
  heirId: PropTypes.number,
}

export { HeritagesManagementModalContent }
