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
    let result = await getHeirs()

    result = {
      heirs: [
        {
          id: 1,
          name: 'Fulaninho de Tal',
          account: 'conta herdeira 1',
          email: 'cleitinho@gmail.com',
          hasMedia: false,
        },
        {
          id: 2,
          name: 'Cirilo brabo',
          email: 'cirila1@gmail.com',
          account: 'conta herdeira 2',
          hasMedia: false,
        },
        {
          id: 3,
          name: 'alfredo berimbau da silva',
          email: 'cirila1@gmail.com',
          account: 'conta herdeira 2',
          hasMedia: true,
        },
      ],
    }

    if (result) {
      const mappedResult = mapHeirs(result.heirs)
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
