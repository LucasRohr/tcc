import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useMedia, useLoggedUser, useModal } from 'app-hooks'
import { SelectItemsModalContent } from 'app-components'
import { UserIcon } from 'app-icons'

const HeirsModal = ({ mediaId, mediaType }) => {
  const [heirs, setHeirs] = useState([])
  const [baseHeirs, setBaseHeirs] = useState([])

  const { getOwnerHeirsForMedia } = useMedia({ mediaType })
  const { loggedUser } = useLoggedUser()
  const { hideModal } = useModal()

  const mapHeirs = heirsList => heirsList.map(heirItem => ({ item: heirItem, itemCheck: heirItem.hasMedia }))

  const getAllOwnerHeirs = async () => {
    let result = await getOwnerHeirsForMedia(loggedUser.currentAccount.id, mediaId)

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
      onConfirm={hideModal}
      defaultIcon={UserIcon}
      modalTitle="Pesquise pelos itens"
      emptyContentText="Este herdeiro ainda não possui heranças atribuídas."
    />
  )
}

HeirsModal.propTypes = {
  mediaId: PropTypes.number,
  mediaType: PropTypes.string,
}

export { HeirsModal }
