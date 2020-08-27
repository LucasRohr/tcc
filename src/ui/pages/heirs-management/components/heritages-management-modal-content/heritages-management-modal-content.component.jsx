import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { SelectItemsModalContent } from 'app-components'
import { useHeir, useToastAlert } from 'app-hooks'
import { HERITAGE_TYPES } from 'app-constants'

import './heritages-management-modal-content.style.scss'

const HeritagesManagementModalContent = ({ heirId }) => {
  const [heritages, setHeritages] = useState([])
  const [baseHeritages, setBaseHeritages] = useState([])

  const { getHeritages, updateHeirItems } = useHeir()
  const { showSuccessToastAlert } = useToastAlert()

  const mapHeritages = heritagesList => heritagesList.map(heritageItem => ({ item: heritageItem, itemCheck: true }))

  const getHeirHeritages = async () => {
    const result = await getHeritages(heirId)

    if (result && result.heritages.length) {
      const mappedHeritages = mapHeritages(result.heritages)
      setHeritages(mappedHeritages)
      setBaseHeritages(mappedHeritages)
    }
  }

  const setHeirsItems = async () => {
    const mappedHeritages = heritages.map(heritage => ({
      heritage: heritage.item,
      heirHasItem: heritage.itemCheck,
    }))

    const result = await updateHeirItems(heirId, mappedHeritages)

    if (result) {
      showSuccessToastAlert('Itens de herdeiro atualizados com sucesso.')
    }
  }

  useEffect(() => {
    getHeirHeritages()
  }, [])

  return (
    <SelectItemsModalContent
      listItems={heritages}
      setListItems={setHeritages}
      baseItems={baseHeritages}
      onConfirm={setHeirsItems}
      iconsEnum={HERITAGE_TYPES}
      modalTitle="Pesquise pelos itens"
      emptyContentText="Este herdeiro ainda não possui heranças atribuídas."
    />
  )
}

HeritagesManagementModalContent.propTypes = {
  heirId: PropTypes.number,
}

export { HeritagesManagementModalContent }
