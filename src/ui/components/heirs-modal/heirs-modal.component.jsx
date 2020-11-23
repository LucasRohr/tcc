import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useModal } from 'app-hooks'
import { SelectItemsModalContent } from 'app-components'
import { UserIcon } from 'app-icons'

const HeirsModal = ({ onConfirm, mapHeirs, getHeirs }) => {
  const [heirs, setHeirs] = useState([])
  const [baseHeirs, setBaseHeirs] = useState([])

  const { hideModal } = useModal()

  const onConfirmHeirs = () => {
    onConfirm(heirs)
    hideModal()
  }

  const getAllOwnerHeirs = async () => {
    const result = await getHeirs()

    if (result) {
      const mappedResult = mapHeirs(result)
      setHeirs(mappedResult)
      setBaseHeirs(mappedResult)
    }
  }

  useEffect(() => {
    getAllOwnerHeirs()
  }, [])

  return (
    <SelectItemsModalContent
      listItems={heirs}
      setListItems={setHeirs}
      baseItems={baseHeirs}
      onConfirm={onConfirmHeirs}
      defaultIcon={UserIcon}
      modalTitle="Pesquise pelos itens"
      emptyContentText="Este herdeiro ainda não possui heranças atribuídas."
    />
  )
}

HeirsModal.propTypes = {
  onConfirm: PropTypes.func,
}

export { HeirsModal }
