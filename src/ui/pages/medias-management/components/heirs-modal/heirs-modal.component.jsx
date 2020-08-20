import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useOwner, useLoggedUser, useModal } from 'app-hooks'
import { SelectItemsModalContent } from 'app-components'
import { UserIcon } from 'app-icons'

const HeirsModal = ({ heirs, setHeirs, baseHeirs, mediaId }) => {
  const { getOwnerHeirsForMedia } = useOwner()
  const { loggedUser } = useLoggedUser()
  const { hideModal } = useModal()

  const mapHeirs = heirsList => heirsList.map(heirItem => ({ item: heirItem, itemCheck: heirItem.hasMedia }))

  const getAllOwnerHeirs = async () => {
    const result = await getOwnerHeirsForMedia(loggedUser.currentAccount.id, mediaId)

    if (result) {
      const mappedResult = mapHeirs(result.heirs)
      setHeirs(mappedResult)
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
      defaultIcon={<UserIcon />}
      modalTitle="Pesquise pelos itens"
      emptyContentText="Este herdeiro ainda não possui heranças atribuídas."
    />
  )
}

HeirsModal.propTypes = {
  heirs: PropTypes.array,
  setHeirs: PropTypes.func,
  baseHeirs: PropTypes.array,
  mediaId: PropTypes.number,
}

export { HeirsModal }
