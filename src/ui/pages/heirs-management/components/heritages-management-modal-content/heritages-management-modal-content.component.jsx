import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { SelectItemsModalContent } from 'app-components'
import { useHeir, useModal, useToastAlert, useLoggedUser } from 'app-hooks'
import { HERITAGE_TYPES } from 'app-constants'

import './heritages-management-modal-content.style.scss'

const HeritagesManagementModalContent = ({ heirId }) => {
  const [heritages, setHeritages] = useState([])
  const [baseHeritages, setBaseHeritages] = useState([])

  const { loggedUser } = useLoggedUser()
  const { getHeritages, updateHeirItems } = useHeir()
  const { showSuccessToastAlert } = useToastAlert()

  const { hideModal } = useModal()

  const mapHeritages = heritagesList => heritagesList.map(heritageItem => ({ item: heritageItem, itemCheck: true }))

  const getHeirHeritages = async () => {
    const result = await getHeritages(heirId)

    if (result && result.length) {
      const mappedHeritages = mapHeritages(result)
      setHeritages(mappedHeritages)
      setBaseHeritages(mappedHeritages)
    }
  }

  const setHeirsItems = async () => {
    const mappedFiles = heritages
      .filter(asset => !asset.itemCheck && asset.item.type !== HERITAGE_TYPES.CREDENTIAL.key)
      .map(heritageFile => heritageFile.item.id)

    const mappedCredentials = heritages
      .filter(asset => !asset.itemCheck && asset.item.type === HERITAGE_TYPES.CREDENTIAL.key)
      .map(heritageCredential => ({
        ownerId: loggedUser.accounts[0].id,
        credentialId: heritageCredential.item.id,
        heirsIds: heritageCredential.item.credentialHeirsIds.filter(id => id !== heirId)
      }))

    const updateRequest = {
      fileHeirIds: mappedFiles,
      credentialsUpdateRequests: mappedCredentials
    }

    const result = await updateHeirItems(heirId, updateRequest)

    if (result) {
      showSuccessToastAlert('Itens de herdeiro atualizados com sucesso.')
      hideModal()
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
      emptyContentText="Este herdeiro ainda não possui bens digitais atribuídos."
      hideModalOnConfirm
    />
  )
}

HeritagesManagementModalContent.propTypes = {
  heirId: PropTypes.number,
}

export { HeritagesManagementModalContent }
