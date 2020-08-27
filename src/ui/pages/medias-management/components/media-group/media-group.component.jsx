import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { HERITAGE_TYPES, ROLES } from 'app-constants'
import { Text, Button } from 'app-components'
import { PlusIcon, DropdownIcon } from 'app-icons'
import { useLoggedUser } from 'app-hooks'
import { MediasList } from '../medias-list/medias-list.component'
import { MediaForm } from '../media-form/media-form.component'

import './media-group.style.scss'

const CONTENTS = {
  MEDIAS: 'MEDIAS',
  MEDIA_FORM: 'MEDIA_FORM',
}

const MediaGroup = ({ mediaType, mediasList }) => {
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [isClosed, setIsClosed] = useState(false)
  const [currentGroupContent, setCurrentGroupContent] = useState(CONTENTS.MEDIAS)
  const { loggedUser } = useLoggedUser()

  const selectMedia = media => {
    setSelectedMedia(media)
    setCurrentGroupContent(CONTENTS.MEDIA_FORM)
  }

  const onFormButtonClick = () => {
    setSelectedMedia(null)
    setCurrentGroupContent(CONTENTS.MEDIAS)
  }

  const GROUP_CONTENTS = useMemo(
    () => ({
      MEDIAS: {
        key: 'MEDIAS',
        component: MediasList,
        props: { medias: mediasList, mediaType, selectMedia },
      },

      MEDIA_FORM: {
        key: 'MEDIA_FORM',
        component: MediaForm,
        props: { selectedMedia, onFormButtonClick, mediaType },
      },
    }),
    [mediasList, selectedMedia]
  )

  const applyConditionalClass = (positive, negative) => (isClosed ? negative : positive)

  const conditionalArrowClass = useMemo(() => applyConditionalClass('media-group-arrow-down', 'media-group-arrow-up'), [
    isClosed,
  ])

  const conditionalContentClass = useMemo(
    () => applyConditionalClass('media-group-content-collapsed', 'media-group-content-expanded'),
    [isClosed]
  )

  const renderHeader = () => {
    const MediaIcon = HERITAGE_TYPES[mediaType].icon
    const mediaName = HERITAGE_TYPES[mediaType].label

    const onAddClick = () => {
      setCurrentGroupContent(GROUP_CONTENTS.MEDIA_FORM.key)
      setSelectedMedia(null)
      setIsClosed(true)
    }

    const renderAddButton = () => {
      const isOwner = loggedUser.currentAccount.type === ROLES.OWNER

      if (isOwner) {
        return (
          <Button onClick={onAddClick} className="media-group-header-add-media-button">
            <Text>Adicionar</Text>
            <PlusIcon className="media-group-header-add-media-icon" />
          </Button>
        )
      }

      return null
    }

    return (
      <div className="media-group-header">
        <div>
          <MediaIcon className="media-group-header-icon" />
          <Text variant="sans-serif">{mediaName}</Text>
        </div>

        <div>
          {renderAddButton()}

          <DropdownIcon onClick={() => setIsClosed(!isClosed)} className={conditionalArrowClass} />
        </div>
      </div>
    )
  }

  const renderContent = () => {
    const ContentComponent = GROUP_CONTENTS[currentGroupContent].component
    const props = GROUP_CONTENTS[currentGroupContent].props

    return (
      <div className={conditionalContentClass}>
        <ContentComponent {...props} />
      </div>
    )
  }

  return (
    <div className="media-group-container">
      {renderHeader()}
      {renderContent()}
    </div>
  )
}

MediaGroup.propTypes = {
  mediaType: PropTypes.string.isRequired,
  mediasList: PropTypes.arrayOf(PropTypes.object),
}

export { MediaGroup }
