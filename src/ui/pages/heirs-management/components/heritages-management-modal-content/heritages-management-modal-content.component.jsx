import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import './heritages-management-modal-content.style.scss'
import { useHeir } from 'hooks/api/index'
import { Title, Button, CheckboxItem } from 'app-components'
import { useInput, useModal } from 'app-hooks'
import { ArrayUtils } from 'app-helpers'

const HeritagesManagementModalContent = ({ heirId }) => {
  const [heritages, setHeritages] = useState([])

  const { getHeritages } = useHeir()
  const { hideModal } = useModal()

  const filterHeritages = searchText => {
    const filteredHeritage = ArrayUtils.searchByText(heritages, searchText)
    setHeritages(filteredHeritage)
  }

  const searchInput = useInput({
    name: 'search',
    type: 'search',
    label: 'Pesquise pelo item',
    variant: 'full',
    onChange: filterHeritages,
    required: false,
  })

  const mapHeritages = heritages => heritages.map(heritage => ({ heritage, heirHasItem: true }))

  const getHeirHeritages = async () => {
    // const result = await getHeritages(heirId)
    const result = {}
    result.heritages = [{ name: 'klfsmfslkdflksd' }, { name: 'aaaaaaaaaaa' }]

    if (result && result.heritages.length) {
      const mappedHeritages = mapHeritages(result.heritages)
      setHeritages(mappedHeritages)
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

  const changeHeritagesOnCheck = ({ heritageItem, heirHasItem }) => {
    const newHeritagesList = heritages.map(item => {
      if (item.heritage.id === heritageItem.id) {
        item.heirHasItem = heirHasItem
      }

      return item
    })

    setHeritages(newHeritagesList)
  }

  const renderHeritages = () =>
    heritages.map(({ heritage, heirHasItem }) => (
      <CheckboxItem item={heritage} title={heritage.name} onChange={changeHeritagesOnCheck} />
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
